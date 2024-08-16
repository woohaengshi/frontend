// SubjectEditForm.tsx
'use client';
import React from 'react';
import SubjectSelect from './SubjectSelectForm';
import SubjectEdit from './SubjectEditForm';
import styles from './SubjectForm.module.css';
import { useSubjectStore } from '@/store/subjectStore';

interface SubjectEditFormProps {
  closeSubjectEditForm: () => void;
}

function SubjectEditForm({ closeSubjectEditForm }: SubjectEditFormProps) {
  const { subjects, selectedSubjects, isEditing, setEditing, saveSelected, saveEditing } = useSubjectStore((state) => ({
    subjects: state.subjects,
    selectedSubjects: state.selectedSubjects,
    isEditing: state.isEditing,
    setEditing: state.setEditing,
    saveSelected: state.saveSelected,
    saveEditing: state.saveEditing,
  }));

  const handleSaveAndClose = () => {
    if (isEditing) {
      saveEditing(); // 편집 저장
    } else {
      saveSelected(); // 선택 저장
    }
    closeSubjectEditForm(); // 모달 닫기
  };

  return (
    <div className={styles.subject_edit_form_wrap}>
      <div className={styles.subject_edit_form_close_btn}>
        <button onClick={closeSubjectEditForm} className={styles.closeButton}>
          →
        </button>
      </div>
      {isEditing ? (
        <SubjectEdit
          subjects={subjects}
          onAddSubject={(subject) => useSubjectStore.getState().addSubject(subject)}
          onDeleteSubject={(subject) => useSubjectStore.getState().deleteSubject(subject)}
          onSaveEditing={handleSaveAndClose} // 저장 및 모달 닫기
          showCancelButton={true}
          onCancelEditing={() => setEditing(false)}
        />
      ) : (
        <SubjectSelect
          subjects={subjects}
          selectedSubjects={selectedSubjects}
          onSelectSubject={(subject) => useSubjectStore.getState().selectSubject(subject)}
          onEditClick={() => setEditing(true)}
          onSaveClick={handleSaveAndClose} // 저장 및 모달 닫기
        />
      )}
    </div>
  );
}

export default SubjectEditForm;
