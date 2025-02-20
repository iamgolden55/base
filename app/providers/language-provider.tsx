'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/navigation';

export function LanguageProvider({
  children,
  locale,
  messages
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
} 