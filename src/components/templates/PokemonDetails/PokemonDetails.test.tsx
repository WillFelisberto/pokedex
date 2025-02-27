import { useImageColors } from '@/hooks/useImageColors';
import { usePokemonDetails } from '@/hooks/usePokemonDetails';
import { render, screen } from '@/tests/test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PokemonDetails, PokemonDetailsProps } from './PokemonDetails';

jest.mock('@/hooks/useImageColors', () => ({
  useImageColors: jest.fn()
}));

jest.mock('@/hooks/usePokemonDetails', () => ({
  usePokemonDetails: jest.fn()
}));

const mockPokemon: PokemonDetailsProps = {
  totalPages: 1000,
  id: 25,
  name: 'pikachu',
  japaneseName: 'ピカチュウ',
  region: 'Kanto',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
  },
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

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  useParams: jest.fn(() => ({ slug: 'pikachu' }))
}));

const queryClient = new QueryClient();

const renderWithProvider = (ui: React.ReactNode) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('<PokemonDetails />', () => {
  beforeEach(() => {
    (usePokemonDetails as jest.Mock).mockReturnValue({
      pokemon: mockPokemon,
      isFetching: false,
      currentPage: 1,
      goToPage: jest.fn()
    });

    (useImageColors as jest.Mock).mockReturnValue({ isLoading: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Pokémon details correctly', () => {
    const { container } = renderWithProvider(<PokemonDetails {...mockPokemon} />);

    expect(screen.getByText(`#${mockPokemon.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    if (mockPokemon.japaneseName) {
      expect(
        screen
          .getAllByText(mockPokemon.japaneseName)
          .map((item) => item.textContent)
          .pop()
      ).toBe(mockPokemon.japaneseName);
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

    expect(container).toMatchSnapshot();
  });

  it('should show the loader when isLoading is true', () => {
    (useImageColors as jest.Mock).mockReturnValue({ isLoading: true });
    (usePokemonDetails as jest.Mock).mockReturnValue({ pokemon: null, isFetching: true });

    renderWithProvider(<PokemonDetails {...mockPokemon} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should not show the loader when isLoading is false', () => {
    (useImageColors as jest.Mock).mockReturnValue({ isLoading: false });
    (usePokemonDetails as jest.Mock).mockReturnValue({ pokemon: mockPokemon, isFetching: false });

    renderWithProvider(<PokemonDetails {...mockPokemon} />);

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
