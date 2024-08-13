// SubjectSelect.tsx
'use client';
import React from 'react';
import { Text,Box } from '@radix-ui/themes';
import styles from './SubjectEditForm.module.css';
import CommonButton from '@/components/common/CommonButton';

interface SubjectSelectProps {
  subjects: string[];
  selectedSubjects: string[];
  onSelectSubject: (subject: string) => void;
  onEditClick: () => void;
  onSaveClick: () => void;
}

function SubjectSelect({ subjects, selectedSubjects, onSelectSubject, onEditClick, onSaveClick }: SubjectSelectProps) {
  return (
    <div className={styles.subject_edit_form_wrap_inner}>

      {/* 제목 + 과목 카드 */}
      <div className={styles.subject_edit_form_top}>
        <div className={styles.subject_choice_text_wrap}>
          <Text as="p" size="5" className={styles.test}>
            과목 선택
          </Text>
        </div>
        <div className={styles.subject_choice_box}>
          {subjects.map((subject, index) => (
            <div
              key={index}
              className={`${styles.subject_item} ${selectedSubjects.includes(subject) ? styles.selected : ''}`}
            >
              <Text as="p" size="3" className={styles.subject_item_text} onClick={() => onSelectSubject(subject)}>
                {subject}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      {/* <Box mt="6" className="btn_join">
              <CommonButton type="submit">회원가입</CommonButton>
            </Box> */}


      <div className={styles.subject_edit_form_btn_wrap}>

        <button  type="submit"  className={styles.subject_edit_form_btn_save} onClick={onSaveClick}>
          저장
        </button>

        <button className={styles.subject_edit_form_btn_modify} onClick={onEditClick}>
          과목편집
        </button>
      </div>
    </div>
  );
}

export default SubjectSelect;
