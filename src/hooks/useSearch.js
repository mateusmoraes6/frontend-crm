import { useState, useMemo } from 'react';

export function useSearch(items, searchFields = ['name', 'email', 'phone', 'cpf']) {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (!search.trim()) return items;

    return items.filter(item => {
      const term = search.toLowerCase();
      return searchFields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(term);
      });
    });
  }, [items, search, searchFields]);

  return {
    search,
    setSearch,
    filteredItems
  };
}
