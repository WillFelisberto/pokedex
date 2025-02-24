import { render, screen } from '@/tests/test-utils';

import { PokemonStatus } from '.';

describe('<PokemonStatus />', () => {
  it('should render the correct values', () => {
    const { container } = render(<PokemonStatus height={10} weight={100} />);

    // Verifica se os elementos contendo os textos convertidos estão presentes
    expect(screen.getByText(/10 kg/i)).toBeInTheDocument();
    expect(screen.getByText(/1 m/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
