'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';
import styles from './SubjectForm.module.css';
import { useSubjectStore } from '@/store/subjectStore';

interface SubjectSelectProps {
  onEditClick: () => void;
  onSaveClick: () => void;
}

export default function SubjectSelectForm({ onEditClick, onSaveClick }: SubjectSelectProps) {
  const { subjects, selectedSubjects, selectSubject } = useSubjectStore();

  return (
    <div className={styles.subject_edit_form_wrap_inner}>
      <div className={styles.subject_edit_form_top}>
        <div className={styles.subject_choice_text_wrap}>
          <Text as="p" size="5" weight="medium" className={styles.test}>
            과목 선택
          </Text>
        </div>
        <div className={styles.subject_choice_box}>
          {subjects?.map((subject) => (
            <div
              key={subject.id}
              className={`${styles.subject_item} ${selectedSubjects.includes(subject.name) ? styles.selected : ''}`}
              onClick={() => selectSubject(subject.name)}
            >
              <Text as="p" size="3" className={styles.subject_item_text}>
                {subject.name}
              </Text>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.subject_edit_form_btn_wrap}>
        <button type="submit" className={styles.subject_edit_form_btn_save} onClick={onSaveClick}>
          저장
        </button>
        <button className={styles.subject_edit_form_btn_modify} onClick={onEditClick}>
          과목편집
        </button>
      </div>
    </div>
  );
}
