import { render, screen } from '@/tests/test-utils';

import { Loader } from './Loader';

describe('<Loader />', () => {
  it('should render the component', () => {
    const { container } = render(<Loader />);

    expect(screen.getByAltText('Loading...')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render the full screen loader', () => {
    const { container } = render(<Loader />);

    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('fixed');
    expect(container.firstChild).toHaveClass('w-screen h-screen bg-red-600');
  });

  it('should render only the spinning Pokéball when fullScreen is false', () => {
    const { container } = render(<Loader fullScreen={false} />);

    expect(screen.getByAltText('Loading...')).toBeInTheDocument();
    expect(container.firstChild).not.toHaveClass('fixed');
    expect(container.firstChild).not.toHaveClass('bg-red-600');
  });
});
