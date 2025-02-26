import { PaginationProvider } from '@/context/PaginationContext';
import { useImageColors } from '@/hooks/useImageColors';
import { render, screen } from '@/tests/test-utils';

import { PokemonProps } from '@/components/organisms/PokeCard';

import { PokemonDetails } from './PokemonDetails';

jest.mock('@/hooks/useImageColors', () => ({
  useImageColors: jest.fn()
}));

const mockPokemon: Pick<
  PokemonProps,
  | 'sprites'
  | 'types'
  | 'baseStats'
  | 'height'
  | 'weight'
  | 'id'
  | 'name'
  | 'japaneseName'
  | 'region'
> = {
  id: 25,
  name: 'pikachu',
  japaneseName: 'ピカチュウ',
  region: 'Kanto',
  sprites: { front_default: '/pikachu.png' },
  types: ['electric'],
  height: 40,
  weight: 60,
  baseStats: {
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90
  }
};

const renderWithProvider = (ui: React.ReactNode) => {
  return render(<PaginationProvider>{ui}</PaginationProvider>);
};

describe('<PokemonDetails />', () => {
  it('should render the Pokémon details correctly', () => {
    (useImageColors as jest.Mock).mockReturnValue({ isLoading: false });

    renderWithProvider(<PokemonDetails {...mockPokemon} />);

    expect(screen.getByText(`#${mockPokemon.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    if (mockPokemon.japaneseName) {
      expect(screen.getByText(mockPokemon.japaneseName)).toBeInTheDocument();
    }

    const image = screen.getByAltText(mockPokemon.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPokemon.sprites.front_default);

    mockPokemon.types.forEach((type) => {
      expect(screen.getByAltText(type)).toBeInTheDocument();
    });

    expect(screen.getByText(`HP: ${mockPokemon.baseStats.hp}`)).toBeInTheDocument();
    expect(screen.getByText(`Attack: ${mockPokemon.baseStats.attack}`)).toBeInTheDocument();
    expect(screen.getByText(`Defense: ${mockPokemon.baseStats.defense}`)).toBeInTheDocument();
    expect(
      screen.getByText(`SP. Attack: ${mockPokemon.baseStats.specialAttack}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`SP. Defense: ${mockPokemon.baseStats.specialDefense}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Speed: ${mockPokemon.baseStats.speed}`)).toBeInTheDocument();
  });

  it('should show the loader when isLoading is true', () => {
    (useImageColors as jest.Mock).mockReturnValue({ isLoading: true });

    renderWithProvider(<PokemonDetails {...mockPokemon} />);

    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
  });

  it('should not show the loader when isLoading is false', () => {
    (useImageColors as jest.Mock).mockReturnValue({ isLoading: false });

    renderWithProvider(<PokemonDetails {...mockPokemon} />);

    expect(screen.queryByAltText('Loading...')).not.toBeInTheDocument();
  });
});
