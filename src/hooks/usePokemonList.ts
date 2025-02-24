/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { PokemonProps } from '@/components/organisms/PokeCard';

const API_URL = 'https://pokeapi.co/api/v2';

const getIdFromSpeciesUrl = (url: string): number => {
  const parts = url.split('/');
  // O ID é o penúltimo elemento, pois a URL termina com uma barra

  return parseInt(parts[parts.length - 2], 10);
};

const getPokemonDetailsById = async (id: number) => {
  const res = await fetch(`${API_URL}/pokemon/${id}`);
  const details = await res.json();

  return {
    id: details.id,
    sprite: details.sprites.other['official-artwork'].front_default,
    evolutionSprite: details.sprites.front_default,
    types: details.types.map((t: any) => t.type.name)
  };
};

const processEvolutionNode = async (
  node: any,
  evolutionLevel: number | null = null
): Promise<
  Array<{
    id: number;
    name: string;
    sprite: string;
    types: string[];
    level: number | null;
  }>
> => {
  const id = getIdFromSpeciesUrl(node.species.url);
  const details = await getPokemonDetailsById(id);

  const currentEvolution = {
    id: details.id,
    name: node.species.name,
    sprite: details.evolutionSprite,
    types: details.types,
    level: evolutionLevel
  };

  let evolutions = [currentEvolution];

  for (const child of node.evolves_to) {
    const childEvolutionLevel = child.evolution_details?.[0]?.min_level ?? null;
    const childEvolutions = await processEvolutionNode(child, childEvolutionLevel);
    evolutions = evolutions.concat(childEvolutions);
  }

  return evolutions;
};

const fetchPokemons = async (offset: number): Promise<PokemonProps[]> => {
  const res = await fetch(`${API_URL}/pokemon?offset=${offset}&limit=15`);
  const data = await res.json();

  // Buscar detalhes de cada Pokémon individualmente
  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon: { url: string }) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();

      // Buscar fraquezas
      const weaknessesRes = await fetch(details.types[0].type.url);
      const weaknessesData = await weaknessesRes.json();
      const weaknesses = weaknessesData.damage_relations.double_damage_from.map((w: any) => w.name);

      // Buscar evoluções com sprite, id, nível e types
      const speciesRes = await fetch(details.species.url);
      const speciesData = await speciesRes.json();
      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionRes.json();

      const evolutionChain = await processEvolutionNode(evolutionData.chain);

      // Buscar distribuição de gênero
      const genderRes = await fetch(`${API_URL}/pokemon-species/${details.id}/`);
      const genderData = await genderRes.json();
      const maleRatio = 100 - genderData.gender_rate * 12.5;
      const femaleRatio = genderData.gender_rate * 12.5;

      return {
        id: details.id,
        name: details.name,
        weight: details.weight,
        height: details.height,
        sprites: {
          front_default: details.sprites.other['official-artwork'].front_default
        },
        types: details.types.map((t: any) => t.type.name),
        category: details.species.name,
        weaknesses: weaknesses,
        evolutions: evolutionChain,
        abilities: details.abilities.map((a: any) => ({
          name: a.ability.name,
          is_hidden: a.is_hidden
        })),
        genderRatio: {
          male: maleRatio,
          female: femaleRatio
        }
      };
    })
  );

  return detailedPokemons;
};

export const usePokemonList = () => {
  const [offset, setOffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState<PokemonProps[]>([]);

  const { data, isFetching, refetch, isSuccess } = useQuery({
    queryKey: ['pokemonList', offset],
    queryFn: () => fetchPokemons(offset),
    staleTime: 5000
  });

  useEffect(() => {
    if (isSuccess && data && data.length > 0) {
      setAllPokemons((prev) => (offset === 0 ? data : [...prev, ...data]));
    }
  }, [data, offset, isSuccess]);

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + 15);
    refetch();
  };

  return {
    pokemons: allPokemons || [],
    isFetching,
    loadMore
  };
};
