'use client';

import SubjectEdit from '../../../components/study/SubjectEdit';
import { useState } from 'react';

const initialSubjects: string[] = ['html', 'css', 'javascript'];

interface SubjectEditFormProps {
  closeSubjectEditForm: () => void;
}

export default function Page() {
  const [subjects, setSubjects] = useState<string[]>(initialSubjects);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deletedSubjects, setDeletedSubjects] = useState<string[]>([]);

  const handleAddSubject = (subject: string) => {
    setSubjects([...subjects, subject]);
  };

  const handleDeleteSubject = (subjectToDelete: string) => {
    setSubjects(subjects.filter((subject) => subject !== subjectToDelete));
    setSelectedSubjects((prevSelected) => prevSelected.filter((s) => s !== subjectToDelete));
    setDeletedSubjects((prevDeleted) => [...prevDeleted, subjectToDelete]);
  };

  return (
    <SubjectEdit
      subjects={subjects}
      onAddSubject={handleAddSubject}
      onDeleteSubject={handleDeleteSubject}
      onCancelEditing={() => setIsEditing(false)}
    />
  );
}
