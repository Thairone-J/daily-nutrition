import './globals.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './layout.module.scss';
import { MealsProvider } from '@/context/MealsContext';
import { FoodsProvider } from '@/context/FoodsContext';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <div className={styles.wrapper}>
          <NextIntlClientProvider>
            <Header />
            <FoodsProvider>
              <MealsProvider>
                <main className={styles.main}>{children}</main>
              </MealsProvider>
            </FoodsProvider>
            <Footer />
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
