import { mockPokemon } from '@/mocks/pokemonMock';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { PokeCard } from '@/components/organisms/PokeCard';

const MockedPokemonList = () => {
  const pokemons = [mockPokemon];
  const isFetching = false;
  const loadMore = () => console.warn('Load More clicked');

  return (
    <div className="flex flex-col items-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[10px]">
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

const queryClient = new QueryClient();

const meta: Meta<typeof MockedPokemonList> = {
  title: 'Organisms/PokemonList',
  component: MockedPokemonList,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Story />
        </div>
      </QueryClientProvider>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof MockedPokemonList>;

export const Default: Story = {};
