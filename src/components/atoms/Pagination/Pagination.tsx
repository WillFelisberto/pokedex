import { usePagination } from '@/context/PaginationContext';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number | null;
  goToPage: (page: number) => void;
  isFetching: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
  isFetching
}) => {
  const { setCurrentPage } = usePagination();
  if (!totalPages) return null;

  const getPagesToShow = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(totalPages, start + 4);
      } else if (end === totalPages) {
        start = Math.max(1, end - 4);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    goToPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    goToPage(currentPage - 1);
  };

  const handleClickPage = (page: number) => {
    setCurrentPage(page);
    goToPage(page);
  };

  return (
    <div className="flex items-center gap-2 py-4">
      <button
        className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
        onClick={() => handlePrevPage()}
        disabled={isFetching || currentPage === 1}
      >
        ←
      </button>

      {getPagesToShow().map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-md transition ${
            page === currentPage
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          onClick={() => handleClickPage(page)}
          disabled={isFetching}
        >
          {page}
        </button>
      ))}

      <button
        className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
        onClick={() => handleNextPage()}
        disabled={isFetching || currentPage >= totalPages}
      >
        →
      </button>
    </div>
  );
};
