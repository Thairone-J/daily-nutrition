'use client';
import Button from '../UI/Button/Button';
import { useState } from 'react';
import styles from './AuthForm.module.scss';
import Link from 'next/link';

import { useTranslation } from 'react-i18next';

type AuthMode = 'login' | 'register';

type AuthFormProps = {
  mode: AuthMode;
  onSubmit: (data: { email: string; password: string }) => void;
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{mode === 'login' ? t('authForm.login.title') : t('authForm.register.title')}</h2>

      <div className={styles.inputWrapper}>
        <input
          type="email"
          placeholder={t('authForm.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('authForm.passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link href="">{t('authForm.forgotPasswordLink')}</Link>
      </div>
      <div className={styles.buttonWrapper}>
        <Button type="submit" variant="outline" fontSize="small">
          {mode === 'login'
            ? t('authForm.login.googleButton')
            : t('authForm.register.googleButton')}
        </Button>
        <Button type="submit" variant="outline" fontSize="small">
          {mode === 'login' ? t('authForm.login.button') : t('authForm.register.button')}
        </Button>
      </div>
      <div className={styles.footer}>
        <Link href={mode === 'login' ? '/register' : '/login'}>
          {mode === 'login' ? t('authForm.footer.createAccount') : t('authForm.footer.sigin')}
        </Link>
      </div>
    </form>
  );
}
