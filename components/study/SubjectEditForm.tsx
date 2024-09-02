'use client';
import React, { useState } from 'react';
import { Text } from '@radix-ui/themes';
import styles from './SubjectForm.module.css';
import { useSubjectStore } from '@/store/subjectStore';
import { postSubjectItem } from '@/api/subjectFormApi';
import { getSubjectEditList } from '@/api/subjectFormApi';
import useSWR from 'swr';

export default function SubjectEditForm({
  onSaveEditing,
  showCancelButton = true,
  style,
  subjectChoiceBoxStyle,
  mypageSaveBtn,
}: {
  onSaveEditing: () => void;
  showCancelButton?: boolean;
  style?: React.CSSProperties;
  subjectChoiceBoxStyle?: React.CSSProperties;
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
  const { data, error } = useSWR('subjects', getSubjectEditList, {
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
      return;
    }

    // 중복 체크
    const isDuplicate = subjects.some((subject) => subject.name === newSubjectName.trim());
    if (isDuplicate) {
      alert(`${newSubjectName.trim()}은 이미 존재합니다.`);
      return;
    }

    const newSubject = { id: Date.now(), name: newSubjectName }; // 예시로 새로운 ID 생성
    addSubject(newSubject);
    setNewSubjectName('');
  };

  const handleCancelEditing = () => {
    debugger;
    revertChanges();
    setEditing(false);
  };

  const handleSaveEditing = async () => {
    const payload = {
      addedSubjects: addedSubjects.map((subject) => subject.name), // 이름만 추출
      deletedSubjects: deletedSubjects.map((subject) => subject.id), // ID만 추출
    };

    // 추가된 과목과 삭제된 과목이 모두 비어있는 경우
    if (payload.addedSubjects.length === 0 && payload.deletedSubjects.length === 0) {
      alert('변경된 과목이 없습니다.');
      setEditing(false);
      return;
    }

    const response = await postSubjectItem(payload);
    if (response.success) {
      resetAddedSubjects();
      resetDeletedSubjects();
      setEditing(false);

      // 알림만:삭제,추가 name으로
      if (deletedSubjects.length > 0) {
        alert(
          `삭제한 과목은 ${deletedSubjects.map((subject) => subject.name).join(', ')} 입니다` +
            (addedSubjects.length > 0
              ? `\n추가된 과목은 ${addedSubjects.map((subject) => subject.name).join(', ')} 입니다`
              : ''),
        );
      } else {
        if (addedSubjects.length > 0) {
          alert(`추가된 과목은 ${addedSubjects.map((subject) => subject.name).join(', ')} 입니다`);
        }
      }
      onSaveEditing();
    } else {
      alert(`과목 편집 저장 실패: ${response.message}`);
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
          style={mypageSaveBtn}
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
