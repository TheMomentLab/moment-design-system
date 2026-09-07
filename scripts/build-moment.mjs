import { build } from 'esbuild';
import { mkdir, rm, readdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const pkg = path.join(root, 'packages/moment');
const dist = path.join(pkg, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await build({ entryPoints: [path.join(pkg,'src/index.jsx')], bundle: true, splitting: true, format: 'esm', platform: 'browser', target: 'es2020', jsx: 'automatic', external: ['react','react-dom','react/*','react-dom/*'], outdir: dist, sourcemap: true, banner: { js: '"use client";' } });
async function copyTypes(source, destination) {
  await mkdir(destination,{recursive:true});
  for (const entry of await readdir(source,{withFileTypes:true})) {
    const from=path.join(source,entry.name),to=path.join(destination,entry.name);
    if(entry.isDirectory()) await copyTypes(from,to);
    else if(entry.name.endsWith('.d.ts')) await copyFile(from,to);
  }
}
await copyTypes(path.join(root,'packages/core/src'),path.join(dist,'core'));
const types=await readFile(path.join(pkg,'src/index.d.ts'),'utf8');
await writeFile(path.join(dist,'index.d.ts'),types.replaceAll('../../core/src/','./core/'));
console.log('Moment Lab: standalone ESM bundle and portable declarations built.');
