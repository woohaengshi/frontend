'use server';

import { instance } from './instance';

interface SubjectPayload {
  addedSubjects: string[]; // 추가된 과목 리스트 (과목 이름)
  deletedSubjects: number[]; // 삭제된 과목 리스트 (과목 ID)
}

export const subjectFormApi = async (payload: SubjectPayload) => {
  try {
    const requestBody: { addedSubjects: string[]; deletedSubjects: number[] } = {
      addedSubjects: [], // 기본값으로 빈 배열 설정
      deletedSubjects: [], // 기본값으로 빈 배열 설정
    };

    // 추가된 과목이 있으면 requestBody에 추가
    if (payload.addedSubjects.length > 0) {
      requestBody.addedSubjects = payload.addedSubjects;
    }

    // 삭제된 과목이 있으면 requestBody에 추가
    if (payload.deletedSubjects.length > 0) {
      requestBody.deletedSubjects = payload.deletedSubjects;
    }

    console.log('Sending request with body:', requestBody);

    // 서버로 전송
    const response = await instance('subjects', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    if (response.error) {
      console.error('Error processing subjects:', response.error);
      throw new Error('Failed to process subjects');
    }

    return { success: true };
  } catch (error) {
    console.error('subjectFormApi Error:', error);
    return { success: false, error };
  }
};
