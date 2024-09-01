'use client';

import { Button } from '@radix-ui/themes';
import SubjectEditForm from './SubjectForm';
import { useState, useEffect } from 'react';
import styles from './SubjectForm.module.css';
import { Subject } from '@/types/studyType';

interface SubjectSelectButtonProps {
  initialSubjects: Subject[];
}

// 스크롤 방지 함수
const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

// 스크롤 복원 함수
const enableScroll = () => {
  document.body.style.overflow = '';
};

const SubjectSelectButton = ({ initialSubjects }: SubjectSelectButtonProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    showForm ? disableScroll() : enableScroll();

    return () => {
      enableScroll();
    };
  }, [showForm]);

  const closeSubjectEditForm = () => {
    setShowForm(false);
  };
  return (
    <>
      <Button className={styles.floatingButton} onClick={handleButtonClick}>
        과목 선택
      </Button>

      {showForm && <div className={styles.overlay} onClick={closeSubjectEditForm}></div>}
      <div className={`${styles.formContainer} ${showForm ? styles.show : styles.hide}`}>
        <SubjectEditForm closeSubjectEditForm={closeSubjectEditForm} />
      </div>
    </>
  );
};

export default SubjectSelectButton;
