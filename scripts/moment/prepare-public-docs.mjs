import { readdir, readFile, writeFile, mkdir, rm, copyFile } from 'node:fs/promises';
import path from 'node:path';
import {momentText,momentDocument} from './presentation.mjs';
const root=path.resolve(import.meta.dirname,'../..');
export async function projectDocs(source,destination){
  await mkdir(destination,{recursive:true});
  for(const entry of await readdir(source,{withFileTypes:true})){
   const from=path.join(source,entry.name),to=path.join(destination,entry.name);
   if(entry.isDirectory())await projectDocs(from,to);
   else if(/\.(json|md|txt|html)$/.test(entry.name) && !/LICENSE|NOTICE|OFL/i.test(entry.name)){
    const source=await readFile(from,'utf8');
    const text=entry.name.endsWith('.json')?JSON.stringify(momentDocument(JSON.parse(source)),null,2):momentText(source);
    await writeFile(to,text);
   }else await copyFile(from,to);
  }
 }
export async function preparePublicDocs(){
 const target=path.join(root,'.mds-docs');await rm(target,{recursive:true,force:true});
 for(const layer of ['core','theme','product'])await projectDocs(path.join(root,'packages',layer,'docs'),path.join(target,layer));
}
