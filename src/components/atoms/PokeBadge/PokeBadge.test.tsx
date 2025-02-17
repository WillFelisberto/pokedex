import { render, screen } from '@/tests/test-utils';
import '@testing-library/jest-dom';

import { PokemonType } from '@/lib/utils/poketypes';

import { PokeBadge } from '.';

describe('<PokeBadge />', () => {
  const type: PokemonType = 'fire';

  it('should render the badge', () => {
    const { container } = render(<PokeBadge type={type} />);
    expect(screen.getByText(/Fire/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render the icon', () => {
    render(<PokeBadge type={type} />);
    const icon = screen.getByRole('img', { name: /fire/i });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', expect.stringContaining('fire.png'));
  });

  it('should render the text', () => {
    render(<PokeBadge type={type} />);
    expect(screen.getByText('Fire')).toBeInTheDocument();
  });

  it('should have the correct background color', () => {
    render(<PokeBadge type={type} />);
    const badge = screen.getByTestId('poke-badge');
    expect(badge).toHaveClass('bg-pokemon-fire');
  });
});
