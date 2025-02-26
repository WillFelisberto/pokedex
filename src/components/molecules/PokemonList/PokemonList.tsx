'use client';

import { usePokemonList } from '@/hooks/usePokemonList';
import React, { Suspense } from 'react';

import { Loader } from '@/components/atoms/Loader';
import { Pagination } from '@/components/atoms/Pagination';
import { PokeCard } from '@/components/organisms/PokeCard';

export const PokemonList = () => {
  const { pokemons, isFetching, totalPages, currentPage, goToPage } = usePokemonList();

  return (
    <div className="flex flex-col items-center p-4">
      {isFetching && <Loader />}

      <div className="flex flex-wrap justify-center gap-[1.5rem] w-full max-w-[1440px] px-4 sm:px-0">
        <Suspense fallback={<Loader fullScreen={false} />}>
          {pokemons.map((pokemon) => (
            <PokeCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </Suspense>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        isFetching={isFetching}
      />
    </div>
  );
};
