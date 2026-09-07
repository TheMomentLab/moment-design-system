import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>readFileSync(path.join(root,p),'utf8');
const baseline=JSON.parse(read('docs/moment/lds-baseline.json'));
const index=JSON.parse(read('storybook-moment/index.json'));
const missing=baseline.stories.filter(entry=>!index.entries[entry.id]);
assert.deepEqual(missing,[],'Every original story and docs route must remain available');
for(const entry of baseline.stories){
 const actual=index.entries[entry.id];
 assert.equal(actual.type,entry.type,`Changed story/docs kind: ${entry.id}`);
 assert.equal(actual.title,entry.title.replace(/^LDS/,'MDS'),`Wrong catalog group: ${entry.id}`);
}
const inheritedIds = new Set(baseline.stories.map(entry => entry.id));
assert.deepEqual(Object.values(index.entries).filter(entry => inheritedIds.has(entry.id)).map(entry => entry.id), baseline.stories.map(entry => entry.id), 'Inherited sidebar order must match LDS, including Docs and variants');
const expectedMomentGroups = {
 'mds-foundation-identity': 'MDS Theme/Brand/Moment Lab/Identity',
 'mds-foundation-color': 'MDS Theme/Brand/Moment Lab/Color',
 'mds-foundation-typography': 'MDS Theme/Brand/Moment Lab/Typography',
 'mds-foundation-spacing': 'MDS Theme/Brand/Moment Lab/Spacing',
 'mds-core-controls': 'MDS Theme/Controls/Moment Controls',
 'mds-content-editorial': 'MDS Product/Content/Editorial Card',
};
for (const entry of Object.values(index.entries).filter(entry => entry.id.startsWith('mds-'))) {
 assert.equal(entry.title, expectedMomentGroups[entry.id.split('--')[0]], 'Moment additions must use the inherited Theme/Product hierarchy');
}
for(const file of baseline.sourceFiles){
 assert(existsSync(path.join(root,file.source)),`Missing original file: ${file.source}`);
 const original=read(file.source);
 assert.equal(createHash('sha256').update(original).digest('hex'),file.sha256,`Upstream source changed without updating the pinned inheritance: ${file.source}`);
}
const pkg=JSON.parse(read('packages/moment/package.json'));
const all=await import('../packages/moment/dist/index.js');
for(const[layer,contract]of Object.entries(baseline.packages)){
 const api=await import(`../packages/moment/dist/${layer}/index.js`);
 for(const name of contract.names){assert(name in all,`Root lost ${layer}.${name}`);assert.equal(all[name],api[name],`Root API overrides inherited ${layer}.${name}`);}
 for(const[key,value]of Object.entries(contract.exports)){
  const route='./'+layer+(key==='.'?'':key.slice(1));
  assert(route in pkg.exports,`Missing inherited public route ${route}`);
  if(value===null)assert.equal(pkg.exports[route],null,`Private path became public: ${route}`);
 }
}
console.log(`Complete inheritance passed: ${baseline.stories.length} original routes (${baseline.sourceFiles.length} files), ${Object.keys(all).length} root exports, every layer subpath and private boundary.`);
