import { render, screen } from '@/tests/test-utils';
import React from 'react';

import { PokemonProps } from '@/components/organisms/PokeCard';

import { EvolutionBadge } from '.';

// Mock do getPokemonTypeStyle para retornar valores fixos
jest.mock('@/lib/utils/poketypes/poketypes', () => ({
  __esModule: true,
  default: () => ({
    color: 'red',
    iconUrl: '/dummy-icon.png'
  })
}));

// Mock do PokeBadge para simplificar os testes, exibindo o tipo como texto
jest.mock('../PokeBadge', () => ({
  PokeBadge: ({ type }: { type: string }) => <span>{type}</span>
}));

describe('<EvolutionBadge />', () => {
  const evolutionProps: PokemonProps['evolutions'][number] = {
    level: 15,
    url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
    id: 1,
    name: 'bulbasaur',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['grass', 'poison']
  };

  it('should render the evolution name and formatted id', () => {
    const { container } = render(<EvolutionBadge {...evolutionProps} />);

    expect(screen.getByRole('heading', { name: /bulbasaur/i })).toBeInTheDocument();
    expect(screen.getByText('Nº001')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render two images: one for the icon and one for the sprite', () => {
    render(<EvolutionBadge {...evolutionProps} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);

    expect(screen.getByAltText('grass')).toBeInTheDocument();
    expect(screen.getByAltText('bulbasaur')).toBeInTheDocument();
  });

  it('should render a PokeBadge for each type', () => {
    render(<EvolutionBadge {...evolutionProps} />);
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });
});
