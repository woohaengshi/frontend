'use client';
import React, { useState, useEffect } from 'react';
import { Text } from '@radix-ui/themes';
import styles from './SubjectForm.module.css';
import { useSubjectStore } from '@/store/subjectStore';
import { subjectFormApi } from '@/api/subjectFormApi'; // API 함수 임포트
import { fetchSubjects } from '@/api/subjectFormApi';
import useSWR from 'swr';

export default function SubjectEditForm({
  onSaveEditing,
  showCancelButton = true,
  style,
  subjectChoiceBoxStyle,
  saveButtonStyle,
}: {
  onSaveEditing: () => void;
  showCancelButton?: boolean;
  style?: React.CSSProperties;
  subjectChoiceBoxStyle?: React.CSSProperties;
  saveButtonStyle?: React.CSSProperties;
  mypageSaveBtn?: React.CSSProperties;
}) {
  const [newSubjectName, setNewSubjectName] = useState<string>('');

  const {
    subjects,
    addSubject,
    deleteSubject,
    revertChanges,
    setEditing,
    resetAddedSubjects,
    resetDeletedSubjects,
    addedSubjects,
    deletedSubjects,
    setSubjects,
  } = useSubjectStore();

  // SWR을 사용하여 과목 데이터를 가져오고 동기화
  const { data, error } = useSWR('subjects', fetchSubjects, {
    onSuccess: (data) => {
      setSubjects(data.subjects);
    },
  });

  if (error) {
    console.error('Failed to load subjects:', error);
  }

  const handleAddSubject = () => {
    if (newSubjectName.trim() !== '') {
      const newSubject = { id: Date.now(), name: newSubjectName }; // 예시로 새로운 ID 생성
      addSubject(newSubject);
      setNewSubjectName('');
    }
  };

  const handleCancelEditing = () => {
    revertChanges(); // 취소 시 초기 상태로 되돌리기
    setEditing(false); // 편집 모드 종료
  };

  const handleSaveEditing = async () => {
    const payload = {
      addedSubjects: addedSubjects,
      deletedSubjects: deletedSubjects,
    };

    try {
      const response = await subjectFormApi(payload);
      if (response.success) {
        console.log('Subjects updated successfully');
        resetAddedSubjects();
        resetDeletedSubjects();
        setEditing(false);

        // 삭제된 ID와 추가된 과목명을 알림으로 표시
        alert(
          `삭제한 과목 ID는 ${deletedSubjects.join(', ')} 입니다\n` +
            `추가된 과목은 ${addedSubjects.join(', ')} 입니다`,
        );

        // 부모 컴포넌트에 저장 완료를 알림
        onSaveEditing();
      } else {
        console.error('Failed to update subjects:', response.message);
        alert(`업데이트 실패: ${response.message}`); // 오류 메시지를 사용자에게 표시
      }
    } catch (error) {
      console.error('Error sending request:', error);
      alert('요청을 처리하는 중 오류가 발생했습니다.'); // 오류 처리
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
          {subjects?.map((subject) => (
            <div key={subject.id} className={styles.subject_item}>
              <Text as="p" size="3" className={styles.subject_item_text}>
                {subject.name}
              </Text>
              <button className={styles.delete_button} onClick={() => deleteSubject(subject.id)}>
                -
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.subject_edit_form_btn_wrap}>
        <button
          type="submit"
          className={styles.subject_edit_form_btn_save}
          onClick={handleSaveEditing}
          style={saveButtonStyle}
        >
          저장
        </button>
        {showCancelButton && (
          <button className={styles.subject_edit_form_btn_modify} onClick={handleCancelEditing}>
            취소
          </button>
        )}
      </div>
    </div>
  );
}
