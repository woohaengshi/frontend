import React from 'react';
import SubjectSelectForm from './SubjectSelectForm';
import SubjectEditForm from './SubjectEditForm';
import styles from './SubjectForm.module.css';
import { useSaveStore } from '@/store/subjectStore';

interface SubjectEditFormProps {
  closeSubjectEditForm: () => void;
}

export default function SubjectForm({ closeSubjectEditForm }: SubjectEditFormProps) {
  const { isEditing, setEditing, saveSelected } = useSaveStore();

  const handleSaveAndClose = async () => {
    if (isEditing) {
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
        <SubjectEditForm onSaveEditing={handleSaveAndClose} showCancelButton={true} />
      ) : (
        <SubjectSelectForm onEditClick={() => setEditing(true)} onSaveClick={handleSaveAndClose} />
      )}
    </div>
  );
}
