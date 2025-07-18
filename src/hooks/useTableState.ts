import {useState, useMemo} from 'react';
import {sortUsers} from '../utils/sortUtils';
import {filterUsers} from '../utils/filterUtils';
import {DEFAULT_PAGINATION} from '../constants/api';
import type {User} from '../types/user';
import type {FilterValues, SortOrder} from '../types/filters';

const initialFilters: FilterValues = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  country: '',
  city: '',
};

export function useTableState(users: User[]) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    DEFAULT_PAGINATION.INITIAL_PAGE,
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    DEFAULT_PAGINATION.ITEMS_PER_PAGE,
  );
  const [filters, setFilters] = useState<FilterValues>(initialFilters);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) =>
        prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc',
      );
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(DEFAULT_PAGINATION.INITIAL_PAGE);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(DEFAULT_PAGINATION.INITIAL_PAGE);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(DEFAULT_PAGINATION.INITIAL_PAGE);
  };

  const processedData = useMemo(() => {
    const filteredUsers = filterUsers(users, filters);
    const sortedUsers = sortUsers(filteredUsers, sortKey, sortOrder);

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = sortedUsers.slice(
      startIndex,
      startIndex + itemsPerPage,
    );

    return {
      filteredUsers,
      paginatedUsers,
      totalPages,
      totalFiltered: filteredUsers.length,
    };
  }, [users, filters, sortKey, sortOrder, currentPage, itemsPerPage]);

  return {
    // State
    sortKey,
    sortOrder,
    currentPage,
    itemsPerPage,
    filters,

    // Handlers
    handleSort,
    handleFiltersChange,
    handleClearFilters,
    handlePageChange,
    handleItemsPerPageChange,

    // Processed data
    ...processedData,
  };
}
