import { Box, Container } from "@radix-ui/themes";
import styles from './layout.module.css';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <Container size="2" p="6">
      <Box p="8" className={styles.inner}>
        {children}
      </Box>
    </Container>
  );
}