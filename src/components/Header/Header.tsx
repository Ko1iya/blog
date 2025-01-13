import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Realworld Blog</h1>
        <div className={styles.authButtons}>
          <button type="button" className={styles.signIn}>
            Sign In
          </button>
          <button type="button" className={styles.signUp}>
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
