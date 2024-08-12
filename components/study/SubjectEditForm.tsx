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

  // useEffect(() => {
  //   // 모달이 열릴 때 body 스크롤 비활성화
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     // 컴포넌트 언마운트 시 스크롤 다시 활성화
  //     document.body.style.overflow = '';
  //   };
  // }, []);

  

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
      // 서버에 요청을 보내는 부분을 주석 처리합니다.
      // const response = await fetch('https://your-api-endpoint.com/saveSelectedSubjects', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ selectedSubjects }), // 선택한 과목을 JSON 문자열로 변환
      // });

      // if (!response.ok) {
      //   throw new Error('네트워크 응답이 이상합니다.');
      // }

      // const data = await response.json();
      // console.log('서버에서 응답:', data);

      // 저장된 과목을 알림창으로 표시
      alert(`선택한 과목이 저장되었습니다: ${selectedSubjects.join(', ')}`);
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      // 저장 후 모달 닫기
      closeSubjectEditForm();
    }
};


const handleSaveEditing = async () => {
  try {
    // 서버에 요청을 보내는 부분을 주석 처리합니다.
    // const response = await fetch('https://your-api-endpoint.com/deleteSubjects', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ deletedSubjects }), // 삭제된 과목을 JSON 문자열로 변환
    // });

    // if (!response.ok) {
    //   throw new Error('네트워크 응답이 이상합니다.');
    // }

    // const data = await response.json();
    // console.log('서버에서 응답:', data);

    // 삭제된 과목을 알림창으로 표시
    alert(`편집된 과목이 저장되었습니다: ${deletedSubjects.join(', ')}`);
  } catch (error) {
    console.error('저장 중 오류 발생:', error);
    alert('저장 중 오류가 발생했습니다.');
  } finally {
    // 삭제된 과목 리스트 초기화
    setDeletedSubjects([]);
    // 편집 모드 종료
    setIsEditing(false);
  }
};


  return (
    <div className={styles.subject_edit_form_wrap}>
      <div className={styles.subject_edit_form_close_btn}>
        {!isMobile && (
          // button으로 수정
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
          onCancelEditing={() => setIsEditing(false)}
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
