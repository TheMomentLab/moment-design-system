import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const output=path.join(root,'artifacts/moment');await mkdir(output,{recursive:true});
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf','.png':'image/png'};
const server=createServer(async(req,res)=>{try{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name==='/')name='/index.html';const base=path.join(root,'storybook-moment'),file=path.resolve(base,'.'+name);if(!file.startsWith(base+path.sep))throw Error('path');res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(await readFile(file));}catch{res.statusCode=404;res.end('Not found');}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']});
const page=await browser.newPage();const failures=[],results=[];const errors=[];
page.on('pageerror',e=>errors.push(String(e)));
try {
 const index=JSON.parse(await readFile(path.join(root,'storybook-moment/index.json'),'utf8'));
 const stories=Object.values(index.entries).filter(s=>s.type==='story');
 for(const width of [1280,390])for(const theme of ['light','dark'])for(const story of stories){
  await page.setViewportSize({width,height:960});
  await page.goto(`${base}/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme}`);
  await page.locator('.ml-specimen h1').waitFor();await page.evaluate(()=>document.fonts.ready);
  await page.addScriptTag({path:path.join(root,'node_modules/axe-core/axe.min.js')});
  const audit=await page.evaluate(async()=>{
   const a=await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});
   return {overflow:document.documentElement.scrollWidth>innerWidth+1,violations:a.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))};
  });
  const result={story:story.id,width,theme,...audit};results.push(result);
  if(audit.overflow||audit.violations.length)failures.push(result);
  if(['mds-foundation-identity--identity','mds-core-controls--buttons','mds-content-editorial--cards','mds-content-editorial--long-content'].includes(story.id))await page.screenshot({path:path.join(output,`${story.id}-${theme}-${width}.png`),fullPage:true});
 }
 await page.goto(`${base}/iframe.html?id=mds-core-controls--interaction&viewMode=story&globals=theme:light`);
 const increment=page.getByRole('button',{name:'횟수 늘리기'});await increment.focus();await page.keyboard.press('Enter');await page.getByRole('status').filter({hasText:'활성화 횟수: 1'}).waitFor();
 const save=page.getByRole('button',{name:'저장 예시'});await save.focus();await page.keyboard.press('Space');assert.equal(await save.getAttribute('aria-busy'),'true');assert(await save.evaluate(el=>el===document.activeElement));await page.keyboard.press('Enter');assert.equal(await save.getAttribute('aria-busy'),'true');
 await page.getByRole('button',{name:'상태 초기화'}).click();assert.notEqual(await save.getAttribute('aria-busy'),'true');
 await page.goto(`${base}/iframe.html?id=mds-core-controls--chips&viewMode=story&globals=theme:dark`);
 const filter=page.getByRole('button',{name:'로보틱스',exact:true});await filter.focus();await page.keyboard.press('Space');assert.equal(await filter.getAttribute('aria-pressed'),'true');
 await page.goto(`${base}/iframe.html?id=mds-content-editorial--citation&viewMode=story`);const link=page.getByRole('link').first();assert.equal(await link.getAttribute('target'),'_blank');assert((await link.getAttribute('rel')).includes('noopener'));assert((await link.innerText()).includes('새 탭'));
 await page.emulateMedia({reducedMotion:'reduce',colorScheme:'dark'});await page.goto(`${base}/iframe.html?id=mds-core-controls--buttons&viewMode=story&globals=theme:auto`);await page.locator('.ml-specimen h1').waitFor();assert.equal(await page.locator('main').evaluate(el=>getComputedStyle(el).colorScheme),'dark');
 const report={date:new Date().toISOString(),stories:stories.length,renderedCases:results.length,viewports:[1280,390],themes:['light','dark'],keyboard:'passed',loadingFocus:'passed',sourceLinks:'passed',autoTheme:'passed',failures,errors,results};
 await writeFile(path.join(root,'docs/moment/verification.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({stories:stories.length,cases:results.length,failures,errors},null,2));
 assert.equal(failures.length,0,'Visual/a11y failures');assert.equal(errors.length,0,'Browser exceptions');
}finally{await browser.close();server.close();}
