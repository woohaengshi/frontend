'use client';

import styles from './SmallButton.module.css';

export default function SmallButton({ children }: { children: React.ReactNode }) {
  return <button className={styles.btn_small}>{children}</button>;
}
