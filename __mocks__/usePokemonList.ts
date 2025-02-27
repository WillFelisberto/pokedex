/* eslint-disable no-console */
// src/hooks/__mocks__/usePokemonList.ts
export const usePokemonList = () => ({
  pokemons: [
    {
      id: 1,
      name: 'Pikachu',
      image: '/images/pikachu.png',
      type: 'Electric'
    },
    {
      id: 2,
      name: 'Charmander',
      image: '/images/charmander.png',
      type: 'Fire'
    }
  ],
  isFetching: false,
  totalPages: 5,
  currentPage: 1,
  goToPage: (page: number) => console.log(`Going to page ${page}`)
});
