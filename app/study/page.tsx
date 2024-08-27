import Timer from '@/components/study/Timer';
import { Container } from '@radix-ui/themes';
import styles from './page.module.css';
import SubjectSelectButton from '@/components/study/SubjectSelectButton';
import { getTimer, postTimer } from '@/api/studyApi';
import { getCurrentDate } from '@/utils/formatTimeUtils';
import { Subject } from '@/types/studyType';

export default async function Study() {
  const timerResponse = await getTimer();

  const saveTimer = async (time: number, subjects: Subject[]) => {
    'use server';
    const date = getCurrentDate();
    const subjectIds = subjects.map((subject) => subject.id);
    const response = await postTimer({ date, time, subjects: subjectIds });

    return response;
  };

  return (
    <Container size="3" className={styles.container} height="100%">
      <Timer maxTime={10800} currentTime={timerResponse.time} onSave={saveTimer} />

      <SubjectSelectButton initialSubjects={timerResponse.subjects} />
    </Container>
  );
}
