import { useNavigate, useParams } from 'react-router-dom';
import { Pagination as PagAnt } from 'antd';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
}

function Pagination(props: PaginationProps) {
  const { totalPages } = props;

  console.log(totalPages);

  const { id } = useParams();

  const navigate = useNavigate();

  const onChange = (page: number) => {
    navigate(`/${page}`);
  };

  const currentPage = parseInt(id, 10) || 1;

  return (
    <div className={styles.pagination}>
      <PagAnt
        current={currentPage}
        onChange={onChange}
        total={totalPages}
        showSizeChanger={false}
      ></PagAnt>
    </div>
  );
}

export default Pagination;
