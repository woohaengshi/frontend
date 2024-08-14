import Timer from '@/components/study/Timer';
import { Container } from '@radix-ui/themes';
import styles from './page.module.css';
import SubjectSelectButton from '@/components/study/SubjectSelectButton';
import { getTimer } from '@/api/study';

export default async function Study() {
  const timerResponse = await getTimer();

  return (
    <Container size="3" className={styles.container} height="100%">
      <Timer maxTime={3600} data={timerResponse} />

      <SubjectSelectButton />
    </Container>
  );
}
