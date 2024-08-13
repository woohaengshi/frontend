// SubjectEdit.tsx
'use client';
import React, { useState } from 'react';
import { Text } from '@radix-ui/themes';
import styles from './SubjectEditForm.module.css';
import CommonButton from '@/components/common/CommonButton';

interface SubjectEditProps {
  subjects: string[];
  onAddSubject: (subject: string) => void;
  onDeleteSubject: (subject: string) => void;
  onSaveEditing: () => void;
  onCancelEditing: () => void;
}

function SubjectEdit({ subjects, onAddSubject, onDeleteSubject, onSaveEditing, onCancelEditing }: SubjectEditProps) {
  const [newSubject, setNewSubject] = useState<string>('');

  const handleAddSubject = () => {
    if (newSubject.trim() !== '') {
      onAddSubject(newSubject);
      setNewSubject('');
    }
  };

  return (
    <div className={styles.subject_edit_form_wrap_inner}>

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
          <div className={styles.subject_choice_box}>
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

        {/* <Box mt="6" className="btn_join">
              <CommonButton type="submit" style="dark_purple">
                회원가입
              </CommonButton>
            </Box> */}
        <div className={styles.subject_edit_form_btn_wrap}>
          <button type="submit" className={styles.subject_edit_form_btn_save} onClick={onSaveEditing}>
            저장
          </button>
          <button className={styles.subject_edit_form_btn_modify} onClick={onCancelEditing}>
            취소
          </button>
        </div>

    </div>
  );
}

export default SubjectEdit;
