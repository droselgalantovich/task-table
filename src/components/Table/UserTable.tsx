import {useState} from 'react';
import {useUsers} from '../../hooks/useUsers';
import {useTableState} from '../../hooks/useTableState';
import {LoadingState} from '../LoadingState/LoadingState';
import {TableHeader} from './TableHeader';
import {TableRow} from './TableRow';
import {UserModal} from '../Modal/UserModal';
import {Filters} from '../Filters/Filters';
import {Pagination} from '../Pagination/Pagination';
import type {User} from '../../types/user';
import styles from './UserTable.module.css';

export const UserTable: React.FC = () => {
  const {users, loading, error} = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const {
    sortKey,
    sortOrder,
    currentPage,
    itemsPerPage,
    filters,
    handleSort,
    handleFiltersChange,
    handleClearFilters,
    handlePageChange,
    handleItemsPerPageChange,
    paginatedUsers,
    totalPages,
    totalFiltered,
  } = useTableState(users);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <LoadingState loading={loading} error={error}>
      <Filters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      <div className={styles.statsText}>
        Found records: {totalFiltered} of {users.length}
      </div>

      <table className={styles.table}>
        <TableHeader
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
        <tbody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id} user={user} onClick={handleRowClick} />
          ))}
        </tbody>
      </table>

      {totalFiltered === 0 && (
        <div className={styles.noResults}>No users found</div>
      )}

      {totalFiltered > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}

      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </LoadingState>
  );
};
