import path from 'node:path';
import { existsSync } from 'node:fs';
export const root = path.resolve(import.meta.dirname, '..');
export function resolveLds(specifier) {
  const match = specifier.match(/^@lk-design-system\/lds-(core|theme|product)(?:\/(.*))?$/);
  if (!match) return null;
  const [, layer, subpath = ''] = match;
  if (subpath === 'storybook') return path.join(root, 'packages', layer, 'storybook/index.js');
  const base = path.join(root, 'packages', layer, 'src', subpath || 'index');
  return [base, base + '.js', base + '.jsx', path.join(base, 'index.js')].find(file => existsSync(file)) || null;
}
export const ldsSourcePlugin = { name: 'mds-inherited-sources', setup(build) {
  build.onResolve({ filter: /^@lk-design-system\/lds-(core|theme|product)(\/|$)/ }, args => {
    const resolved = resolveLds(args.path);
    return resolved ? { path: resolved } : undefined;
  });
}};
