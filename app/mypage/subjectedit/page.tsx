// Page.tsx
'use client';

import SubjectEdit from '@/components/study/SubjectEditForm';
import { useSubjectStore } from '@/store/subjectStore';
export default function Page() {
  // Zustand 스토어에서 상태와 액션 가져오기
  const { subjects, isEditing, setEditing, addSubject, deleteSubject, saveEditing } = useSubjectStore((state) => ({
    subjects: state.subjects,
    isEditing: state.isEditing,
    setEditing: state.setEditing,
    addSubject: state.addSubject,
    deleteSubject: state.deleteSubject,
    saveEditing: state.saveEditing,
  }));
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
    <SubjectEdit
      subjects={subjects}
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
