'use client';

import styles from './CommonButton.module.css';
import Link from 'next/link';

export default function CommonButton({ type, href, style, children }) {
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
        <Link href={href} className={styles[style]}>
          {children}
        </Link>
      )}
    </>
  );
}
