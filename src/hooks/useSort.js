import { useState } from 'react';

export function useSort(initialSortField = 'name') {
  const [sortField, setSortField] = useState(initialSortField);
  const [sortOrder, setSortOrder] = useState('asc');

  const compareValues = (a, b, field) => {
    if (!a[field] && !b[field]) return 0;
    if (!a[field]) return 1;
    if (!b[field]) return -1;

    if (field === 'name') {
      return a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' });
    }
    if (field === 'createdAt' || field === 'birthDate') {
      return new Date(a[field]) - new Date(b[field]);
    }
    return 0;
  };

  const sortItems = (items) => {
    if (!items) return [];
    return [...items].sort((a, b) => {
      const result = compareValues(a, b, sortField);
      return sortOrder === 'asc' ? result : -result;
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return {
    sortField,
    setSortField,
    sortOrder,
    toggleSortOrder,
    sortItems
  };
}