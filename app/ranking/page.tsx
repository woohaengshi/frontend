'use client';
import React, { useEffect, useState, useCallback } from 'react';
import TopRankings from '../../components/ranking/TopLanking';
import FullRankingList from '../../components/ranking/FullRankingList';
import { Grid } from '@radix-ui/themes';
import styles from './ranking.module.css';
import rankingImg from '../../assets/icons/ranking_profile_img.png';

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  course: string;
  rank: number;
  imageUrl?: string;
}

interface ApiResponse {
  member: {
    id: number;
    name: string;
    course: string;
    rank: number;
    image: any;
    studyTime: number;
    totalTime: number;
  };
  ranking: {
    hasNext: boolean;
    ranks: Student[];
  };
}

const fetchRankingsAndCurrentUserFromServer = async (
  tab: 'daily' | 'weekly' | 'monthly',
  pageNumber: number,
  size: number = 10, // 기본적으로 한 번에 가져올 수
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`/api/v1/rank?page=${pageNumber}&type=${tab}&size=${size}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
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

function Ranking() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [rankings, setRankings] = useState<Student[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); // 페이지 번호를 0부터 시작
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const size = 10; // 한 번에 가져올 랭킹 수

  useEffect(() => {
    const fetchData = async () => {
      setRankings([]);
      setPage(0);
      setHasMore(true);

      const {
        member,
        ranking: { ranks: initialRankings, hasNext },
      } = await fetchRankingsAndCurrentUserFromServer(activeTab, 0, size);

      const currentUserData: Student = {
        id: member.id,
        name: member.name,
        studyTime: `${member.studyTime}시간`,
        totalTime: `${member.totalTime}시간`,
        course: member.course,
        rank: member.rank,
        imageUrl: member.image,
      };

      setRankings(initialRankings);
      setHasMore(hasNext);
      setCurrentUser(currentUserData);
    };

    fetchData();
  }, [activeTab]);

  const loadMore = useCallback(async () => {
    if (hasMore) {
      const nextPage = page + 1; // 페이지 번호 증가
      const {
        ranking: { ranks: newRankings, hasNext },
      } = await fetchRankingsAndCurrentUserFromServer(activeTab, nextPage, size);

      setRankings((prevRankings) => [...prevRankings, ...newRankings]);
      setHasMore(hasNext);
      setPage(nextPage); // 페이지 업데이트
    }
  }, [activeTab, hasMore, page]);

  return (
    <Grid columns="1" gap="2" rows="repeat(1, 100px)" className={styles.ranking_wrap}>
      <Grid columns="1" gap="3" rows="repeat(1, 64px)" className={styles.ranking_wrap_inner}>
        <Grid columns="3" gap="1" rows="repeat(1, 64px)" className={styles.date_tap_wrap}>
          <button
            className={`${styles.date_tap_btn} ${activeTab === 'daily' ? styles.date_tap_btn_active : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            일간
          </button>
          <button
            className={`${styles.date_tap_btn} ${activeTab === 'weekly' ? styles.date_tap_btn_active : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            주간
          </button>
          <button
            className={`${styles.date_tap_btn} ${activeTab === 'monthly' ? styles.date_tap_btn_active : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            월간
          </button>
        </Grid>
        <Grid className={styles.top_rankings_wrap}>
          <TopRankings rankings={rankings} activeTab={activeTab} />
        </Grid>
      </Grid>
      <Grid className={styles.full_ranking_wrap}>
        <FullRankingList
          rankings={rankings}
          currentUser={currentUser}
          activeTab={activeTab}
          loadMore={loadMore}
          hasMore={hasMore}
        />
      </Grid>
    </Grid>
  );
}

export default Ranking;
