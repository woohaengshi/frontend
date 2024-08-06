'use client';

import { useState } from 'react';
// import SubjectEditForm from '../../components/study/SubjectEditForm.tsx';
// import stylesEdit from '../../components/study/SubjectEditForm.module.css'; // CSS 파일 임포트
import Timer from '@/components/study/Timer';
import { Button, Container, Text } from '@radix-ui/themes';
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
    <Container size="3" className={`${styles.container}`} height="100%">
      <Timer maxTime={3600} />
      <Button className={styles.floatingButton} onClick={handleButtonClick}>
        과목 선택
      </Button>

      {/* 오버레이 추가 */}
      {/* {showForm && <div className={stylesEdit.overlay} onClick={closeSubjectEditForm}></div>}
      <div className={`${stylesEdit.formContainer} ${showForm ? stylesEdit.show : ''}`}>
        <SubjectEditForm closeSubjectEditForm={closeSubjectEditForm} />
      </div> */}
    </Container>
  );
}
