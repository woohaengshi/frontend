'use client';

import styles from './CommonButton.module.css';
import Link from 'next/link';

interface CommonButtonProps {
  type: 'submit' | 'button' | 'link';
  href?: string;
  style: 'dark_purple' | 'light_purple' | 'dark_gray' | 'light_gray';
  children: React.ReactNode;
}

export default function CommonButton({ type, href, style, children }: CommonButtonProps) {
  return (
    <>
      {type == 'submit' ? (
        <button type="submit" className={styles[style]}>
          {children}
        </button>
      ) : type == 'button' ? (
        <button type="button" className={styles[style]}>
          {children}
        </button>
      ) : (
        <Link href={href ? href : ''} className={styles[style]}>
          {children}
        </Link>
      )}
    </>
  );
}
