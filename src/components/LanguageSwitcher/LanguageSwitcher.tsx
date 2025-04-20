'use client';

import styles from './LanguageSwitcher.module.scss';

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lang: 'en' | 'pt') => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.langSwitchWrapper}>
      <button onClick={() => changeLang('pt')}>🇧🇷 </button>
      <button onClick={() => changeLang('en')}>🇺🇸 </button>
    </div>
  );
}
