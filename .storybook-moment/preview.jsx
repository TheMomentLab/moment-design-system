import React from 'react';
import '../packages/moment/styles.css';
import '../packages/moment/stories/specimens.css';
import * as inherited from './inherited-preview.jsx';
const audit = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('mds-audit');
// Keep storySort inline: Storybook's indexer cannot extract it through an imported spread.
const parameters = { ...inherited.parameters, a11y: { test: 'error' },
  options: {
    storySort: (a, b) => {
      const titleA = a.title.replace(/^MDS/, 'LDS').trim().split(/\s*\/\s*/);
      const titleB = b.title.replace(/^MDS/, 'LDS').trim().split(/\s*\/\s*/);
      const groupOrder = {
        '': ['LDS', 'LDS Core', 'LDS Theme', 'LDS Product'],
        'LDS Core': ['Foundation', 'Components', 'Patterns'],
        'LDS Core/Foundation': [
          'Design Token',
          'Color',
          'Typography',
          'Iconography',
          'Elevation',
          'Gradient',
          'Inclusive Design',
          'International Design',
          'Layout',
          'Motion',
          'Radius',
          'Spacing',
          'State',
          'Voice and Tone',
          'Writing',
          'Aspect Ratio',
        ],
        'LDS Core/Components': ['Layout', 'Action', 'Selection and Input', 'Content', 'Navigation', 'Status', 'Overlay'],
        'LDS Theme': ['Brand', 'Controls', 'Status'],
        'LDS Product': [
          'Action',
          'Content',
          'Data',
          'Status',
          'Feedback',
          'Layout',
          'Navigation',
          'Overlay',
          'Selection and Input',
          'Communication',
          'Editor',
          'Operations Dashboard',
          'Viewer',
        ],
        'LDS Product/Data': ['Display', 'Visualization', 'Collections', 'Operations'],
        'LDS Product/Viewer': [
          'Viewer Frame',
          'Toolbar',
          '2D Map',
          '3D Viewport Frame',
          'Video Stream',
          'Floor Selector',
          'Elevator Fleet Overview',
        ],
      };

      if (a.title === b.title) {
        const storyOrder = ['개요', '참조 · ', '사용법 · ', '변형·상태 · ', '상호작용 · ', '반응형 · ', '시나리오 · '];
        const storyRank = (name) => {
          const index = storyOrder.findIndex((prefix) => name === prefix.trim() || name.startsWith(prefix));
          return index === -1 ? storyOrder.length : index;
        };
        const rankA = storyRank(a.name);
        const rankB = storyRank(b.name);
        return rankA - rankB || a.name.localeCompare(b.name, 'ko', { numeric: true, sensitivity: 'accent' });
      }

      const depth = Math.max(titleA.length, titleB.length);
      for (let index = 0; index < depth; index += 1) {
        const segmentA = titleA[index];
        const segmentB = titleB[index];
        if (segmentA === segmentB) continue;
        if (segmentA == null) return -1;
        if (segmentB == null) return 1;

        const parent = titleA.slice(0, index).join('/');
        const order = groupOrder[parent] || [];
        const orderA = order.indexOf(segmentA);
        const orderB = order.indexOf(segmentB);
        if (orderA !== -1 || orderB !== -1) {
          return (orderA === -1 ? order.length : orderA) - (orderB === -1 ? order.length : orderB);
        }

        return segmentA.localeCompare(segmentB, 'en', { numeric: true, sensitivity: 'accent' });
      }

      return 0;
    },
  },
};
export default {
  parameters,
  globalTypes: { ...inherited.globalTypes, theme: { description: '배경', toolbar: { icon: 'circlehollow', items: [{ value: 'light', title: '라이트' }, { value: 'dark', title: '다크' }, { value: 'auto', title: '시스템' }], dynamicTitle: true } } },
  initialGlobals: { theme: 'light', profile: 'default', a11y: { manual: audit } },
  decorators: [(Story, context) => {
    const theme = context.globals.theme || 'light';
    const isMoment = context.id.startsWith('mds-');
    React.useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.lang = 'ko'; }, [theme]);
    return isMoment ? <main data-theme={theme} className={`ml-specimen${context.title.startsWith('MDS Theme/Brand/Moment Lab/') ? ' ml-brand-specimen' : ''}`}><Story /></main> : inherited.decorators[0](Story, context);
  }],
};
