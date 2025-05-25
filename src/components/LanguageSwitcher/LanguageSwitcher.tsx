'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import styles from './LanguageSwitcher.module.scss';
import { useParams } from 'next/navigation';

import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [, startTransition] = useTransition();

  const changeLang = (lang: 'en' | 'pt') => {
    startTransition(() => {
      router.replace({ pathname, params }, { locale: lang });
    });
  };

  return (
    <div className={styles.langSwitchWrapper}>
      <button onClick={() => changeLang('pt')} aria-label="Mudar para português">
        🇧🇷
      </button>
      <button onClick={() => changeLang('en')} aria-label="Switch to English">
        🇺🇸
      </button>
    </div>
  );
}
