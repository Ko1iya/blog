import { useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './App.module.scss';
import { useGetUserQuery } from '@/store/reducers/blogApi';
import { logout } from '@/store/reducers/authSlice';
import { useAppDispatch } from '@/hooks/redux';

function App() {
  const { data, status } = useGetUserQuery();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!data && status === 'fulfilled') {
      localStorage.clear();
      dispatch(logout());
    }
  }, [data]);

  return (
    <div className={styles.app}>
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default App;
