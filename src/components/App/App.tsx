import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default App;
