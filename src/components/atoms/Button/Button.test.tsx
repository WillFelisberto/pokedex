import { render, fireEvent, screen } from '@/tests/test-utils';

import { Button } from '.';

describe('<Button />', () => {
  it('should render with text', () => {
    const { container } = render(<Button text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should render with an icon', () => {
    render(<Button text="Launch" icon={<span data-testid="icon">🚀</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should handle onClick event', () => {
    const onClickMock = jest.fn();
    render(<Button text="Click me" onClick={onClickMock} />);

    fireEvent.click(screen.getByText('Click me'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the prop is set', () => {
    const { container } = render(<Button text="Disabled" disabled />);
    expect(container.firstChild).toBeDisabled();
  });

  it('should accept custom classes', () => {
    const { container } = render(<Button text="Styled" className="px-5" />);
    expect(container.firstChild).toHaveClass('px-5');
  });
});
