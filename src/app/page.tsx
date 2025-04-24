'use client';

import '@/i18n';

import Link from 'next/link';
import styles from './page.module.scss';
import Button from '@/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className={styles['welcome-container']}>
          <img src="./logo.png" alt="" />
          <div className={styles['text-content']}>
            <h1>Daily nutrition</h1>
            <h2>{t('welcomePage.description')}</h2>
          </div>

          <div className={styles['start-links']}>
            <Link href='/dashboard' className={styles.buttonLink}>
              <Button fontSize="medium" variant="primary">
                {t('welcomePage.button')}
              </Button>
            </Link>
            <Link href="" className={styles.link}>
              {t('welcomePage.link')} ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
