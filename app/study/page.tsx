import Timer from '@/components/study/Timer';
import { Box, Button, Container, Text } from '@radix-ui/themes';
import styles from './page.module.css';

export default function Study() {
  return (
    <Container size="3" className={styles.container} height="100%">
      <Text as="p" className={styles.text} size={'5'} weight={'medium'} align={'center'}>
        다음 레벨업까지
        <br />
        02:59:47
      </Text>
      <Timer maxTime={10} />
      <Button className={styles.floatingButton}></Button>
    </Container>
  );
}
