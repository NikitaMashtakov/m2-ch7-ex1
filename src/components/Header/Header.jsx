import styles from './Header.module.css';

export const Header = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Деловое приложение</h1>
    </div>
  );
};
