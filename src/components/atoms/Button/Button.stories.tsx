import type { Meta, StoryObj } from '@storybook/react';
import { Rocket } from 'lucide-react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: 'Click me'
  }
};

export const WithIcon: Story = {
  args: {
    text: 'Launch',
    icon: <Rocket />
  }
};

export const Disabled: Story = {
  args: {
    text: 'Disabled',
    disabled: true
  }
};
