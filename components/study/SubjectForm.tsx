//SubjectForm.tsx
import React from 'react';
import SubjectSelect from './SubjectSelectForm';
import SubjectEdit from './SubjectEditForm';
import styles from './SubjectForm.module.css';
import { useSubjectStore } from '@/store/subjectStore';
import { subjectFormApi } from '@/api/subjectFormApi';

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
    deletedSubjects,
    addedSubjects,
    resetAddedSubjects,
  } = useSubjectStore();

  // 이 함수가 API 호출을 담당합니다.
  const handleSaveAndSendRequest = async () => {
    const payload = {
      addedSubjects: addedSubjects,
      deletedSubjects: deletedSubjects,
    };

    console.log(payload);
    

    const response = await subjectFormApi(payload);
    if (response.success) {
      console.log('Subjects updated successfully');
      resetAddedSubjects();
      setEditing(false);
    } else {
      console.error('Failed to update subjects:', response.error);
    }
  };

  const handleSaveAndClose = async () => {
    if (isEditing) {
      saveEditing();
      handleSaveAndSendRequest(); // 여기서 API 호출 함수가 실행.
    } else {
      saveSelected();
      closeSubjectEditForm();
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
