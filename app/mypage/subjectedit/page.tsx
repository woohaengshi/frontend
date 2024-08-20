// Page.tsx
'use client';

import SubjectEditForm from '@/components/study/SubjectEditForm';
import { useSubjectStore } from '@/store/subjectStore';
export default function Page() {
 
  const {  setEditing, addSubject, deleteSubject, saveEditing } = useSubjectStore();

  const customStyle = {
    height: '400px',
  };
  const subjectChoiceBoxStyle = {
    maxHeight: '200px',
  };
  const mypageSaveBtn = {
    height: '60px',
    fontWeight: '700',
  };
  
  return (
    <SubjectEditForm
      onAddSubject={addSubject}
      onDeleteSubject={deleteSubject}
      onSaveEditing={() => {
        saveEditing();
        setEditing(false);
      }}
      showCancelButton={false}
      style={customStyle}
      subjectChoiceBoxStyle={subjectChoiceBoxStyle}
      mypageSaveBtn={mypageSaveBtn}
    />
  );
}
