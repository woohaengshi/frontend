import React, { useState } from 'react';
import styles from './SubjectEditForm.module.css';
import { Text } from '@radix-ui/themes';
import Image from 'next/image';
import closeBtn from "/assets/icons/subject_edit_close_btn.png";

const initialSubjects: string[] = [];

interface SubjectEditFormProps {
  closeSubjectEditForm: () => void;
}

const SubjectEditForm: React.FC<SubjectEditFormProps> = ({ closeSubjectEditForm }) => {
  const [subjects, setSubjects] = useState<string[]>(initialSubjects);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]); // 여러 개 선택하기
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newSubject, setNewSubject] = useState<string>("");

  const handleClick = (subject: string) => {
    setSelectedSubjects(prevSelected => 
      prevSelected.includes(subject) 
        ? prevSelected.filter(s => s !== subject) // 이미 선택된 과목이면 제거
        : [...prevSelected, subject] // 선택되지 않은 과목이면 추가
    );
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");
    }
  };


 const handleSave = async () => {
    setIsEditing(false);
    
    // 선택된 과목을 서버에 저장하는 부분
    // try {
    //   const response = await fetch('https://your-api-endpoint.com/saveSubjects', {
    //     method: 'POST', // POST 요청
    //     headers: {
    //       'Content-Type': 'application/json', // JSON 형식의 데이터 전송
    //     },
    //     body: JSON.stringify({ subjects: selectedSubjects }), // 선택된 과목을 JSON 문자열로 변환
    //   });

    //   if (!response.ok) {
    //     throw new Error('네트워크 응답이 이상합니다.');
    //   }

    //   const data = await response.json();
    //   console.log('서버에서 응답:', data);
    // } catch (error) {
    //   console.error('저장 중 오류 발생:', error);
    // }
  };

  const handleDeleteSubject = (subjectToDelete: string) => {
    if (isEditing) {
      setSubjects(subjects.filter(subject => subject !== subjectToDelete));
      setSelectedSubjects(prevSelected => prevSelected.filter(s => s !== subjectToDelete)); // 삭제 시 선택된 과목에서도 제거
    }
  };

  return (
    <div className={styles.subject_edit_form_wrap}>
      <div className={styles.subject_edit_form_close_btn}>
        <Text as="p" size="5" onClick={closeSubjectEditForm} className={styles.closeButton}>
          <Image src={closeBtn} alt="Close" width={20} height={20} />
        </Text>
        <Text as="p" size="8" onClick={() => {
          if (window.innerWidth <= 768) {
            closeSubjectEditForm();
          }
        }} className={styles.backButton}>
          ←
        </Text>
      </div>
      <div className={styles.subject_edit_form_wrap_inner}>
        <div className={styles.subject_choice_text_wrap}>
          <Text as="p" size="5" className={styles.test}>
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
              placeholder='과목을 추가하세요.'
            />
            <button onClick={handleAddSubject} className={styles.add_button}>+</button>
          </div>
        )}
        <div className={styles.subject_choice_box}>
          {subjects.map((subject, index) => (
            <div key={index} className={`${styles.subject_item} ${selectedSubjects.includes(subject) ? styles.selected : ''}`}>
              <Text
                as="p"
                size="3"
                className={styles.subject_item_text}
                onClick={() => handleClick(subject)}
              >
                {subject}
              </Text>
              {isEditing && (
                <button
                  className={styles.delete_button}
                  onClick={() => handleDeleteSubject(subject)}
                >
                  -
                </button>
              )}
            </div>
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

export default SubjectEditForm;
