import type { Meta, StoryObj } from '@storybook/react';

import { PokeBadge } from './PokeBadge';

// Defina os tipos de Pokémon disponíveis
export const PokemonTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
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
] as const;

const meta: Meta<typeof PokeBadge> = {
  title: 'Atoms/PokeBadge',
  component: PokeBadge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select'
      },
      options: PokemonTypes, // Define os tipos como opções no select
      description: 'Selecione um tipo de Pokémon',
      defaultValue: 'normal'
    }
  },
  args: {
    type: 'normal' // Define um valor padrão para a prop
  }
};

export default meta;

type Story = StoryObj<typeof PokeBadge>;

export const Default: Story = {};
