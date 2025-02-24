import type { Meta, StoryObj } from '@storybook/react';

import { PokemonTypes } from '../PokeBadge/PokeBadge.stories';
import { EvolutionBadge } from './EvolutionBadge';

const meta: Meta<typeof EvolutionBadge> = {
  title: 'Molecules/EvolutionBadge',
  component: EvolutionBadge,
  tags: ['autodocs'],
  argTypes: {
    types: {
      control: {
        type: 'multi-select'
      },
      options: PokemonTypes,
      description: 'Selecione no máximo 2 tipos de Pokémon',
      table: {
        defaultValue: { summary: 'normal' }
      }
    }
  },
  args: {
    id: 2,
    name: 'ivysaur',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    types: ['grass', 'poison'],
    level: 16
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px', margin: '0 auto' }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof EvolutionBadge>;

export const Default: Story = {};
