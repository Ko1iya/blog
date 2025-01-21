import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logout } from '@/store/reducers/authSlice';

function Header() {
  const user = useAppSelector((state) => state.authSlice.user);
  const imgUrl = useAppSelector((state) => state.authSlice.image);

  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.title}>
          Realworld Blog
        </Link>
        <div className={styles.authButtons}>
          {user ? (
            <>
              <Link to="/create-article" className={styles.signUp}>
                <p>Create Article</p>
              </Link>
              <Link to="/edit-profile" className={styles.profile}>
                <p className={styles.username}>{user}</p>
                <img src={imgUrl} alt="avatar" className={styles.avatar} />
              </Link>
              <button
                type="button"
                onClick={() => dispatch(logout())}
                className={styles.signIn}
              >
                <p>Log out</p>
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className={styles.signIn}>
                <p>Sign In</p>
              </Link>

              <Link to="/sign-up" className={styles.signUp}>
                <p>Sign Up</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
