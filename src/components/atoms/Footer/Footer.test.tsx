import { render, screen } from '@/tests/test-utils';

import { Footer } from '.';

describe('<Footer />', () => {
  it('should render the footer with correct text and link', () => {
    const { container } = render(<Footer />);

    expect(screen.getByText(/Made with/i)).toBeInTheDocument();
    expect(screen.getByText(/Willian Felisberto/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Willian Felisberto/i });
    expect(link).toHaveAttribute('href', 'https://github.com/willFelisberto/');

    expect(container).toMatchSnapshot();
  });

  it('should be positioned at the bottom of the screen', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-transparent', 'bottom-0', 'w-full');
  });
});
