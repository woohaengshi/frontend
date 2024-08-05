'use client';

import { useState } from 'react';
import SubjectEditForm from '../../components/study/SubjectEditForm';
import stylesEdit from '../../components/study/SubjectEditForm.module.css'; 
import Timer from '@/components/study/Timer';
import { Button, Container, Text } from '@radix-ui/themes';
import styles from './page.module.css';

export default function Study() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const closeSubjectEditForm = () => {
    setShowForm(false);
  };

  return (
    <Container size="3" className={`${styles.container}`} height="100%">
      <Timer maxTime={10} />
      <Button className={styles.floatingButton} onClick={handleButtonClick}>
        과목 선택
      </Button>

      {showForm && <div className={stylesEdit.overlay} onClick={closeSubjectEditForm}></div>}
      <div className={`${stylesEdit.formContainer} ${showForm ? stylesEdit.show : stylesEdit.hide}`}>
        <SubjectEditForm closeSubjectEditForm={closeSubjectEditForm} />
      </div> */}
    </Container>
  );
}
