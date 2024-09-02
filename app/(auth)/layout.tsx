import { Box, Container, Strong } from '@radix-ui/themes';
import styles from './layout.module.css';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode & {
    props: {
      title: string;
    };
  };
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container size="2" p="6" className={styles.container}>
      <Box p="8" className={styles.inner}>
        {children}
      </Box>
    </Container>
  );
}
