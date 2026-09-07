import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
addons.setConfig({ theme: create({ base: 'light', brandTitle: 'Moment Design System', brandUrl: 'https://github.com/TheMomentLab/moment-design-system', brandImage: '/moment-assets/moment-mark.svg', colorPrimary: '#00677D', colorSecondary: '#00677D', appBg: '#EDF5FB', appContentBg: '#FBFBFA', appBorderColor: '#CFCBC4', fontBase: 'Pretendard, system-ui, sans-serif', textColor: '#141414' }) });
