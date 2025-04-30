import { useState, useEffect } from 'react';

export function usePagination(items, itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // useEffect para atualizar a página quando os items mudarem
  useEffect(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [items.length, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
}
