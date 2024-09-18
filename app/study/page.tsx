import Timer from '@/components/study/Timer';
import { Container } from '@radix-ui/themes';
import styles from './page.module.css';
import SubjectSelectButton from '@/components/study/SubjectSelectButton';
import { getTimer } from '@/api/studyApi';

export default async function Study() {
  const { time, subjects } = await getTimer();

  return (
    <Container className={styles.container} height="100%">
      <Timer maxTime={10800} currentTime={time} initialSubjects={subjects} />

      <SubjectSelectButton initialSubjects={subjects} />
    </Container>
  );
}
