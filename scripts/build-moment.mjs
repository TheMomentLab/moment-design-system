import { build } from 'esbuild';
import { mkdir, rm, readdir, readFile, writeFile, copyFile, cp } from 'node:fs/promises';
import path from 'node:path';
import { root, ldsSourcePlugin } from './moment-resolve.mjs';
const pkg = path.join(root, 'packages/moment');
const dist = path.join(pkg, 'dist');
const layers = ['core', 'theme', 'product'];
const entries = { index: path.join(pkg, 'src/index.jsx') };
const matches = (pattern, key) => pattern.includes('*') ? key.startsWith(pattern.split('*')[0]) : pattern === key;
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full)); else files.push(full);
  }
  return files;
}
await rm(dist, { recursive: true, force: true });
await rm(path.join(pkg, 'inherited'), { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const layer of layers) {
  const source = path.join(root, 'packages', layer);
  const manifest = JSON.parse(await readFile(path.join(source, 'package.json'), 'utf8'));
  const nulls = Object.keys(manifest.exports).filter(key => manifest.exports[key] === null);
  const publicPatterns = Object.entries(manifest.exports).filter(([,value]) => value && typeof value === 'object').map(([key]) => key);
  for (const file of await walk(path.join(source, 'src'))) {
    if (!/\.(js|jsx)$/.test(file)) continue;
    const relative = path.relative(path.join(source, 'src'), file).replaceAll('\\', '/').replace(/\.(js|jsx)$/, '');
    const key = relative === 'index' ? '.' : './' + relative;
    if (nulls.some(pattern => matches(pattern, key))) continue;
    if (publicPatterns.some(pattern => matches(pattern, key))) entries[`${layer}/${relative}`] = file;
  }
  if (manifest.exports['./storybook']) entries[`${layer}/storybook`] = path.join(source, 'storybook/index.js');
  for (const folder of ['docs', 'tokens', 'assets', 'storybook']) {
    try { await cp(path.join(source, folder), path.join(pkg, 'inherited', layer, folder), { recursive: true }); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  for (const file of ['styles.css', 'README.md', 'THIRD_PARTY_NOTICES.md', 'package.json']) {
    try { await copyFile(path.join(source, file), path.join(pkg, 'inherited', layer, file)); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
}
await cp(path.join(root, 'packages/conformance'), path.join(pkg, 'inherited/conformance'), { recursive: true, filter: file => !file.includes('node_modules') });
await build({ entryPoints: entries, bundle: true, splitting: true, format: 'esm', platform: 'browser', target: 'es2020', jsx: 'automatic', external: ['react', 'react-dom', 'react/*', 'react-dom/*'], plugins: [ldsSourcePlugin], outdir: dist, sourcemap: true, banner: { js: '"use client";' } });
for (const layer of layers) {
  const source = path.join(root, 'packages', layer, 'src');
  for (const file of await walk(source)) {
    if (!file.endsWith('.d.ts')) continue;
    const destination = path.join(dist, layer, path.relative(source, file));
    await mkdir(path.dirname(destination), { recursive: true });
    let text = await readFile(file, 'utf8');
    text = text.replace(/(['"])@lk-design-system\/lds-(core|theme|product)(?:\/([^'"]+))?\1/g, (_, quote, owner, subpath) => {
      let relative = path.relative(path.dirname(destination), path.join(dist, owner, subpath || 'index')).replaceAll('\\', '/');
      if (!relative.startsWith('.')) relative = './' + relative;
      if (!relative.endsWith('.js')) relative += '.js';
      return quote + relative + quote;
    });
    await writeFile(destination, text);
  }
}
await copyFile(path.join(root, 'packages/product/storybook/index.d.ts'), path.join(dist, 'product/storybook.d.ts'));
let types = await readFile(path.join(pkg, 'src/index.d.ts'), 'utf8');
for (const layer of layers) types = types.replaceAll(`../../${layer}/src/`, `./${layer}/`);
await writeFile(path.join(dist, 'index.d.ts'), types);
console.log(`Moment Design System: ${Object.keys(entries).length} public JS entry points; all Core/Theme/Product declarations, docs/assets/tokens and Conformance included.`);
