'use client';
import React, { useEffect, useState, useCallback } from 'react';
import TopRankings from '@/components/ranking/topRanking';
import FullRankingList from '@/components/ranking/fullRankingList';
import { Box, Flex } from '@radix-ui/themes';
import styles from './page.module.css';
import rankingImg from '@/assets/icons/ranking_profile_img.png';
import { getMemberRanking } from '@/api/rankingApi';
import { Student, ApiResponse } from '@/types/rankingType';

export default function Ranking() {
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

      const {
        member,
        ranking: { ranks: initialRankings, hasNext },
      }: ApiResponse = await getMemberRanking({
        tab: activeTab,
        pageNumber: 0,
        size,
      });

      const currentUserData: Student = {
        id: member.id,
        name: member.name,
        studyTime: member.studyTime,
        totalTime: member.totalTime,
        course: member.course,
        rank: member.rank,
        image: member.image || rankingImg,
      };

      setRankings(initialRankings);
      setHasMore(hasNext);
      setCurrentUser(currentUserData);
    };

    fetchData();
  }, [activeTab]);

  const loadMore = useCallback(async () => {
    if (hasMore) {
      const nextPage = page + 1;
      try {
        const response: ApiResponse = await getMemberRanking({
          tab: activeTab,
          pageNumber: nextPage,
          size,
        });

        console.log('API Response:', response); // 추가된 로그
        const newRankings = response.ranking.ranks; // API 응답에서 랭킹 데이터 추출

        setRankings((prevRankings) => [...prevRankings, ...newRankings]);
        setHasMore(response.ranking.hasNext);
        setPage(nextPage);
      } catch (error) {
        console.error('Error loading more data:', error);
      }
    }
  }, [activeTab, hasMore, page]);

  return (
    <section className={styles.container}>
      <Flex direction="column" justify="between" className={styles.container_inner}>
        <Box className="top">
          <Box py="5" className={styles.tab_category}>
            <Flex gap="10px" justify="center" asChild>
              <ul>
                <li>
                  <button
                    className={`${activeTab === 'DAILY' ? styles.active : ''}`}
                    onClick={() => setActiveTab('DAILY')}
                  >
                    일간
                  </button>
                </li>
                <li>
                  <button
                    className={`${activeTab === 'WEEKLY' ? styles.active : ''}`}
                    onClick={() => setActiveTab('WEEKLY')}
                  >
                    주간
                  </button>
                </li>
                <li>
                  <button
                    className={`${activeTab === 'MONTHLY' ? styles.active : ''}`}
                    onClick={() => setActiveTab('MONTHLY')}
                  >
                    월간
                  </button>
                </li>
              </ul>
            </Flex>
          </Box>
          <Box pb="5" className={styles.top_rankings_wrap}>
            <TopRankings rankings={rankings} activeTab={activeTab} />
          </Box>
        </Box>
        <Box p="5" pr="3" className={styles.btm}>
          <FullRankingList
            rankings={rankings}
            currentUser={currentUser}
            activeTab={activeTab}
            loadMore={loadMore}
            hasMore={hasMore}
          />
        </Box>
      </Flex>
    </section>
  );
}
