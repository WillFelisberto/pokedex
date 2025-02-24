'use client';

import { usePokemonList } from '@/hooks/usePokemonList';
import React from 'react';

import { PokeCard } from '@/components/organisms/PokeCard';

export const PokemonList = () => {
  const { pokemons, isFetching, loadMore } = usePokemonList();

  return (
    <div className="flex flex-col items-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[10px]  ">
        {pokemons.map((pokemon) => (
          <PokeCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <button
        onClick={loadMore}
        disabled={isFetching}
        className="mt-4 px-4 py-2 bg-blue-500 text-black rounded-lg disabled:opacity-50"
      >
        {isFetching ? 'Carregando...' : 'Carregar Mais'}
      </button>
    </div>
  );
};
