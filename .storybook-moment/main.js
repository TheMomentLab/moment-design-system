import { presentationPlugin } from '../scripts/moment/presentation-plugin.mjs';
import upstream from '../.storybook/main.js';
import { resolveLds } from '../scripts/moment-resolve.mjs';
export default {
  ...upstream,
  stories: ['../.mds-catalog/**/*.stories.@(js|jsx)', '../packages/moment/stories/**/*.stories.jsx'],
  staticDirs: [
    ...upstream.staticDirs.filter(dir => dir.to !== '/styles.css').map(dir => ({ ...dir, from: dir.from.replace(/packages\/(core|theme|product)\/docs/, '.mds-docs/$1') })),
    { from: '../packages/moment/assets', to: '/moment-assets' },
    { from: '../packages/moment/docs', to: '/moment-docs' },
  ],
  viteFinal: async config => {
    const original = await upstream.viteFinal(config);
    return { ...original, plugins: [presentationPlugin(), ...(original.plugins || []), { name: 'mds-owner-source', enforce: 'pre', resolveId(id) { return resolveLds(id); } }] };
  },
};
