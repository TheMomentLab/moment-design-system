// Reuse LDS's full accessibility/play-function/guide guard without weakening its rules.
import { readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
let source=await readFile(path.join(root,'scripts/check-storybook-accessibility.mjs'),'utf8');
function replaceOnce(before,after){if(!source.includes(before))throw Error(`Upstream guard changed: ${before}`);source=source.replace(before,after);}
replaceOnce("path.join(root, 'storybook-static')", "path.join(root, 'storybook-moment')");
replaceOnce("path.join(root, 'visual-artifacts', 'accessibility')", "path.join(root, 'artifacts', 'moment', 'inherited-accessibility')");
replaceOnce("filterStories(implementationStories(index.entries || {}))", "filterStories(implementationStories(index.entries || {}).filter(entry => entry.id.startsWith('lds-')))");
replaceOnce("guideTitles.has(entry.title)", "guideTitles.has(entry.title.replace(/^MDS/, 'LDS').replace('Moment Lab Logo', 'LK ROBOTICS Logo'))");
replaceOnce("const browser = await chromium.launch({", "const browser = await chromium.launch({ ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),");
replaceOnce("args: [", "args: ['--no-sandbox',");
source=source.replaceAll('viewMode=story','viewMode=story&mds-audit=1').replaceAll('viewMode=docs','viewMode=docs&mds-audit=1');
replaceOnce("res.end('Not found');\n    }", "res.end('Not found'); console.error('Missing static asset:', req.url);\n    }");
// Public Storybook copy must describe MDS; compatibility selectors are not prose.
replaceOnce('axeCheckedStories += 1;', `const branding = await page.evaluate(() => ({ text: document.body.innerText, links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')) }));
      if (/(?<!--)\\bLDS\\b|\\bLK ROBOTICS\\b|@lk-design-system\\//.test(branding.text)) failures.push(story.id + ': upstream branding remains in public copy');
      axeCheckedStories += 1;`);
replaceOnce('docsPagesChecked += 1;', `const publicCopy = await page.locator('body').innerText();
      if (/(?<!--)\\bLDS\\b|\\bLK ROBOTICS\\b|@lk-design-system\\//.test(publicCopy)) failures.push(doc.id + ': upstream branding remains in Docs');
      docsPagesChecked += 1;`);
// Keep the runner responsive and show real progress, not a new test threshold.
replaceOnce('axeCheckedStories += 1;', "axeCheckedStories += 1; if (axeCheckedStories % 25 === 0) console.log(`MDS inherited ${axeCheckedStories}/${stories.length} stories checked`);");
const generated=path.join(root,`scripts/.moment-inherited-${(process.env.A11Y_SHARD||'all').replace('/','-')}.generated.mjs`);
await writeFile(generated,source);
try {
 const code=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[generated],{cwd:root,env:process.env,stdio:'inherit'});child.on('error',reject);child.on('exit',resolve);});
 process.exitCode=code||0;
}finally{await rm(generated,{force:true});}
