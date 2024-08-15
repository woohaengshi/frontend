import instance from './instance';
import { ApiResponse } from '../types/ranking';
import rankingImg from '../assets/icons/ranking_profile_img.png';

export const fetchRankingsAndCurrentUserFromServer = async (
  tab: 'daily' | 'weekly' | 'monthly',
  pageNumber: number,
  size: number = 10, // 기본적으로 한 번에 가져올 수
): Promise<ApiResponse> => {
  try {
    // API 요청 URL 구성
    const url = `api/v1/rank?page=${pageNumber}&type=${tab}&size=${size}`;
    // API 요청
    const response = await instance.get(url, {
      credentials: 'include', // 자격 증명(쿠키 등)을 포함하도록 설정
    });

    // 데이터 반환
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      member: {
        id: -1,
        name: 'Unknown User',
        course: 'Unknown Class',
        rank: -1,
        image: rankingImg,
        studyTime: 0,
        totalTime: 0,
      },
      ranking: { hasNext: false, ranks: [] },
    };
  }
};
