'use client';
import Link from 'next/link';
import styles from './Header.module.scss';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname.includes('/login', 0) || pathname.includes('/register', 0);

  return (
    <header className={styles.header}>
      <Link className={styles.logowrapper} href="./">
        <img src="/logo.png" alt="Logo" />
        <h1>Daily nutrition</h1>
      </Link>
      <div className={styles.nav}>
        <LanguageSwitcher />
        {isAuthPage ? null : <Link href="/login">Login</Link>}
      </div>
    </header>
  );
}
