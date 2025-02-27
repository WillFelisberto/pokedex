import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PokemonDetails } from './PokemonDetails';
const queryClient = new QueryClient();

const meta: Meta<typeof PokemonDetails> = {
  title: 'Templates/PokemonDetails',
  component: PokemonDetails,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  ],
  tags: ['autodocs'],
  args: {
    id: 1,
    name: 'bulbasaur',
    japaneseName: 'フシギダネ',
    region: 'Kanto',
    height: 70,
    weight: 69,
    totalPages: 5,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    },
    types: ['grass', 'poison'],
    baseStats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45
    }
  }
};

export default meta;

type Story = StoryObj<typeof PokemonDetails>;

export const Default: Story = {};
