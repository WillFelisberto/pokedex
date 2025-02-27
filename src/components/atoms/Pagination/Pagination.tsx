'use client';

import { clsx } from 'clsx';
import { ChevronLeft, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '../Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number | null;
  goToPage: (page: number) => void;
  isFetching: boolean;
  className?: string;
}

const PaginationIconNext = () => {
  return (
    <>
      <ChevronDown className="hidden md:hidden lg:block" />
      <ChevronRight className="md:block lg:hidden" />
    </>
  );
};

const PaginationIconPrev = () => {
  return (
    <>
      <ChevronUp className="hidden md:hidden lg:block" />
      <ChevronLeft className="md:block lg:hidden" />
    </>
  );
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
  isFetching,
  className
}) => {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [pagesToShow, setPagesToShow] = useState(5);

  useEffect(() => {
    const updatePagesToShow = () => {
      if (window.innerWidth < 1024) {
        setPagesToShow(5);
      } else {
        const maxPages = Math.floor(window.innerHeight / 50);
        setPagesToShow(maxPages);
      }
    };

    updatePagesToShow();
    window.addEventListener('resize', updatePagesToShow);

    return () => {
      window.removeEventListener('resize', updatePagesToShow);
    };
  }, []);

  useEffect(() => {
    if (!totalPages) return;

    const half = Math.floor(pagesToShow / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + pagesToShow - 1);

    if (end - start < pagesToShow - 1) {
      start = Math.max(1, end - pagesToShow + 1);
    }

    setVisiblePages(Array.from({ length: end - start + 1 }, (_, i) => start + i));
  }, [currentPage, totalPages, pagesToShow]);

  useEffect(() => {
    const handleResize = () => {
      window.dispatchEvent(new Event('resize'));
    };

    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > (totalPages as number)) return;
    goToPage(page);
  };

  return (
    <div
      className={clsx(
        'relative flex items-center py-4 w-full max-w-full overflow-hidden',
        'flex-row justify-center lg:flex-col lg:h-screen md:h-auto',
        className
      )}
    >
      <Button
        testId="previous-button"
        className="px-2 py-2 bg-transparent text-white rounded-md hover:scale-110 disabled:opacity-50 hover:text-red-500 transition"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFetching || currentPage === 1}
        icon={<PaginationIconPrev />}
      />

      <div className="flex space-x-1 md:flex-row lg:flex-col md:space-x-2 lg:space-x-0 md:space-y-0 lg:space-y-2 overflow-hidden">
        {visiblePages.map((page) => (
          <Button
            testId={`pagination-button-${page}`}
            key={page}
            className={clsx(
              'px-4 py-2 rounded-md transition bg-transparent',
              page === currentPage
                ? '!scale-125 font-bold'
                : 'text-white hover:scale-125 disabled:opacity-50'
            )}
            onClick={() => handlePageChange(page)}
            disabled={isFetching}
            text={page.toString()}
          />
        ))}
      </div>

      <Button
        testId="next-button"
        className="px-2 py-2 bg-transparent text-white rounded-md disabled:opacity-50 hover:text-red-500 transition"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isFetching || currentPage >= (totalPages as number)}
        icon={<PaginationIconNext />}
      />
    </div>
  );
};
