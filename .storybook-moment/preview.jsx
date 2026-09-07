import React from 'react';
import '../packages/moment/styles.css';
import '../packages/moment/stories/specimens.css';
export default {
  globalTypes: { theme: { description: '배경', toolbar: { icon: 'circlehollow', items: [{ value: 'light', title: '라이트' }, { value: 'dark', title: '다크' }, { value: 'auto', title: '시스템' }], dynamicTitle: true } } },
  initialGlobals: { theme: 'light' },
  parameters: { layout: 'fullscreen', controls: { expanded: true }, options: { storySort: { order: ['MDS', ['Foundation', ['Identity', 'Color', 'Typography', 'Spacing'], 'Core', 'Content']] } }, a11y: { test: 'error' } },
  decorators: [(Story, context) => {
    const theme = context.globals.theme || 'light';
    React.useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.lang = 'ko'; }, [theme]);
    return <main data-theme={theme} className="ml-specimen"><Story /></main>;
  }],
};
