import { usePokemonList } from '@/hooks/usePokemonList';
import { mockPokemon } from '@/mocks/pokemonMock';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { PokemonList } from './PokemonList';

jest.mock('@/hooks/usePokemonList');

const mockUsePokemonList = usePokemonList as jest.MockedFunction<typeof usePokemonList>;

const mockPokemons = [mockPokemon];

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
    const { container } = render(<PokemonList />);

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

    render(<PokemonList />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render pagination', () => {
    render(<PokemonList />);

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

    render(<PokemonList />);

    expect(screen.getByText('←')).toBeDisabled();
    expect(screen.getByText('→')).toBeDisabled();
  });

  it('should call goToPage when clicking on pagination buttons', () => {
    render(<PokemonList />);

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

    render(<PokemonList />);

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

    render(<PokemonList />);

    expect(screen.getByText('→')).toBeDisabled();
  });
});
