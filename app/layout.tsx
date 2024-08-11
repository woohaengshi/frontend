// metadata
import type { Metadata } from 'next';
// font
import { Noto_Sans_KR } from 'next/font/google';
// style
import './reset.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import styles from './layout.module.css';
// components

import MobileHeader from '@/components/common/Header/MobileHeader';
import Header from '@/components/common/Header/Header';

export const metadata: Metadata = {
  title: '우행시',
  description: '우리들의 행복한 시간',
};

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-notosanskr',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.variable}>
        <Theme radius="medium">
          <Header />
          <div className={styles.content_wrapper}>
            {children}
          </div>
          <MobileHeader></MobileHeader>
        </Theme>
      </body>
    </html>
  );
}
