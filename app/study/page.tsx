'use client';

import { useState } from 'react';
import SubjectEditForm from '../../components/common/SubjectEditForm.tsx';
import styles from '../../components/common/SubjectEditForm.module.css'; // CSS 파일 임포트

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
    <div className={styles.container}>
      <div>
        <div>
          <button onClick={handleButtonClick}>과목 선택</button>
        </div>
      </div>
      <div className={`${styles.formContainer} ${showForm ? styles.show : ''}`}>
        <SubjectEditForm closeSubjectEditForm={closeSubjectEditForm} />
      </div>
    </div>
  );
}
