'use client';
import Link from 'next/link';
import styles from './Header.module.scss';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

export default function Header() {
  const pathname = usePathname();

  const hideLoginOnRoutes = ['/login', '/register'];
  const shouldShowLogin = !hideLoginOnRoutes.includes(pathname);

  return (
    <header className={styles.header}>
      <Link className={styles.logowrapper} href="./">
        <img src="/logo.png" alt="Logo" />
        <h1>Daily nutrition</h1>
      </Link>
      <div className={styles.nav}>
        <LanguageSwitcher />
        {shouldShowLogin && <Link href="/login">Login</Link>}
      </div>
    </header>
  );
}
