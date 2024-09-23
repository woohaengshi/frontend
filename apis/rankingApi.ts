import { instance } from './instance';
import { ApiResponse } from '../types/rankingType';
import rankingImg from '../assets/icons/ranking_profile_img.png';

//랭킹 조회 api
export const getMemberRanking = async ({
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
      method: 'GET',
      credentials: 'include',
    });

    // 데이터 반환
    return response;
  } catch (error) {
    console.error('데이터 페치 에러:', error);
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
