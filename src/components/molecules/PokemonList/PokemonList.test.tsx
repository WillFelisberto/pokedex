import { PaginationProvider } from '@/context/PaginationContext';
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

const renderWithProvider = (ui: React.ReactNode) => {
  return render(<PaginationProvider>{ui}</PaginationProvider>);
};

describe('<PokemonList />', () => {
  beforeEach(() => {
    mockUsePokemonList.mockReturnValue({
      pokemons: mockPokemons,
      isFetching: false,
      currentPage: 1,
      setSearchQuery: jest.fn(),
      error: null,
      totalPages: 10,
      goToPage: jest.fn()
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the list of pokemons', () => {
    const { container } = renderWithProvider(<PokemonList />);

    mockPokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });

  it('should render the loader when isFetching is true', () => {
    mockUsePokemonList.mockReturnValue({
      pokemons: [],
      isFetching: true,
      currentPage: 1,
      totalPages: 10,
      setSearchQuery: jest.fn(),
      error: null,
      goToPage: jest.fn()
    });

    renderWithProvider(<PokemonList />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render pagination', () => {
    renderWithProvider(<PokemonList />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('should disable pagination buttons when fetching', () => {
    mockUsePokemonList.mockReturnValue({
      pokemons: [],
      isFetching: true,
      currentPage: 1,
      totalPages: 10,
      setSearchQuery: jest.fn(),
      error: null,
      goToPage: jest.fn()
    });

    renderWithProvider(<PokemonList />);

    expect(screen.getByText('←')).toBeDisabled();
    expect(screen.getByText('→')).toBeDisabled();
  });

  it('should call goToPage when clicking on pagination buttons', () => {
    renderWithProvider(<PokemonList />);

    const nextButton = screen.getByText('→');
    fireEvent.click(nextButton);

    expect(mockUsePokemonList().goToPage).toHaveBeenCalledWith(2);
  });

  it('should disable the previous button on the first page', () => {
    mockUsePokemonList.mockReturnValue({
      pokemons: [],
      isFetching: false,
      currentPage: 1,
      totalPages: 10,
      setSearchQuery: jest.fn(),
      error: null,
      goToPage: jest.fn()
    });

    renderWithProvider(<PokemonList />);

    expect(screen.getByText('←')).toBeDisabled();
  });

  it('should disable the next button on the last page', () => {
    mockUsePokemonList.mockReturnValue({
      pokemons: [],
      isFetching: false,
      currentPage: 10,
      totalPages: 10,
      setSearchQuery: jest.fn(),
      error: null,
      goToPage: jest.fn()
    });

    renderWithProvider(<PokemonList />);

    expect(screen.getByText('→')).toBeDisabled();
  });
});
