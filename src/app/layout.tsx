import './globals.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './layout.module.scss';
import I18nProvider from '@/components/I18nProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <I18nProvider />
        <div className={styles.wrapper}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
