'use client';

import styles from './Header.module.scss';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const hideLoginOnRoutes = ['/login', '/register'];
  const shouldShowLogin = !hideLoginOnRoutes.includes(pathname);

  return (
    <header className={styles.header}>
      <a className={styles.logowrapper} href="./">
        <img src="/logo.png" alt="Logo" />
        <h1>Daily nutrition</h1>
      </a>
      {shouldShowLogin && (
        <div className={styles.nav}>
          <a href="./login">Login</a>
        </div>
      )}
    </header>
  );
}
