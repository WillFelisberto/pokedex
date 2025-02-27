/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';

import { PokemonProps } from '@/components/organisms/PokeCard';

import { PokemonType } from '@/lib/utils/poketypes';

// Define a região com base no ID do Pokémon
function determineRegion(id: number): string {
  if (id <= 151) return 'Kanto';
  if (id <= 251) return 'Johto';
  if (id <= 386) return 'Hoenn';
  if (id <= 493) return 'Sinnoh';
  if (id <= 649) return 'Unova';
  if (id <= 721) return 'Kalos';
  if (id <= 809) return 'Alola';
  if (id <= 898) return 'Galar';

  return 'Unknown';
}

// Determina as fraquezas do Pokémon com base em seus tipos
function determineWeaknesses(types: PokemonType[]): PokemonType[] {
  const typeChart: Record<PokemonType, PokemonType[]> = {
    fire: ['water', 'rock', 'ground'],
    water: ['electric', 'grass'],
    grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
    electric: ['ground'],
    ice: ['fire', 'fighting', 'rock', 'steel'],
    fighting: ['flying', 'psychic', 'fairy'],
    poison: ['ground', 'psychic'],
    ground: ['water', 'grass', 'ice'],
    flying: ['electric', 'ice', 'rock'],
    psychic: ['bug', 'ghost', 'dark'],
    bug: ['fire', 'flying', 'rock'],
    rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
    ghost: ['ghost', 'dark'],
    dragon: ['ice', 'dragon', 'fairy'],
    dark: ['fighting', 'bug', 'fairy'],
    steel: ['fire', 'fighting', 'ground'],
    fairy: ['poison', 'steel'],
    normal: ['fighting']
  };

  const weaknesses = new Set<PokemonType>();

  types.forEach((type) => {
    if (typeChart[type]) {
      typeChart[type].forEach((weakness) => weaknesses.add(weakness));
    }
  });

  return Array.from(weaknesses);
}

// Extrai as evoluções da cadeia de evolução da API
function extractEvolutions(evolutionData: any) {
  const evolutionChain = [];
  let current = evolutionData.chain;

  while (current) {
    const speciesId = extractPokemonId(current.species.url);
    evolutionChain.push({
      id: speciesId,
      name: current.species.name,
      url: `/pokemon/${speciesId}`,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`,
      types: [],
      level: current.evolution_details.length > 0 ? current.evolution_details[0].min_level : null
    });

    current = current.evolves_to.length > 0 ? current.evolves_to[0] : null;
  }

  return evolutionChain;
}

// Extrai o ID do Pokémon a partir da URL da API
function extractPokemonId(url: string): number {
  const parts = url.split('/');

  return parseInt(parts[parts.length - 2], 10);
}

export async function fetchPokemonById(id: string): Promise<PokemonProps> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_POKEAPI_URL}/pokemon/${id}`);
  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  // Buscar informações adicionais como nome japonês, categoria e fraquezas
  const speciesResponse = await fetch(data.species.url);
  const speciesData = await speciesResponse.json();

  // Buscar informações de evoluções
  const evolutionResponse = await fetch(speciesData.evolution_chain.url);
  const evolutionData = await evolutionResponse.json();

  // Mapear as evoluções
  const evolutions = extractEvolutions(evolutionData);

  return {
    id: data.id,
    name: data.name,
    japaneseName: speciesData.names.find((n: any) => n.language.name === 'ja')?.name || '',
    region: determineRegion(data.id),
    sprites: {
      front_default:
        data.sprites.other['official-artwork'].front_default || data.sprites.front_default
    },
    types: data.types.map((t: any) => t.type.name),
    category: speciesData.genera.find((g: any) => g.language.name === 'en')?.genus || 'Unknown',
    weight: data.weight,
    height: data.height,
    weaknesses: determineWeaknesses(data.types.map((t: any) => t.type.name)),
    evolutions,
    abilities: data.abilities.map((a: any) => ({
      name: a.ability.name,
      is_hidden: a.is_hidden
    })),
    genderRatio: {
      male: speciesData.gender_rate !== -1 ? (8 - speciesData.gender_rate) * 12.5 : 0,
      female: speciesData.gender_rate !== -1 ? speciesData.gender_rate * 12.5 : 0
    },
    baseStats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat
    }
  };
}
