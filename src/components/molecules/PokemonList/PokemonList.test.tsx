import { usePokemonList } from '@/hooks/usePokemonList';
import { mockPokemon } from '@/mocks/pokemonMock';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { PokemonList } from './PokemonList';

jest.mock('@/hooks/usePokemonList');
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue('1') // Simula "page=1" na URL
  })
}));

const mockUsePokemonList = usePokemonList as jest.MockedFunction<typeof usePokemonList>;

const mockPokemons = [mockPokemon];

describe('<PokemonList />', () => {
  beforeEach(() => {
    mockUsePokemonList.mockReturnValue({
      pokemons: mockPokemons,
      isFetching: false,
      currentPage: 1,
      totalPages: 10,
      error: null,
      setSearchQuery: jest.fn(),
      goToPage: jest.fn()
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the list of pokemons', () => {
    render(<PokemonList />);

    mockPokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });

  it('should render the loader when isFetching is true', () => {
    mockUsePokemonList.mockReturnValue({
      pokemons: [],
      isFetching: true,
      currentPage: 1,
      error: null,
      setSearchQuery: jest.fn(),
      totalPages: 10,
      goToPage: jest.fn()
    });

    render(<PokemonList />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render pagination', () => {
    render(<PokemonList />);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should disable pagination buttons when fetching', () => {
    mockUsePokemonList.mockReturnValue({
      pokemons: [],
      error: null,
      setSearchQuery: jest.fn(),
      isFetching: true,
      currentPage: 1,
      totalPages: 10,
      goToPage: jest.fn()
    });

    render(<PokemonList />);

    expect(screen.getByTestId('previous-button')).toHaveAttribute('disabled');

    expect(screen.getByTestId('next-button')).toHaveAttribute('disabled');
  });

  it('should call goToPage when clicking on next pagination button', () => {
    render(<PokemonList />);

    const nextButton = screen.getByTestId('next-button');

    fireEvent.click(nextButton);

    expect(mockUsePokemonList().goToPage).toHaveBeenCalledWith(2);
  });

  it('should disable the previous button on the first page', () => {
    render(<PokemonList />);

    expect(screen.getByTestId('previous-button')).toHaveAttribute('disabled');
  });

  it('should disable the next button on the last page', () => {
    mockUsePokemonList.mockReturnValue({
      pokemons: [],
      isFetching: false,
      error: null,
      setSearchQuery: jest.fn(),
      currentPage: 10,
      totalPages: 10,
      goToPage: jest.fn()
    });

    render(<PokemonList />);

    expect(screen.getByTestId('next-button')).toHaveAttribute('disabled');
  });
});
