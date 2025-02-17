import { render, screen } from '@/tests/test-utils';

import { ProgressBar } from '.';

describe('<ProgressBar />', () => {
  it('should render gender label', () => {
    const { container } = render(<ProgressBar malePercentage={50} />);

    expect(screen.getByText(/GÊNERO/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render male percentage correctly', () => {
    render(<ProgressBar malePercentage={60} />);

    expect(screen.getByText(/60.0%/i)).toBeInTheDocument();
  });

  it('should render female percentage correctly', () => {
    render(<ProgressBar malePercentage={40} />);

    expect(screen.getByText(/60.0%/i)).toBeInTheDocument();
  });

  it('should have the correct styles for progress bars', () => {
    render(<ProgressBar malePercentage={70} />);

    const maleBar = screen.getByTestId('male-bar');
    const femaleBar = screen.getByTestId('female-bar');

    expect(maleBar).toHaveClass('bg-[#2551C3]');
    expect(femaleBar).toHaveClass('bg-[#FF7596]');
  });
});
