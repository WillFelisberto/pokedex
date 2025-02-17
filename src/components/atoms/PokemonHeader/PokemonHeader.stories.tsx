import type { Meta, StoryObj } from '@storybook/react';

import { PokemonHeader } from './PokemonHeader';

const meta: Meta<typeof PokemonHeader> = {
  title: 'Atoms/PokemonHeader',
  component: PokemonHeader,
  tags: ['autodocs'],
  args: {
    name: 'Charizard',
    spriteUrl: '/sprites/charizard.png',
    types: ['fire', 'flying']
  },
  argTypes: {
    name: { control: 'text' },
    spriteUrl: { control: 'text' },
    types: {
      control: 'multi-select',
      options: [
        'fire',
        'water',
        'grass',
        'electric',
        'ice',
        'fighting',
        'poison',
        'ground',
        'flying',
        'psychic',
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
        'steel',
        'fairy'
      ],
      description: 'Defines the Pokemon type(s) to generate the background gradient.'
    }
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

type Story = StoryObj<typeof PokemonHeader>;

export const Default: Story = {
  args: {
    name: 'Charizard  ',
    spriteUrl: '/sprites/charizard.png',
    types: ['fire', 'flying']
  }
};
