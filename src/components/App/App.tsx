import Header from '../Header/Header';
import Main from '../Main/Main';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;
