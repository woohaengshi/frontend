'use client';
import React, { useEffect, useState } from 'react';
import TopRankings from '@/components/ranking/topRanking';
import FullRankingList from '@/components/ranking/fullRankingList';
import { Box, Flex } from '@radix-ui/themes';
import styles from './page.module.css';
import rankingImg from '@/assets/icons/ranking_profile_img.png';
import { getMemberRanking } from '@/apis/rankingApi';
import { Student, ApiResponse } from '@/types/rankingType';

export default function Ranking() {
  const [activeTab, setActiveTab] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');
  const [rankings, setRankings] = useState<Student[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [currentUser, setCurrentUser] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const size = 10;

  const fetchData = async (pageNumber: number) => {
    try {
      setLoading(true);
      const {
        member,
        ranking: { ranks: newRankings, hasNext },
      }: ApiResponse = await getMemberRanking({
        tab: activeTab,
        pageNumber,
        size,
      });

      if (pageNumber === 0) {
        setRankings(newRankings);
        setCurrentUser({
          id: member.id,
          name: member.name,
          studyTime: member.studyTime,
          totalTime: member.totalTime,
          course: member.course,
          rank: member.rank,
          image: member.image || rankingImg,
        });
      } else {
        console.log(pageNumber);

        setRankings((prevRankings) => [...prevRankings, ...newRankings]);
      }

      setHasMore(hasNext);
      setPage(pageNumber);
    } catch (error) {
      console.error('데이터 로드 에러:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, [activeTab]);

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchData(page + 1);
    }
  };

  return (
    <section className={styles.container}>
      <Flex direction="column" justify="between" className={styles.container_inner}>
        <Box className="top">
          <Box py="5" className={styles.tab_category}>
            <Flex gap="10px" justify="center" asChild>
              <ul>
                {['DAILY', 'WEEKLY', 'MONTHLY'].map((tab) => (
                  <li key={tab}>
                    <button
                      className={`${activeTab === tab ? styles.active : ''}`}
                      onClick={() => setActiveTab(tab as 'DAILY' | 'WEEKLY' | 'MONTHLY')}
                    >
                      {tab === 'DAILY' ? '일간' : tab === 'WEEKLY' ? '주간' : '월간'}
                    </button>
                  </li>
                ))}
              </ul>
            </Flex>
          </Box>
          <Box pb="5" className={styles.top_rankings_wrap}>
            <TopRankings rankings={rankings} activeTab={activeTab} />
          </Box>
        </Box>
        <Box p="5" className={styles.full_rankings_wrap}>
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
