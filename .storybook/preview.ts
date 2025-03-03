import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    nextjs: { appDirectory: true },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

// This is the place responsible for grouping all decorators from the storybook app
export const decorators = [];

export default preview;
