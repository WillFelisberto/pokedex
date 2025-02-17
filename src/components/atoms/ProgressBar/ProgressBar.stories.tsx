import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: {
    malePercentage: 50
  },
  argTypes: {
    malePercentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description:
        'Percentage of male gender. Female percentage is automatically calculated as 100 - malePercentage.',
      table: { category: 'Controls' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    malePercentage: 50
  }
};
