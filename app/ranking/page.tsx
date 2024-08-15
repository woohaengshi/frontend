// Ranking.tsx
import React, { useEffect, useState, useCallback } from 'react';
import TopRankings from '../../components/ranking/topLanking';
import FullRankingList from '../../components/ranking/fullRankingList';
import { Grid } from '@radix-ui/themes';
import styles from './ranking.module.css';
import rankingImg from '../../assets/icons/ranking_profile_img.png';
import { fetchRankingsAndCurrentUserFromServer } from '../../api/rankingApi';
import { Student, ApiResponse } from '../../types/rankingType'; 

function Ranking() {
  const [activeTab, setActiveTab] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');
  const [rankings, setRankings] = useState<Student[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const size = 10;

  useEffect(() => {
    const fetchData = async () => {
      setRankings([]);
      setPage(0);
      setHasMore(true);

      try {
        const {
          member,
          ranking: { ranks: initialRankings, hasNext },
        }: ApiResponse = await fetchRankingsAndCurrentUserFromServer(activeTab, 0, size);

        const currentUserData: Student = {
          id: member.id,
          name: member.name,
          studyTime: `${member.studyTime}시간`,
          totalTime: `${member.totalTime}시간`,
          course: member.course,
          rank: member.rank,
          image: member.image || rankingImg,
        };

        setRankings(initialRankings);
        setHasMore(hasNext);
        setCurrentUser(currentUserData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [activeTab]);

  const loadMore = useCallback(async () => {
    if (hasMore) {
      const nextPage = page + 1;
      try {
        const {
          ranking: { ranks: newRankings, hasNext },
        }: ApiResponse = await fetchRankingsAndCurrentUserFromServer(activeTab, nextPage, size);

        setRankings((prevRankings) => [...prevRankings, ...newRankings]);
        setHasMore(hasNext);
        setPage(nextPage);
      } catch (error) {
        console.error('Error loading more data:', error);
      }
    }
  }, [activeTab, hasMore, page]);

  return (
    <Grid columns="1" gap="2" rows="repeat(1, 100px)" className={styles.ranking_wrap}>
      <Grid columns="1" gap="3" rows="repeat(1, 64px)" className={styles.ranking_wrap_inner}>
        <Grid columns="3" gap="1" rows="repeat(1, 64px)" className={styles.date_tap_wrap}>
          <button
            className={`${styles.date_tap_btn} ${activeTab === 'DAILY' ? styles.date_tap_btn_active : ''}`}
            onClick={() => setActiveTab('DAILY')}
          >
            일간
          </button>
          <button
            className={`${styles.date_tap_btn} ${activeTab === 'WEEKLY' ? styles.date_tap_btn_active : ''}`}
            onClick={() => setActiveTab('WEEKLY')}
          >
            주간
          </button>
          <button
            className={`${styles.date_tap_btn} ${activeTab === 'MONTHLY' ? styles.date_tap_btn_active : ''}`}
            onClick={() => setActiveTab('MONTHLY')}
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
