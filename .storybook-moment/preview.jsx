import React from 'react';
import '../packages/moment/styles.css';
import '../packages/moment/stories/specimens.css';
import * as inherited from './inherited-preview.jsx';
const audit = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('mds-audit');
export default {
  globalTypes: { ...inherited.globalTypes, theme: { description: '배경', toolbar: { icon: 'circlehollow', items: [{ value: 'light', title: '라이트' }, { value: 'dark', title: '다크' }, { value: 'auto', title: '시스템' }], dynamicTitle: true } } },
  initialGlobals: { theme: 'light', profile: 'default', a11y: { manual: audit } },
  parameters: { ...inherited.parameters, controls: { expanded: true }, a11y: { test: 'error' } },
  decorators: [(Story, context) => {
    const theme = context.globals.theme || 'light';
    const isMoment = context.id.startsWith('mds-');
    React.useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.lang = 'ko'; }, [theme]);
    return isMoment ? <main data-theme={theme} className="ml-specimen"><Story /></main> : inherited.decorators[0](Story, context);
  }],
};
