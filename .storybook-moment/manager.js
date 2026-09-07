import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
// LDS uses Storybook's default manager. Keep that shell and change identity only.
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Moment Design System',
    brandUrl: 'https://github.com/TheMomentLab/moment-design-system',
  }),
});
