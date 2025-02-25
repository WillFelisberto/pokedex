import type { Meta, StoryObj } from '@storybook/react';

import { StatsPill } from './StatsPill';

const meta: Meta<typeof StatsPill> = {
  title: 'Atoms/StatsPill',
  component: StatsPill,
  tags: ['autodocs'],
  args: {
    title: 'default'
  }
};

export default meta;

type Story = StoryObj<typeof StatsPill>;

export const Default: Story = {};
