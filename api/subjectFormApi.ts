'use server';

import { instance } from './instance'; 

interface SubjectPayload {
  savedSubjects: string[]; // 저장된 과목 리스트 (과목 이름)
  deletedSubjects: number[]; // 삭제된 과목 리스트 (과목 ID)
}

export const subjectFormApi = async (payload: SubjectPayload) => {
  try {
    const requestBody: { savedSubjects?: string[]; deletedSubjects?: number[] } = {};

    // 저장된 과목이 있으면 requestBody에 추가
    if (payload.savedSubjects.length > 0) {
      requestBody.savedSubjects = payload.savedSubjects;
    }

    // 삭제된 과목이 있으면 requestBody에 추가
    if (payload.deletedSubjects.length > 0) {
      requestBody.deletedSubjects = payload.deletedSubjects;
    }

    // 저장된 과목이나 삭제된 과목이 있는 경우 서버로 전송
    if (Object.keys(requestBody).length > 0) {
      const response = await instance('subjects', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });

      if (response.error) {
        console.error('Error processing subjects:', response.error);
        throw new Error('Failed to process subjects');
      }
    }

    return { success: true };
  } catch (error) {
    console.error('subjectFormApi Error:', error);
    return { success: false, error };
  }
};
