'use client';
import React, { useState } from 'react';
import { Text } from '@radix-ui/themes';
import styles from './SubjectForm.module.css';

interface Subject {
  id: number;
  name: string;
}

interface SubjectEditProps {
  subjects: Subject[]; // 타입을 Subject[]로 수정
  onAddSubject: (subject: Subject) => void; // 수정된 타입에 맞게 수정
  onDeleteSubject: (subjectId: number) => void; // 수정된 타입에 맞게 수정
  onSaveEditing: () => void; // 과목 편집 저장
  showCancelButton?: boolean; // 취소 버튼
  onCancelEditing?: () => void;
  style?: React.CSSProperties; // 마이페이지 과목 편집 css
  subjectChoiceBoxStyle?: React.CSSProperties; // 마이페이지 과목 편집 css
  saveButtonStyle?: React.CSSProperties; // 마이페이지 과목 편집 css
}

export default function SubjectEdit({
  subjects,
  onAddSubject,
  onDeleteSubject,
  onSaveEditing,
  showCancelButton = true,
  onCancelEditing,
  style,
  subjectChoiceBoxStyle,
  saveButtonStyle
}: SubjectEditProps) {
  const [newSubjectName, setNewSubjectName] = useState<string>('');

  const handleAddSubject = () => {
    if (newSubjectName.trim() !== '') {
      const newSubject = { id: Date.now(), name: newSubjectName }; // 예시로 새로운 ID 생성
      onAddSubject(newSubject);
      setNewSubjectName('');
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
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            className={styles.subject_input}
            placeholder="과목을 추가하세요."
          />
          <button onClick={handleAddSubject} className={styles.add_button}>
            +
          </button>
        </div>
        <div className={styles.subject_choice_box} style={subjectChoiceBoxStyle}>
          {subjects.map((subject) => (
            <div key={subject.id} className={styles.subject_item}>
              <Text as="p" size="3" className={styles.subject_item_text}>
                {subject.name} {/* subject.name으로 렌더링 */}
              </Text>
              <button className={styles.delete_button} onClick={() => onDeleteSubject(subject.id)}>
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.subject_edit_form_btn_wrap}>
        <button type="submit" className={styles.subject_edit_form_btn_save} onClick={onSaveEditing} style={saveButtonStyle}>
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
