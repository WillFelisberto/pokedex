import { render, screen } from '@/tests/test-utils';

import { PokemonHeader } from '.';

describe('<PokemonHeader />', () => {
  it('should render the Pokemon sprite', () => {
    const { container } = render(
      <PokemonHeader name="Charizard" spriteUrl="/sprites/charizard.png" types={['fire']} />
    );
    const sprite = screen.getByAltText('Charizard');
    expect(sprite).toBeInTheDocument();
    expect(sprite).toHaveAttribute('src', expect.stringContaining('/sprites/charizard.png'));

    expect(container).toMatchSnapshot();
  });

  it('should render the type icon', () => {
    render(<PokemonHeader name="Pikachu" spriteUrl="/sprites/pikachu.png" types={['electric']} />);
    const typeIcon = screen.getByAltText('electric');
    expect(typeIcon).toBeInTheDocument();
  });

  it('should apply background gradient', () => {
    render(<PokemonHeader name="Bulbasaur" spriteUrl="/sprites/bulbasaur.png" types={['grass']} />);
    const header = screen.getByTestId('pokemon-header');
    expect(header).toHaveStyle('background: linear-gradient');
  });
});
