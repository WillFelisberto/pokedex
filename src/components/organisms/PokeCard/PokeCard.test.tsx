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
});
