import type { Meta, StoryObj } from '@storybook/react';

import { PokeCard } from './PokeCard';

const meta: Meta<typeof PokeCard> = {
  title: 'Organisms/PokeCard', // Categoria e nome do componente
  component: PokeCard, // Componente sendo documentado
  tags: ['autodocs'], // Adiciona documentação automática
  args: {
    // Valores padrão para as props
    pokemon: {
      baseStats: {
        hp: 45,
        attack: 49,
        defense: 49,
        specialAttack: 65,
        specialDefense: 65,
        speed: 45
      },
      japaneseName: 'イビス',
      region: 'Kanto',
      id: 2,
      name: 'ivysaur',
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png'
      },
      types: ['grass', 'poison'],
      category: 'ivysaur',
      weight: 130,
      height: 10,
      weaknesses: ['flying', 'poison', 'bug', 'fire', 'ice'],
      evolutions: [
        {
          id: 1,
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          types: ['grass', 'poison'],
          level: null
        },
        {
          id: 2,
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
          types: ['grass', 'poison'],
          level: 16
        },
        {
          id: 3,
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon/3/',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
          types: ['grass', 'poison'],
          level: 32
        }
      ],
      abilities: [
        { name: 'overgrow', is_hidden: false },
        { name: 'chlorophyll', is_hidden: true }
      ],
      genderRatio: {
        male: 87.5,
        female: 12.5
      }
    }
  }
};

export default meta;

// Tipo para as histórias
type Story = StoryObj<typeof PokeCard>;

// História padrão
export const Default: Story = {};

// História sem evoluções
export const SemEvolucoes: Story = {
  args: {
    pokemon: {
      baseStats: {
        hp: 45,
        attack: 49,
        defense: 49,
        specialAttack: 65,
        specialDefense: 65,
        speed: 45
      },
      japaneseName: 'イビス',
      region: 'Kanto',
      ...(meta.args?.pokemon ?? {}),
      evolutions: [], // Remove as evoluções
      id: 2, // Ensure id is defined
      name: 'ivysaur', // Ensure name is defined
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png'
      },
      types: ['grass', 'poison'],
      category: 'ivysaur',
      weight: 130,
      height: 10,
      weaknesses: ['flying', 'poison', 'bug', 'fire', 'ice'],
      abilities: [
        { name: 'overgrow', is_hidden: false },
        { name: 'chlorophyll', is_hidden: true }
      ],
      genderRatio: {
        male: 87.5,
        female: 12.5
      }
    }
  }
};

// História com um Pokémon diferente
export const Charmander: Story = {
  args: {
    pokemon: {
      baseStats: {
        hp: 45,
        attack: 49,
        defense: 49,
        specialAttack: 65,
        specialDefense: 65,
        speed: 45
      },
      japaneseName: 'イビス',
      region: 'Kanto',
      id: 4,
      name: 'charmander',
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
      },
      types: ['fire'],
      category: 'charmander',
      weight: 85,
      height: 6,
      weaknesses: ['water', 'ground', 'rock'],
      evolutions: [
        {
          id: 4,
          name: 'charmander',
          url: 'https://pokeapi.co/api/v2/pokemon/4/',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
          types: ['fire'],
          level: null
        },
        {
          id: 5,
          name: 'charmeleon',
          url: 'https://pokeapi.co/api/v2/pokemon/5/',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
          types: ['fire'],
          level: 16
        },
        {
          id: 6,
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/',
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
          types: ['fire', 'flying'],
          level: 36
        }
      ],
      abilities: [
        { name: 'blaze', is_hidden: false },
        { name: 'solar-power', is_hidden: true }
      ],
      genderRatio: {
        male: 87.5,
        female: 12.5
      }
    }
  }
};
