import './globals.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './layout.module.scss';
import I18nProvider from '@/components/I18nProvider';
import { MealsProvider } from '@/context/MealsContext';
import { FoodsProvider } from '@/context/FoodsContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <I18nProvider />
        <div className={styles.wrapper}>
          <Header />
          <FoodsProvider>
            <MealsProvider>
              <main className={styles.main}>{children}</main>
            </MealsProvider>
          </FoodsProvider>

          <Footer />
        </div>
      </body>
    </html>
  );
}
