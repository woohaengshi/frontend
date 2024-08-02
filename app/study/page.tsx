'use client';

import { useState } from 'react';
import SubjectEditForm from '../../components/common/SubjectEditForm.tsx';
import stylesEdit from '../../components/common/SubjectEditForm.module.css'; // CSS 파일 임포트
import Timer from '@/components/study/Timer';
import {  Button, Container, Text } from '@radix-ui/themes';
import styles from './page.module.css';

export default function Study() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  // 모달 닫기 함수
  const closeSubjectEditForm = () => {
    setShowForm(false);
  };

  return (
    <Container size="3" className={`${styles.container} ${stylesEdit.container}`} height="100%">
      <Text as="p" className={styles.text} size={'5'} weight={'medium'} align={'center'}>
        다음 레벨업까지
        <br />
        02:59:47
      </Text>
      <Timer maxTime={10} />
      <Button className={styles.floatingButton} onClick={handleButtonClick}>과목 선택</Button>
      <div className={`${stylesEdit.formContainer} ${showForm ? stylesEdit.show : ''}`}>
        <SubjectEditForm closeSubjectEditForm={closeSubjectEditForm} />
      </div>
    </Container>
  );
}
