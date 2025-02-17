import type { Meta, StoryObj } from '@storybook/react';

import { StatItem } from './StatItem';

const meta: Meta<typeof StatItem> = {
  title: 'Atoms/StatItem',
  component: StatItem,
  tags: ['autodocs'],

  argTypes: {
    value: { control: 'text' },
    type: {
      control: 'select',
      options: ['height', 'weight', 'category', 'ability'],
      description: 'Defines the type of stat, which determines the icon displayed.'
    }
  }
};

export default meta;

type Story = StoryObj<typeof StatItem>;

export const Default: Story = {
  args: {
    value: '9.0 kg',
    type: 'weight'
  }
};
