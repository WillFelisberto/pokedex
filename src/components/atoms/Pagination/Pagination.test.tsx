import { render, screen, fireEvent } from '@/tests/test-utils';

import { Pagination } from '.';

describe('<Pagination />', () => {
  const mockGoToPage = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render pagination with correct number of pages', () => {
    const { container } = render(
      <Pagination currentPage={3} totalPages={10} goToPage={mockGoToPage} isFetching={false} />
    );

    expect(screen.getByText('3')).toHaveClass('bg-blue-600');
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should call goToPage when clicking on a page number', () => {
    render(
      <Pagination currentPage={3} totalPages={10} goToPage={mockGoToPage} isFetching={false} />
    );

    fireEvent.click(screen.getByText('4'));
    expect(mockGoToPage).toHaveBeenCalledWith(4);
  });

  it('should disable previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={10} goToPage={mockGoToPage} isFetching={false} />
    );

    expect(screen.getByText('←')).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    render(
      <Pagination currentPage={10} totalPages={10} goToPage={mockGoToPage} isFetching={false} />
    );

    expect(screen.getByText('→')).toBeDisabled();
  });

  it('should disable all buttons while fetching', () => {
    render(
      <Pagination currentPage={3} totalPages={10} goToPage={mockGoToPage} isFetching={true} />
    );

    expect(screen.getByText('←')).toBeDisabled();
    expect(screen.getByText('→')).toBeDisabled();
    expect(screen.getByText('3')).toBeDisabled();
  });
});
