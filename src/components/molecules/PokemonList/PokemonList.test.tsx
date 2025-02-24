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
      loadMore: jest.fn()
    });
  });

  it('Should render pokemons', () => {
    const { container } = render(<PokemonList />);

    mockPokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName).toHaveTextContent(pokemon.name);
    });

    expect(container).toMatchSnapshot();
  });

  it('Should render the "Carregar Mais" button', () => {
    render(<PokemonList />);
    expect(screen.getByText('Carregar Mais')).toBeInTheDocument();
  });

  it('Should call loadMore when the "Carregar Mais" button is clicked', () => {
    render(<PokemonList />);

    const button = screen.getByText('Carregar Mais');
    fireEvent.click(button);

    expect(mockUsePokemonList().loadMore).toHaveBeenCalled();
  });

  it('Should render "Carregando..." when isFetching is true', () => {
    mockUsePokemonList.mockReturnValue({
      pokemons: [],
      isFetching: true,
      loadMore: jest.fn()
    });

    render(<PokemonList />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('Should disable the "Carregar Mais" button when isFetching is true', () => {
    mockUsePokemonList.mockReturnValue({
      pokemons: [],
      isFetching: true,
      loadMore: jest.fn()
    });

    render(<PokemonList />);

    const button = screen.getByText('Carregando...');
    expect(button).toBeDisabled();
  });
});
