import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Realworld Blog</h1>
        <div className={styles.authButtons}>
          <Link to="/sign-in" className={styles.signIn}>
            <p>Sign In</p>
          </Link>

          <Link to="/sign-up" className={styles.signUp}>
            <p>Sign Up</p>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
