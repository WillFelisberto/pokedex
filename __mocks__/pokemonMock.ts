import { PokemonProps } from '@/components/organisms/PokeCard';

export const mockPokemon: PokemonProps = {
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
};
