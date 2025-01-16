import { Link, useParams } from 'react-router-dom';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
}

function Pagination(props: PaginationProps) {
  const { totalPages } = props;

  const { id } = useParams();

  const arrPage = Array.from({ length: totalPages }, (_, i) => i + 1);

  const currentPage = parseInt(id, 10) || 1;

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination}>
        <Link
          to={currentPage !== 1 ? `/${currentPage - 1}` : `/${currentPage}`}
          className={styles.pageButton}
        >
          ←
        </Link>

        {arrPage.map((page) => (
          <Link
            to={`/${page}`}
            key={page}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ''
            }`}
          >
            {page}
          </Link>
        ))}

        <Link to={`/${currentPage + 1}`} className={styles.pageButton}>
          →
        </Link>
      </div>
    </div>
  );
}

export default Pagination;
