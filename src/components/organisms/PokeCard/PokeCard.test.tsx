import { mockPokemon } from '@/mocks/pokemonMock';
import { render, screen } from '@/tests/test-utils';
import React from 'react';

import { PokeCard } from './PokeCard';

describe('PokeCard', () => {
  it('Should render the component', () => {
    const { container } = render(<PokeCard pokemon={mockPokemon} />);
    expect(screen.getByTestId('poke-card')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('Should render the pokemon name', () => {
    render(<PokeCard pokemon={mockPokemon} />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/ivysaur/i);
  });

  it('Should render the pokemon number', () => {
    render(<PokeCard pokemon={mockPokemon} />);

    const pokemonId = screen.getByTestId('pokemon-id');
    expect(pokemonId).toBeInTheDocument();
    expect(pokemonId).toHaveTextContent(/Nº002/i);
  });

  it('Should render the pokemon types', () => {
    render(<PokeCard pokemon={mockPokemon} />);

    const pokemonTypes = screen.getByTestId('pokemon-types');
    expect(pokemonTypes).toBeInTheDocument();
  });

  it('Should render the pokemon weaknesses', () => {
    render(<PokeCard pokemon={mockPokemon} />);

    const pokemonWeaknesses = screen.getByTestId('pokemon-weaknesses');
    expect(pokemonWeaknesses).toBeInTheDocument();
    expect(pokemonWeaknesses).toHaveTextContent(/flying/i);
    expect(pokemonWeaknesses).toHaveTextContent(/fire/i);
  });

  it('Should render the pokemon evolutions', () => {
    render(<PokeCard pokemon={mockPokemon} />);
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/venusaur/i)).toBeInTheDocument();
  });

  it('Should render the pokemon without evolutions', () => {
    const pokemonSemEvolucoes = { ...mockPokemon, evolutions: [] };
    render(<PokeCard pokemon={pokemonSemEvolucoes} />);
    expect(screen.getByText(/Não possui evolução/i)).toBeInTheDocument();
  });
});
