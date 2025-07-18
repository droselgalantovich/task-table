import styles from './Pagination.module.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.itemsPerPageSection}>
        <span>Show per page:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className={styles.itemsSelect}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
        <span>records</span>
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationButtons}>
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            &laquo;
          </button>

          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            &lsaquo;
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.pageButtonActive : ''
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            &rsaquo;
          </button>

          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            &raquo;
          </button>
        </div>
      )}

      <div className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};
