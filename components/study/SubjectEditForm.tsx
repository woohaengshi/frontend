'use client';
import React, { useState } from 'react';
import { Text } from '@radix-ui/themes';
import styles from './SubjectForm.module.css';

interface SubjectEditProps {
  subjects: string[];
  onAddSubject: (subject: string) => void;
  onDeleteSubject: (subject: string) => void;
  onSaveEditing: () => void;
  showCancelButton?: boolean; // 취소 버튼 표시 여부
  onCancelEditing?: () => void; // 취소 버튼 클릭 시 호출할 함수
  style?: React.CSSProperties; // 스타일 prop 추가
  subjectChoiceBoxStyle?: React.CSSProperties; // 추가된 부분
  mypageSaveBtn?: React.CSSProperties;
}

export default function SubjectEdit({
  subjects,
  onAddSubject,
  onDeleteSubject,
  onSaveEditing,
  showCancelButton = true, // 기본값은 true
  onCancelEditing,
  style,
  subjectChoiceBoxStyle,
  mypageSaveBtn // 추가된 부분
}: SubjectEditProps) {
  const [newSubject, setNewSubject] = useState<string>('');

  const handleAddSubject = () => {
    if (newSubject.trim() !== '') {
      onAddSubject(newSubject);
      setNewSubject('');
    }
  };

  return (
    <div className={styles.subject_edit_form_wrap_inner} style={style}>
      <div className={styles.subject_edit_form_top}>
        <div className={styles.subject_choice_text_wrap}>
          <Text as="p" size="5" weight="medium" className={styles.test} >
            과목 편집
          </Text>
        </div>
        <div className={styles.subject_add_box}>
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className={styles.subject_input}
            placeholder="과목을 추가하세요."
          />
          <button onClick={handleAddSubject} className={styles.add_button}>
            +
          </button>
        </div>
        <div className={styles.subject_choice_box} style={subjectChoiceBoxStyle}>
          {subjects.map((subject, index) => (
            <div key={index} className={styles.subject_item}>
              <Text as="p" size="3" className={styles.subject_item_text}>
                {subject}
              </Text>
              <button className={styles.delete_button} onClick={() => onDeleteSubject(subject)}>
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.subject_edit_form_btn_wrap}>
        <button type="submit" className={styles.subject_edit_form_btn_save} onClick={onSaveEditing} style={mypageSaveBtn}>
          저장
        </button>
        {showCancelButton &&
          onCancelEditing && ( // 취소 버튼 조건부 렌더링
            <button className={styles.subject_edit_form_btn_modify} onClick={onCancelEditing}>
              취소
            </button>
          )}
      </div>
    </div>
  );
}
