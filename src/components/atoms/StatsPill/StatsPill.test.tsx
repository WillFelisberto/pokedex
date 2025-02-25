import { render, screen } from '@/tests/test-utils';

import { StatsPill } from '.';

describe('<StatsPill />', () => {
  it('should render the component', () => {
    const { container } = render(<StatsPill title="StatsPill" />);

    expect(screen.getByText(/StatsPill/i)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should have the correct styles', () => {
    render(<StatsPill title="StatsPill" />);

    const statsPill = screen.getByText(/StatsPill/i);
    expect(statsPill).toHaveClass('shadow-lg');
    expect(statsPill).toHaveClass('font-semibold');
    expect(statsPill).toHaveClass('uppercase');
    expect(statsPill).toHaveClass('text-center');
    expect(statsPill).toHaveClass('text-gray-700');
    expect(statsPill).toHaveClass('bg-white');
    expect(statsPill).toHaveClass('rounded-xl');
    expect(statsPill).toHaveClass('py-2');
    expect(statsPill).toHaveClass('px-5');
    expect(statsPill).toHaveClass('hover:bg-gray-100');
  });
});
