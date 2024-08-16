// SubjectEdit.tsx
'use client';
import React, { useState } from 'react';
import { Text } from '@radix-ui/themes';
import styles from './SubjectForm.module.css';
import { useSubjectStore } from '@/store/subjectStore';

interface SubjectEditProps {
  showCancelButton?: boolean;
  onCancelEditing?: () => void;
  style?: React.CSSProperties;
  subjectChoiceBoxStyle?: React.CSSProperties;
  onSaveEditing: () => void; // 수정된 부분
}

function SubjectEdit({ showCancelButton = true, onCancelEditing, style, subjectChoiceBoxStyle,   onSaveEditing, }: SubjectEditProps) {
  const [newSubject, setNewSubject] = useState<string>('');
  const { subjects, addSubject, deleteSubject, saveEditing } = useSubjectStore();

  const handleAddSubject = () => {
    if (newSubject.trim() !== '') {
      addSubject(newSubject);
      setNewSubject('');
    }
  };

  return (
    <div className={styles.subject_edit_form_wrap_inner} style={style}>
      <div className={styles.subject_edit_form_top}>
        <div className={styles.subject_choice_text_wrap}>
          <Text as="p" size="5" weight="medium" className={styles.test}>
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
              <button className={styles.delete_button} onClick={() => deleteSubject(subject)}>
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.subject_edit_form_btn_wrap}>
        <button type="submit" className={styles.subject_edit_form_btn_save} onClick={saveEditing}>
          저장
        </button>
        {showCancelButton && onCancelEditing && (
          <button className={styles.subject_edit_form_btn_modify} onClick={onCancelEditing}>
            취소
          </button>
        )}
      </div>
    </div>
  );
}

export default SubjectEdit;
