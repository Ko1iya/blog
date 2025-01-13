import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination(props: PaginationProps) {
  const { currentPage, totalPages, onPageChange } = props;
  return (
    <div className={styles.pagination}>
      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.pageButton}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            type="button"
            key={page}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ''
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className={styles.pageButton}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Pagination;
