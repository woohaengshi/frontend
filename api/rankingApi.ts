  import {instance} from './instance';
import { ApiResponse } from '../types/rankingType';
import rankingImg from '../assets/icons/ranking_profile_img.png';

export const fetchRankingsAndCurrentUserFromServer = async ({
  tab,
  pageNumber,
  size = 10, // 기본적으로 한 번에 가져올 수
}: {
  tab: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  pageNumber: number;
  size?: number;
}): Promise<ApiResponse> => {
  try {
    const url = `rank?page=${pageNumber}&type=${tab}&size=${size}`;
    const response = await instance(url, {
      method: 'GET', // HTTP 메서드를 POST로 설정
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
