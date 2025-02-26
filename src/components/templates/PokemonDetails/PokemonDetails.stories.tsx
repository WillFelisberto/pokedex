/* eslint-disable @typescript-eslint/no-explicit-any */
import { BackgroundColorProvider } from '@/context/BackgroundColorContext';
import type { Meta, StoryObj } from '@storybook/react';

import { PokemonDetails } from './PokemonDetails';

const withBackgroundProvider = (Story: React.ComponentType) => (
  <BackgroundColorProvider>
    <Story />
  </BackgroundColorProvider>
);

const mockUseImageColors = (isLoading: boolean) => ({
  isLoading,
  colors: {
    vibrant: '#b45646',
    muted: '#9c8551',
    darkVibrant: '#7e643c',
    darkMuted: '#5b4b31',
    lightVibrant: '#f4d47c',
    lightMuted: '#c1899c'
  }
});

const MockedPokemonDetails = (props: any) => {
  const { isLoading, ...rest } = props;

  const useImageColors = () => mockUseImageColors(isLoading);

  return <PokemonDetails {...rest} useImageColors={useImageColors} />;
};

const meta: Meta<typeof PokemonDetails> = {
  title: 'Templates/PokemonDetails',
  component: MockedPokemonDetails,
  tags: ['autodocs'],
  decorators: [withBackgroundProvider],

  args: {
    id: 25,
    name: 'Pikachu',
    japaneseName: 'ピカチュウ',
    region: 'Kanto',
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
    },
    types: ['electric'],
    height: 40,
    weight: 60,
    baseStats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90
    }
  }
};

export default meta;

type Story = StoryObj<typeof PokemonDetails>;

export const Default: Story = {};
