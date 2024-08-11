"use client"
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
  class: string;
  rank: number;
  imageUrl?: any;
}

// Simulate data generation function
const generateSimulatedData = (type: 'daily' | 'weekly' | 'monthly') => {
  const students = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `학생 ${String.fromCharCode(65 + (i % 26))}`,
    studyTime: `${Math.floor(Math.random() * 10) + 1}시간`,
    totalTime: `${Math.floor(Math.random() * 100) + 10}시간`,
    class: ['클라우드 서비스', 'AI 엔지니어링', '클라우드 엔지니어링'][i % 3],
    rank: i + 1,
    imageUrl: rankingImg,
  }));

  return students;
};

function Ranking() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [rankings, setRankings] = useState<Student[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const hongGilDongData: Record<string, Student> = {
    daily: {
      id: 1,
      name: '홍길동',
      studyTime: '5시간',
      totalTime: '20시간',
      class: '클라우드 서비스',
      rank: 78,
      imageUrl: rankingImg,
    },
    weekly: {
      id: 1,
      name: '홍길동',
      studyTime: '20시간',
      totalTime: '70시간',
      class: '클라우드 서비스',
      rank: 78,
      imageUrl: rankingImg,
    },
    monthly: {
      id: 1,
      name: '홍길동',
      studyTime: '80시간',
      totalTime: '250시간',
      class: '클라우드 서비스',
      rank: 78,
      imageUrl: rankingImg,
    },
  };

  const fetchRankings = async (tab: 'daily' | 'weekly' | 'monthly', pageNumber: number) => {
    const allRankings = generateSimulatedData(tab);
    const newRankings = allRankings.slice(0, pageNumber * 5);
    setRankings(newRankings);
    setHasMore(newRankings.length < allRankings.length);
  };

  useEffect(() => {
    setRankings([]);
    setPage(1);
    setHasMore(true);
    fetchRankings(activeTab, 1);
  }, [activeTab]);

  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage((prev) => {
        const nextPage = prev + 1;
        fetchRankings(activeTab, nextPage);
        return nextPage;
      });
    }
  }, [activeTab, hasMore]);



  const currentUser = hongGilDongData[activeTab];

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
