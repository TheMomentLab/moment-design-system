export default {
  stories: ['../packages/moment/stories/**/*.stories.jsx'],
  staticDirs: [{ from: '../packages/moment/assets', to: '/moment-assets' }],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  core: { disableTelemetry: true },
  features: { sidebarOnboardingChecklist: false, menuOnboardingChecklist: false },
};
