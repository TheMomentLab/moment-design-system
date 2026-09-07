import upstream from '../.storybook/main.js';
import { resolveLds } from '../scripts/moment-resolve.mjs';
export default {
  ...upstream,
  stories: ['../.mds-catalog/**/*.stories.@(js|jsx)', '../packages/moment/stories/**/*.stories.jsx'],
  staticDirs: [
    ...upstream.staticDirs.filter(dir => dir.to !== '/styles.css'),
    { from: '../packages/moment/assets', to: '/moment-assets' },
    { from: '../packages/moment/docs', to: '/moment-docs' },
  ],
  viteFinal: async config => {
    const original = await upstream.viteFinal(config);
    return { ...original, plugins: [...(original.plugins || []), { name: 'mds-owner-source', enforce: 'pre', resolveId(id) { return resolveLds(id); } }] };
  },
};
