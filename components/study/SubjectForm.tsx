'use client';
import React from 'react';
import SubjectSelect from './SubjectSelectForm';
import SubjectEdit from './SubjectEditForm';
import styles from './SubjectForm.module.css';
import { useSubjectStore } from '@/store/subjectStore';

interface SubjectEditFormProps {
  closeSubjectEditForm: () => void;
}

export default function SubjectEditForm({ closeSubjectEditForm }: SubjectEditFormProps) {
  const { subjects, isEditing, setEditing, saveSelected, saveEditing, addSubject, deleteSubject } = useSubjectStore();

  const handleSaveAndClose = () => {
    if (isEditing) {
      saveEditing();
    } else {
      saveSelected();
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
        <SubjectSelect onEditClick={() => setEditing(true)} onSaveClick={handleSaveAndClose} />
      )}
    </div>
  );
}
