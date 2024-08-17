'use client';
import React from 'react';
import SubjectSelect from './SubjectSelectForm';
import SubjectEdit from './SubjectEditForm';
import styles from './SubjectForm.module.css';
import { useSubjectStore } from '@/store/subjectStore';
import { subjectFormApi } from '@/api/subjectFormApi'; // subjectFormApi 불러오기

interface SubjectEditFormProps {
  closeSubjectEditForm: () => void;
}

export default function SubjectEditForm({ closeSubjectEditForm }: SubjectEditFormProps) {
  const {
    subjects,
    selectedSubjects,
    isEditing,
    setEditing,
    saveSelected,
    saveEditing,
    addSubject,
    deleteSubject,
    selectSubject,
    deletedSubjects, // 삭제된 과목들 가져오기
  } = useSubjectStore();

  const handleSaveAndClose = async () => {
    if (isEditing) {
      saveEditing();
    } else {
      saveSelected();

      // 과목 저장 및 삭제 API 호출
      const payload = {
        savedSubjects: selectedSubjects,
        deletedSubjects: deletedSubjects,
      };

      const response = await subjectFormApi(payload);
      if (response.success) {
        console.log('Subjects updated successfully');
      } else {
        console.error('Failed to update subjects:', response.error);
      }

      closeSubjectEditForm(); // 모달 닫기
    }
  };

  return (
    <div className={styles.subject_edit_form_wrap}>
      <button onClick={closeSubjectEditForm} className={styles.closeButton}>
        →
      </button>
      {isEditing ? (
        <SubjectEdit
          subjects={subjects}
          onAddSubject={addSubject}
          onDeleteSubject={deleteSubject}
          onSaveEditing={handleSaveAndClose}
          showCancelButton={true}
          onCancelEditing={() => setEditing(false)}
        />
      ) : (
        <SubjectSelect
          subjects={subjects}
          selectedSubjects={selectedSubjects}
          onSelectSubject={selectSubject}
          onEditClick={() => setEditing(true)}
          onSaveClick={handleSaveAndClose}
        />
      )}
    </div>
  );
}
