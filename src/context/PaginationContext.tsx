'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface PaginationContextType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationContext = createContext<PaginationContextType | null>(null);

interface PaginationProviderProps {
  children: ReactNode;
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = (): PaginationContextType => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }

  return context;
};
