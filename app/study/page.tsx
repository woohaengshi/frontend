'use client';

import { useState } from 'react';
import SubjectEditForm from '../../components/study/SubjectEditForm';
import stylesEdit from '../../components/study/SubjectEditForm.module.css';
import Timer from '@/components/study/Timer';
import { Container } from '@radix-ui/themes';
import styles from './page.module.css';
import SubjectSelectButton from '@/components/study/SubjectSelectButton';
import { getTimer } from '@/api/study';

export default function Study() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const closeSubjectEditForm = () => {
    setShowForm(false);
  };

  return (
    <Container size="3" className={styles.container} height="100%">
      <Timer maxTime={3600} data={timerResponse} />

      <SubjectSelectButton />
    </Container>
  );
}
