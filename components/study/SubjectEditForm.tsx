import React, { useState,useEffect } from 'react';
import styles from './SubjectEditForm.module.css';
import { Text } from '@radix-ui/themes';
import Image from 'next/image';
import closeBtn from '/assets/icons/subject_edit_close_btn.png';

const initialSubjects: string[] = ['html', 'css', 'javascript'];

interface SubjectEditFormProps {
  closeSubjectEditForm: () => void;
}

const SubjectEditForm: React.FC<SubjectEditFormProps> = ({ closeSubjectEditForm }) => {
  const [subjects, setSubjects] = useState<string[]>(initialSubjects);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newSubject, setNewSubject] = useState<string>('');
  const [deletedSubjects, setDeletedSubjects] = useState<string[]>([]); // 삭제된 과목 저장
  console.log('삭제한 과목',deletedSubjects);
  console.log('선택한 과목', selectedSubjects);
  

  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 비활성화
    document.body.style.overflow = 'hidden';
    return () => {
      // 컴포넌트 언마운트 시 스크롤 다시 활성화
      document.body.style.overflow = '';
    };
  }, []);



  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize(); // 초기 화면 크기 설정
    window.addEventListener('resize', handleResize); // 리사이즈 이벤트 리스너 추가
    return () => {
      window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, []);
  
  
  
  const handleClick = (subject: string) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.includes(subject) ? prevSelected.filter((s) => s !== subject) : [...prevSelected, subject],
    );
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== '') {
      setSubjects([...subjects, newSubject]);
      setNewSubject('');
    }
  };

  const handleSaveSelected = async () => {
    alert(`선택한 과목이 저장되었습니다: ${selectedSubjects.join(', ')}`);
    // try {
    //   const response = await fetch('https://your-api-endpoint.com/saveSelectedSubjects', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ selectedSubjects }), // 선택한 과목을 JSON 문자열로 변환
    //   });

    //   if (!response.ok) {
    //     throw new Error('네트워크 응답이 이상합니다.');
    //   }

    //   const data = await response.json();
    //   console.log('서버에서 응답:', data);
    //   alert(`선택한 과목이 저장되었습니다: ${selectedSubjects.join(', ')}`);
    //   closeSubjectEditForm(); // 저장 후 폼 닫기
    // } catch (error) {
    //   console.error('저장 중 오류 발생:', error);
    //   alert('저장 중 오류가 발생했습니다.');
    // }
    closeSubjectEditForm(); // 저장 후 폼 닫기
  };

  const handleSaveEditing = async () => {
    setIsEditing(false);

    // 삭제된 과목을 서버에 저장하는 부분
    // try {
    //   const response = await fetch('https://your-api-endpoint.com/deleteSubjects', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ deletedSubjects }), // 삭제된 과목을 JSON 문자열로 변환
    //   });

    //   if (!response.ok) {
    //     throw new Error('네트워크 응답이 이상합니다.');
    //   }

    //   const data = await response.json();
    //   console.log('서버에서 응답:', data);
    //   alert("과목 편집이 완료되었습니다.");
    //   setDeletedSubjects([]); // 삭제된 과목 리스트 초기화
    // } catch (error) {
    //   console.error('저장 중 오류 발생:', error);
    //   alert("저장 중 오류가 발생했습니다.");
    // }
  };

  const handleDeleteSubject = (subjectToDelete: string) => {
    if (isEditing) {
      setSubjects(subjects.filter((subject) => subject !== subjectToDelete));
      setSelectedSubjects((prevSelected) => prevSelected.filter((s) => s !== subjectToDelete));
      setDeletedSubjects((prevDeleted) => [...prevDeleted, subjectToDelete]); // 삭제된 과목 추가
    }
  };

  return (
    <div className={styles.subject_edit_form_wrap}>
      <div className={styles.subject_edit_form_close_btn}>
        {!isMobile && (
          <Text as="p" size="5" onClick={closeSubjectEditForm} className={styles.closeButton}>
            <Image src={closeBtn} alt="Close" width={20} height={20} />
          </Text>
        )}
        <Text
          as="p"
          size="8"
          onClick={() => {
            if (isMobile) {
              closeSubjectEditForm();
            }
          }}
          className={styles.backButton}
        >
          →
        </Text>
      </div>

      <div className={styles.subject_edit_form_wrap_inner}>
        <div className={styles.subject_choice_text_wrap}>
          <Text as="p" size="5" className={styles.test}>
            {isEditing ? '과목 편집' : '과목 선택'}
          </Text>
        </div>
        {isEditing && (
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
        )}
        <div className={styles.subject_choice_box}>
          {subjects.map((subject, index) => (
            <div
              key={index}
              className={`${styles.subject_item} ${selectedSubjects.includes(subject) ? styles.selected : ''}`}
            >
              <Text as="p" size="3" className={styles.subject_item_text} onClick={() => handleClick(subject)}>
                {subject}
              </Text>
              {isEditing && (
                <button className={styles.delete_button} onClick={() => handleDeleteSubject(subject)}>
                  -
                </button>
              )}
            </div>
          ))}
        </div>
        <div className={styles.subject_edit_form_btn_wrap}>
          {isEditing ? (
            <>
              <button className={styles.subject_edit_form_btn_save} onClick={handleSaveEditing}>
                저장
              </button>
            </>
          ) : (
            <>
              <button className={styles.subject_edit_form_btn_save} onClick={handleSaveSelected}>
                저장
              </button>
              <button className={styles.subject_edit_form_btn_modify} onClick={() => setIsEditing(true)}>
                과목편집
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectEditForm;
