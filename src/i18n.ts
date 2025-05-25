import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['pt', 'en'];

export default getRequestConfig(async ({ locale }) => {
  if (typeof locale !== 'string' || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
