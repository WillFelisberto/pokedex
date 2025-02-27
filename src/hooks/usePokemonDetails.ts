/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_POKEAPI_URL;

const fetchPokemonById = async (id: number) => {
  const response = await fetch(`${API_URL}/pokemon/${id}`);
  if (!response.ok) throw new Error('Pokémon não encontrado');
  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    sprites: {
      front_default: data.sprites.other['official-artwork'].front_default
    },
    types: data.types.map((t: any) => t.type.name),
    height: data.height,
    weight: data.weight,
    baseStats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat
    }
  };
};

export const usePokemonDetails = () => {
  const params = useParams(); // Pegamos o "slug" da URL
  const router = useRouter();

  const currentPage = Number(params.slug) || 1;

  const {
    data: pokemon,
    isFetching,
    error
  } = useQuery({
    queryKey: ['pokemon', currentPage],
    queryFn: () => fetchPokemonById(currentPage),
    staleTime: 5000
  });

  const goToPage = (page: number) => {
    if (page < 1 || page > 1010) return; // Número total de Pokémon na API
    router.push(`/${page}`, { scroll: false });
  };

  return { pokemon, isFetching, error, goToPage, currentPage };
};
