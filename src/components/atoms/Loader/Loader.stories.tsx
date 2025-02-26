import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Atoms/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    fullScreen: {
      control: 'boolean',
      description:
        'Defines whether the loader covers the entire screen or just the spinning Pokéball',
      defaultValue: false
    }
  }
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    fullScreen: false
  }
};

export const FullScreen: Story = {
  args: {
    fullScreen: true
  }
};
