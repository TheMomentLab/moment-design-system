import assert from 'node:assert/strict';
import {mkdtemp,cp,writeFile,readFile,mkdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createServer} from 'node:http';
import {chromium} from 'playwright';
const root=path.resolve(import.meta.dirname,'..');
const major=process.env.MDS_REACT_MAJOR||'19';
assert(['18','19'].includes(major));
const npm=process.env.npm_execpath;
function run(args,cwd){return npm?execFileSync(process.execPath,[npm,...args],{cwd,encoding:'utf8',stdio:['ignore','pipe','pipe']}):execFileSync('npm',args,{cwd,encoding:'utf8',stdio:['ignore','pipe','pipe']});}
const dir=await mkdtemp(path.join(tmpdir(),'mds-isolated-'));
let server,browser;
try{
 // A real tarball in an unrelated directory: no workspace links, aliases or source imports.
 const packed=JSON.parse(run(['pack','./packages/moment','--ignore-scripts','--json','--pack-destination',dir],root))[0];
 await cp(path.join(root,'scripts/fixtures/moment-consumer'),dir,{recursive:true});
 await writeFile(path.join(dir,'package.json'),JSON.stringify({private:true,type:'module',dependencies:{'@themomentlab/design-system':`file:./${packed.filename}`,react:major==='18'?'18.3.1':'19.2.4','react-dom':major==='18'?'18.3.1':'19.2.4'},devDependencies:{'@types/react':major==='18'?'18.3.28':'19.2.14','@types/react-dom':major==='18'?'18.3.7':'19.2.3',typescript:'5.9.3',esbuild:'0.25.12'}}));
 run(['install','--ignore-scripts','--no-audit','--no-fund'],dir);
 await writeFile(path.join(dir,'tsconfig.json'),JSON.stringify({compilerOptions:{target:'ES2020',module:'ESNext',moduleResolution:'Bundler',jsx:'react-jsx',strict:true,skipLibCheck:false,noEmit:true,esModuleInterop:true},include:['*.tsx']}));
 execFileSync(process.execPath,[path.join(dir,'node_modules/typescript/bin/tsc'),'-p',dir],{encoding:'utf8'});
 const installed=path.join(dir,'node_modules/@themomentlab/design-system');
 execFileSync(process.execPath,[path.join(installed,'inherited/conformance/src/cli.mjs'),'verify-fixtures'],{encoding:'utf8'});
 execFileSync(process.execPath,[path.join(installed,'inherited/conformance/src/cli.mjs'),'verify-contract'],{encoding:'utf8'});
 const checklist=JSON.parse(await readFile(path.join(installed,'docs/adoption-checklist.json')));await readFile(path.join(installed,'docs',checklist.$schema));
 const api=await import(pathToFileURL(path.join(installed,'dist/index.js')));
 const manifest=JSON.parse(await readFile(path.join(installed,'package.json')));
 for(const [route,spec] of Object.entries(manifest.exports)){
  if(typeof spec==='object'&&spec?.import&&!route.includes('*')) await import(pathToFileURL(path.join(installed,spec.import)));
 }
 assert(api.Button&&api.DataGrid&&api.MdsProvider);
 const {build}=await import(pathToFileURL(path.join(dir,'node_modules/esbuild/lib/main.js')));
 // Resolve all advertised layer styles from this consumer as well as the documented root.
 for(const layer of ['core','theme','product'])await build({stdin:{contents:`import '@themomentlab/design-system/${layer}/styles.css';`,resolveDir:dir},bundle:true,write:false,outdir:path.join(dir,'style-check'),loader:{'.woff2':'file','.ttf':'file','.svg':'file'}});
 await build({entryPoints:[path.join(dir,'client.tsx')],bundle:true,outdir:path.join(dir,'web'),format:'esm',loader:{'.woff2':'file','.ttf':'file','.svg':'file'}});
 await build({entryPoints:[path.join(dir,'server.tsx')],bundle:true,outfile:path.join(dir,'server.mjs'),platform:'node',format:'esm',packages:'external',loader:{'.css':'empty'}});
 const rendered=await import(pathToFileURL(path.join(dir,'server.mjs')));
 assert(rendered.body.includes('실험 기록'));assert(rendered.themeScript.includes('mds-theme'));assert(!rendered.themeScript.includes('lk-theme'));
 await writeFile(path.join(dir,'web/index.html'),`<!doctype html><html lang="ko" data-theme="light"><head><meta charset="utf-8"><title>MDS consumer</title><link rel="icon" href="data:,">${rendered.themeScript}<link rel="stylesheet" href="/client.css"></head><body><div id="root">${rendered.body}</div><script type="module" src="/client.js"></script></body></html>`);
 const missing=[],errors=[];
 server=createServer(async(req,res)=>{try{const filename=new URL(req.url,'http://localhost').pathname;const file=path.join(dir,'web',filename==='/'?'index.html':filename);const mime={'.js':'text/javascript','.css':'text/css','.html':'text/html','.woff2':'font/woff2','.ttf':'font/ttf'};res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(await readFile(file));}catch{missing.push(req.url);res.statusCode=404;res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']});
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.evaluate(()=>document.fonts.ready);
 await page.getByRole('button',{name:'테마 전환'}).click();await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark');
 assert.equal(await page.evaluate(()=>localStorage.getItem('mds-theme')),'dark');assert.equal(await page.evaluate(()=>localStorage.getItem('lk-theme')),null);
 await page.getByRole('button',{name:'밀도 전환'}).click();await page.waitForFunction(()=>document.documentElement.getAttribute('data-lds-profile')==='ops');
 const trigger=page.getByRole('button',{name:'실행 조건 확인'});await trigger.click();const dialog=page.getByRole('dialog',{name:'실행 조건'});await dialog.waitFor();
 assert(await dialog.evaluate(e=>e.contains(document.activeElement)));assert.equal(await dialog.evaluate(e=>getComputedStyle(e).getPropertyValue('--color-semantic-primary-normal').trim().toLowerCase()),'#3695ac');
 await page.keyboard.press('Escape');await dialog.waitFor({state:'hidden'});await page.waitForFunction(()=>document.activeElement?.textContent==='실행 조건 확인');
 assert.equal(await page.evaluate(()=>document.fonts.check('16px Pretendard')),true);
 await page.reload();await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark' && document.querySelector('output')?.textContent==='dark');
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
 await mkdir(path.join(root,'artifacts/moment'),{recursive:true});await page.screenshot({path:path.join(root,`artifacts/moment/consumer-react${major}.png`)});
 console.log(`React ${major}: isolated tarball installation, strict types, public entries, root/layer CSS and fonts, SSR hydration, MDS storage, profile, portal theme, Escape/focus passed.`);
}finally{await browser?.close();server?.close();await rm(dir,{recursive:true,force:true});}
