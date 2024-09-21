// metadata
import type { Metadata } from 'next';
// font
import { Noto_Sans_KR } from 'next/font/google';
// style
import './reset.css';
import './common.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import styles from './layout.module.css';
// components

import MobileHeader from '@/components/common/Header/MobileHeader';
import Header from '@/components/common/Header/Header';
import Modal from '@/components/common/Modal/Modal';
import LanchBody from '@/components/common/Modal/LanchBody';

import { Analytics } from '@vercel/analytics/react';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: '우행시',
  description: '우리들의 행복한 시간',
  icons: {
    icon: '/timeout.png',
  },
};

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-notosanskr',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <html lang="ko">
        <body className={notoSansKr.variable}>
          <Theme radius="medium">
            <Header />
            <div className={styles.content_wrapper}>{children}</div>
            <MobileHeader></MobileHeader>
            <Modal>
              <LanchBody />
            </Modal>
          </Theme>
          <Analytics />
        </body>
      </html>
    </SessionProvider>
  );
}
