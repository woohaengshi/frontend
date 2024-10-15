'use client';

import React from 'react';
import useSWR from 'swr';
import { Text } from '@radix-ui/themes';
import styles from './SubjectForm.module.css';
import { useSubjectStore } from '@/store/subjectStore';
import { getSubjectEditList } from '@/apis/subjectFormApi';

interface SubjectSelectProps {
  onEditClick: () => void;
  onSaveClick: () => void;
}

export default function SubjectSelectForm({ onEditClick, onSaveClick }: SubjectSelectProps) {
  const { subjects, selectedSubjects, selectSubject, setSubjects } = useSubjectStore();

  const { data, error } = useSWR('subjects', getSubjectEditList);

  // 데이터가 로드되면 상태를 업데이트
  if (data && data.subjects !== subjects) {
    setSubjects(data.subjects);
  }

  if (error) {
    console.error('과목 선택 데이터 로딩 실패:', error);
  }

  return (
    <div className={styles.subject_edit_form_wrap_inner}>
      <div className={styles.subject_edit_form_top}>
        <div className={styles.subject_choice_text_wrap}>
          <Text as="p" size="5" weight="medium" className={styles.test}>
            과목 선택
          </Text>
        </div>
        <div className={`${styles.subject_select_choice_box} ${styles.subject_choice_box}`}>
          {subjects?.map((subject) => (
            <div
              key={subject.id}
              className={`${styles.subject_item} ${selectedSubjects.some((s) => s.id === subject.id) ? styles.selected : ''}`}
              onClick={() => selectSubject(subject)}
            >
              <Text as="p" size="3" className={styles.subject_item_text}>
                {subject.name}
              </Text>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.subject_edit_form_btn_wrap}>
        {/* <button type="submit" className={} onClick={onSaveClick}>
          저장
        </button> */}
        <button className={styles.subject_edit_form_btn_save} onClick={onEditClick}>
          과목편집
        </button>
      </div>
    </div>
  );
}
