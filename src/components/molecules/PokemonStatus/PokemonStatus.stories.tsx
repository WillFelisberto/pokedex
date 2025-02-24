import type { Meta, StoryObj } from '@storybook/react';

import { PokemonStatus } from './PokemonStatus';

const meta: Meta<typeof PokemonStatus> = {
  title: 'Molecules/PokemonStatus',
  component: PokemonStatus,
  tags: ['autodocs'],
  args: {
    height: 7,
    weight: 69
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '360px', margin: '0 auto' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof PokemonStatus>;

export const Default: Story = {};
