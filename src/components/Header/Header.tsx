import Link from 'next/link';
import styles from './Header.module.scss';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import SignInOutButton from './SignInOutButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className={styles.header}>
      <Link className={styles.logowrapper} href="./">
        <img src="/logo.png" alt="Logo" />
        <h1>Daily nutrition</h1>
      </Link>
      <div className={styles.nav}>
        <LanguageSwitcher />

        <SignInOutButton session={session} />
      </div>
    </header>
  );
}
