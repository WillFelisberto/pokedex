/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PokemonType } from '@/lib/utils/poketypes';

const API_URL = 'https://pokeapi.co/api/v2';
const POKEMONS_PER_PAGE = 12;

const fetchPokemons = async (page: number) => {
  const offset = (page - 1) * POKEMONS_PER_PAGE;
  const res = await fetch(`${API_URL}/pokemon?offset=${offset}&limit=${POKEMONS_PER_PAGE}`);
  const data = await res.json();

  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon: { url: string }) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();

      return {
        id: details.id,
        name: details.name,
        sprites: {
          front_default: details.sprites.other['official-artwork'].front_default
        },
        types: details.types.map((t: any) => t.type.name) as PokemonType[],
        height: details.height,
        weight: details.weight
      };
    })
  );

  return { pokemons: detailedPokemons, total: data.count };
};

const searchPokemon = async (query: string) => {
  const res = await fetch(`${API_URL}/pokemon/${query.toLowerCase()}`);
  if (!res.ok) return null;
  const details = await res.json();

  return [
    {
      id: details.id,
      name: details.name,
      sprites: {
        front_default: details.sprites.other['official-artwork'].front_default
      },
      types: details.types.map((t: any) => t.type.name) as PokemonType[],
      height: details.height,
      weight: details.weight
    }
  ];
};

export const usePokemonList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const { data, isFetching, refetch, error } = useQuery({
    queryKey: ['pokemonList', currentPage],
    queryFn: () => fetchPokemons(currentPage),
    enabled: !searchQuery,
    staleTime: 5000
  });

  const { data: searchedPokemon, refetch: refetchSearch } = useQuery({
    queryKey: ['searchPokemon', searchQuery],
    queryFn: () => searchPokemon(searchQuery),
    enabled: !!searchQuery,
    staleTime: 5000
  });

  useEffect(() => {
    if (data?.total) {
      setTotalPages(Math.ceil(data.total / POKEMONS_PER_PAGE));
    }
  }, [data]);

  useEffect(() => {
    if (searchQuery) {
      refetchSearch();
    } else {
      refetch();
    }
  }, [searchQuery, currentPage, refetch, refetchSearch]);

  const goToPage = (page: number) => {
    if (page > 0 && totalPages && page <= totalPages) {
      setCurrentPage(page);
      router.push(`?page=${page}`, { scroll: false });
    }
  };

  return {
    pokemons: searchQuery ? searchedPokemon || [] : data?.pokemons || [],
    isFetching,
    error,
    goToPage,
    currentPage,
    setSearchQuery,
    totalPages
  };
};
