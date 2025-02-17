import { render, screen } from '@/tests/test-utils';

import { StatItem } from './StatItem';

describe('<StatItem />', () => {
  it('should render the correct label for height', () => {
    const { container } = render(<StatItem type="height" value="0.5 m" />);
    expect(screen.getByText(/Altura/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render the correct label for weight', () => {
    render(<StatItem type="weight" value="9.0 kg" />);
    expect(screen.getByText(/Peso/i)).toBeInTheDocument();
  });

  it('should render the correct label for category', () => {
    render(<StatItem type="category" value="Tiny Turtle" />);
    expect(screen.getByText(/Categoria/i)).toBeInTheDocument();
  });

  it('should render the correct label for ability', () => {
    render(<StatItem type="ability" value="Torrent" />);
    expect(screen.getByText(/Habilidade/i)).toBeInTheDocument();
  });

  it('should display the correct value', () => {
    render(<StatItem type="height" value="0.5 m" />);
    expect(screen.getByText(/0.5 m/i)).toBeInTheDocument();
  });

  it('should render the correct icon for type', () => {
    render(<StatItem type="height" value="0.5 m" />);
    const icon = screen.getByAltText('height');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/icons/svg/outlined/height.svg');
  });
});
