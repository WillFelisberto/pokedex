import { PaginationProvider } from '@/context/PaginationContext';
import { render, screen, fireEvent } from '@/tests/test-utils';

import { Pagination } from '.';

const renderWithProvider = (ui: React.ReactNode) => {
  return render(<PaginationProvider>{ui}</PaginationProvider>);
};

describe('<Pagination />', () => {
  const mockGoToPage = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render pagination with correct number of pages', () => {
    const { container } = renderWithProvider(
      <Pagination currentPage={3} totalPages={10} goToPage={mockGoToPage} isFetching={false} />
    );
    expect(screen.getByTestId('pagination-button-3')).toHaveClass('font-bold');
    expect(screen.getByTestId('pagination-button-2')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-button-4')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should call goToPage when clicking on a page number', () => {
    renderWithProvider(
      <Pagination currentPage={3} totalPages={10} goToPage={mockGoToPage} isFetching={false} />
    );

    fireEvent.click(screen.getByText('4'));
    expect(mockGoToPage).toHaveBeenCalledWith(4);
  });

  it('should disable previous button on first page', () => {
    renderWithProvider(
      <Pagination currentPage={1} totalPages={10} goToPage={mockGoToPage} isFetching={false} />
    );

    expect(screen.getByTestId('previous-button')).toBeDisabled();
  });

  it('should disable next button on last page', () => {
    renderWithProvider(
      <Pagination currentPage={10} totalPages={10} goToPage={mockGoToPage} isFetching={false} />
    );

    expect(screen.getByTestId('next-button')).toBeDisabled();
  });

  it('should disable   buttons while fetching', () => {
    renderWithProvider(
      <Pagination currentPage={3} totalPages={10} goToPage={mockGoToPage} isFetching={true} />
    );

    expect(screen.getByTestId('previous-button')).toBeDisabled();
    expect(screen.getByTestId('next-button')).toBeDisabled();
  });
});
