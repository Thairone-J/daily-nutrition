'use client';

import AuthForm from '@/components/AuthForm/AuthForm';
import styles from './page.module.scss';

export default function LoginPage() {
  const handleRegister = () => {
    alert();
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <AuthForm mode="register" onSubmit={handleRegister} />
      </div>
    </div>
  );
}
