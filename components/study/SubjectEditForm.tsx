// SubjectEditForm.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Text } from '@radix-ui/themes';
import Image from 'next/image';
import closeBtn from '/assets/icons/subject_edit_close_btn.png';
import SubjectSelect from './SubjectSelect';
import SubjectEdit from './SubjectEdit';
import styles from './SubjectEditForm.module.css';

const initialSubjects: string[] = ['html', 'css', 'javascript'];

interface SubjectEditFormProps {
  closeSubjectEditForm: () => void;
}

function SubjectEditForm({ closeSubjectEditForm }: SubjectEditFormProps) {
  const [subjects, setSubjects] = useState<string[]>(initialSubjects);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deletedSubjects, setDeletedSubjects] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelectSubject = (subject: string) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.includes(subject) ? prevSelected.filter((s) => s !== subject) : [...prevSelected, subject],
    );
  };

  const handleAddSubject = (subject: string) => {
    setSubjects([...subjects, subject]);
  };

  const handleDeleteSubject = (subjectToDelete: string) => {
    setSubjects(subjects.filter((subject) => subject !== subjectToDelete));
    setSelectedSubjects((prevSelected) => prevSelected.filter((s) => s !== subjectToDelete));
    setDeletedSubjects((prevDeleted) => [...prevDeleted, subjectToDelete]);
  };

  const handleSaveSelected = async () => {
    try {
      alert(`선택한 과목이 저장되었습니다: ${selectedSubjects.join(', ')}`);
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      closeSubjectEditForm();
    }
  };

  const handleSaveEditing = async () => {
    try {
      alert(`삭제한 과목은 ${deletedSubjects.join(', ')} 입니다`);
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setDeletedSubjects([]);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.subject_edit_form_wrap}>
      <div className={styles.subject_edit_form_close_btn}>
        {!isMobile && (
          <button onClick={closeSubjectEditForm} className={styles.closeButton}>
            <Image src={closeBtn} alt="Close" width={20} height={20} />
          </button>
        )}
        <button 
          onClick={() => {
            if (isMobile) {
              closeSubjectEditForm();
            }
          }}
          className={styles.backButton}
        >
          →
        </button>
      </div>
      {isEditing ? (
        <SubjectEdit
          subjects={subjects}
          onAddSubject={handleAddSubject}
          onDeleteSubject={handleDeleteSubject}
          onSaveEditing={handleSaveEditing}
          showCancelButton={true} // 취소 버튼 활성화
          onCancelEditing={() => setIsEditing(false)} // 취소 버튼 클릭 시 편집 모드 종료
        />
      ) : (
        <SubjectSelect
          subjects={subjects}
          selectedSubjects={selectedSubjects}
          onSelectSubject={handleSelectSubject}
          onEditClick={() => setIsEditing(true)}
          onSaveClick={handleSaveSelected}
        />
      )}
    </div>
  );
}

export default SubjectEditForm;
