import path from 'node:path';
import { babelParse, traverse, types, generate } from 'storybook/internal/babel';
import { momentText, momentDocument } from './presentation.mjs';
const root = path.resolve(import.meta.dirname, '../..');
export function presentationPlugin() {
 return {
  name: 'moment-public-copy', enforce: 'pre',
  transform(source, id) {
   const file=id.split('?')[0];
   if (!file.startsWith(root + '/') || !/(\/\.mds-catalog\/|\/packages\/moment\/stories\/|\/docs\/|\/packages\/(?:core|theme|product)\/(?:src|storybook)\/)/.test(file)) return;
   if(file.endsWith('.json')) {
    return {code:JSON.stringify(momentDocument(JSON.parse(source))),map:null};
   }
   if(!/\.(jsx?|mjs)$/.test(file) || !/\bLDS\b|\bLK\b|@lk-design-system|lkrobotics\.dev/.test(source))return;
   const ast=babelParse(source);let changed=false;
   traverse(ast,{
    StringLiteral(p){
     if(types.isImportDeclaration(p.parent)||types.isExportNamedDeclaration(p.parent)||types.isExportAllDeclaration(p.parent))return;
     const next=momentText(p.node.value);if(next!==p.node.value){p.node.value=next;delete p.node.extra;changed=true;}
    },
    JSXText(p){const next=momentText(p.node.value);if(next!==p.node.value){p.node.value=next;changed=true;}},
    TemplateElement(p){const raw=momentText(p.node.value.raw);if(raw!==p.node.value.raw){p.node.value.raw=raw;p.node.value.cooked=momentText(p.node.value.cooked||'');changed=true;}},
   });
   return changed?{code:generate(ast,{jsescOption:{minimal:true}},source).code,map:null}:undefined;
  },
 };
}
