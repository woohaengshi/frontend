// Page.tsx
'use client';

import SubjectEdit from '@/components/study/SubjectEditForm';
import { useSubjectStore } from '@/store/subjectStore';
export default function Page() {
  // Zustand 스토어에서 상태와 액션 가져오기
  const { setEditing,saveEditing } = useSubjectStore((state) => ({
    setEditing: state.setEditing, 
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
