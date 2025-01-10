import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import Spinner from '../Spinner/Spinner';
import styles from './main.module.scss';
import selectCount from '@/store/selectors';
import { increment } from '@/store/reducers/countReducer';

// interface MainProps {}

function Main() {
  const dispatch = useAppDispatch();

  const { count } = useAppSelector(selectCount);

  return (
    <div className={styles.main}>
      <Spinner />
      <p>{count}</p>
      <button type="button" onClick={() => dispatch(increment())}>
        increment
      </button>
    </div>
  );
}

export default Main;
