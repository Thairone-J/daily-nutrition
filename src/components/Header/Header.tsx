import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Daily Nutrition</h1>
      <div className={styles.nav}>
        <a>Sobre</a>
        <a>Login</a>
      </div>
    </header>
  );
}
