// src/components/Spinner/Spinner.tsx
import styles from './Spinner.module.scss';

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} />
    </div>
  );
}

export default Spinner;
