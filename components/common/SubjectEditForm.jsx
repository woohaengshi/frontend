import React, { useState } from 'react';
import styles from './SubjectEditForm.module.css';
import { Text } from '@radix-ui/themes';

const initialSubjects = ['html', 'css', 'javascript', 'git', 'spring'];

export default function SubjectEditForm({ closeSubjectEditForm }) {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  const handleClick = (subject) => {
    setSelectedSubject(subject);
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");
    }
  };

  const handleSave = () => {
    // 편집 모드를 종료하고 저장
    setIsEditing(false);
    // 저장된 상태를 유지하는 추가 로직이 필요하면 여기에 작성
    console.log('저장된 과목 목록:', subjects);
  };

  return (
    <div className={styles.subject_edit_form_wrap}>
      <div className={styles.subject_edit_form_close_btn}>
        <Text size="5" onClick={closeSubjectEditForm} className={styles.closeButton}>
          X
        </Text>
        <Text size="8"
          onClick={() => {
            if (window.innerWidth <= 768) {
              // 모바일 화면 체크
              closeSubjectEditForm();
            }
          }}
          className={styles.backButton}
        >
          ←
        </Text>
      </div>
      <div className={styles.subject_edit_form_wrap_inner}>
        <div className={styles.subject_choice_text_wrap}>
          <Text size="5" className={styles.test}>
            {isEditing ? "과목 편집" : "과목 선택"}
          </Text>
        </div>
        {isEditing && (
          <div className={styles.subject_add_box}>
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className={styles.subject_input}
            />
            <button onClick={handleAddSubject} className={styles.add_button}>+</button>
          </div>
        )}
        <div className={styles.subject_choice_box}>
          {subjects.map((subject, index) => (
            <Text
              size="3"
              key={index}
              className={`${styles.subject_item} ${selectedSubject === subject ? styles.selected : ''}`}
              onClick={() => handleClick(subject)}
            >
              {subject}
            </Text>
          ))}
        </div>
        <div className={styles.subject_edit_form_btn_wrap}>
          <button className={styles.subject_edit_form_btn_save} onClick={handleSave}>저장</button>
          {!isEditing && (
            <button className={styles.subject_edit_form_btn_modify} onClick={() => setIsEditing(true)}>
              과목편집
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
