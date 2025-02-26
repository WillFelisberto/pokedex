import { render, screen } from '@/tests/test-utils';

import { Header } from '.';

describe('<Header />', () => {
  it('should render the header', () => {
    const { container } = render(<Header />);

    expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render the header with class', () => {
    render(<Header />);

    const header = screen.getByText(/Pokédex/i);

    expect(header).toHaveClass(
      'text-lg sm:text-xl font-bold font-[family-name:var(--font-press-start-2p)]'
    );
  });
});
