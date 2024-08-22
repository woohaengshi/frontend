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

  // SWR을 사용하여 과목 데이터를 가져오고 동기화 - 마이페이지 새로 고침 시 저장
  const { data, error } = useSWR('subjects', fetchSubjects, {
    onSuccess: (data) => {
      if (addedSubjects.length === 0 && deletedSubjects.length === 0) {
        setSubjects(data.subjects);
      }
    },
  });

  if (error) {
    console.error('Failed to load subjects:', error);
  }

  // 과목 편집 저장 버튼
  const handleAddSubject = () => {
    if (newSubjectName.trim() === '') {
      return; // 과목 이름이 비어있으면 아무것도 하지 않음
    }

    // 중복 체크
    const isDuplicate = subjects.some((subject) => subject.name === newSubjectName.trim());
    if (isDuplicate) {
      alert('이 과목은 이미 존재합니다.'); // 중복 경고 메시지
      return; // 중복일 경우 추가하지 않음
    }

    const newSubject = { id: Date.now(), name: newSubjectName }; // 예시로 새로운 ID 생성
    addSubject(newSubject);
    setNewSubjectName('');
  };

  const handleCancelEditing = () => {
    revertChanges(); // 취소 시 초기 상태로 되돌리기
    setEditing(false); // 편집 모드 종료
  };

  const handleSaveEditing = async () => {
    // payload 준비
    const payload = {
      addedSubjects: addedSubjects.map((subject) => subject.name), // 이름만 추출
      deletedSubjects: deletedSubjects.map((subject) => subject.id), // ID만 추출
    };

    // 추가된 과목과 삭제된 과목이 모두 비어있는 경우
    if (payload.addedSubjects.length === 0 && payload.deletedSubjects.length === 0) {
      alert('변경된 과목이 없습니다.');
      setEditing(false); // 편집 모드 종료
      return;
    }

    try {
      const response = await subjectFormApi(payload);
      if (response.success) {
        console.log('Subjects updated successfully');
        resetAddedSubjects();
        resetDeletedSubjects();
        setEditing(false);

        // 삭제된 ID와 추가된 과목명을 알림으로 표시
        alert(
          `삭제한 과목 ID는 ${deletedSubjects.map((subject) => subject.id).join(', ')} 입니다\n` +
            `추가된 과목은 ${addedSubjects.map((subject) => subject.name).join(', ')} 입니다`,
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
            <div key={subject.id} className={styles.subject_item_wrapper}>
              <div className={styles.subject_item}>
                <Text as="p" size="3" className={styles.subject_item_text}>
                  {subject.name}
                </Text>
              </div>
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
