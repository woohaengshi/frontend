import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './topRankingList.module.css';

import rankingOne from '@/public/imgs/medal_first_on.svg';
import rankingTwo from '@/public/imgs/medal_second_on.svg';
import rankingThird from '@/public/imgs/medal_third_on.svg';
import rankingImg from '@/assets/icons/ranking_profile_img.png';
import Image from 'next/image';

import { Student } from '@/types/rankingType';
import { formatTime } from '@/utils/formatTimeUtils';

interface TopRankingsProps {
  rankings: Student[];
  activeTab: 'DAILY' | 'WEEKLY' | 'MONTHLY';
}

export default function TopRankings({ rankings, activeTab }: TopRankingsProps) {
  const modifiedRankings = [...rankings];

  // 랭킹 순서 변경
  if (modifiedRankings.length > 1) {
    [modifiedRankings[0], modifiedRankings[1]] = [modifiedRankings[1], modifiedRankings[0]];
  }

  // 탭에 따라 라벨 설정
  const timeLabel = activeTab === 'DAILY' ? '일시간' : activeTab === 'WEEKLY' ? '주시간' : '월시간';

  return (
    <Flex justify="center" align="center" gap="20px" className={styles.ranking_list} asChild>
      <ul>
        {modifiedRankings.length >= 0 ? (
          modifiedRankings.slice(0, 3).map((student, index) => {
            const sizeClass = index === 1 ? '' : styles.side_box;
            const medalImage = index === 0 ? rankingTwo : index === 1 ? rankingOne : rankingThird;

            // 시간 포맷팅
            const formattedStudyTime = formatTime(student.studyTime);
            const formattedTotalTime = formatTime(student.totalTime);

            return (
              <Flex key={student.id} direction="column" align="center" justify="end" gap="10px" asChild>
                <li className={`${sizeClass}`}>
                  <div className={styles.img_medal}>
                    <Image
                      src={medalImage}
                      alt={`${index + 1}등 메달`}
                      className={`${styles.medal_image}`}
                      width={35}
                      height={45}
                    />
                  </div>
                  <Box className={styles.img_profile}>
                    <Image src={student.image || rankingImg} alt={`${student.name} 이미지`} width={80} height={80} />
                  </Box>
                  <Box className={styles.user_info}>
                    <Text as="p" size="2" weight="medium" className={styles.ellipsis}>
                      {student.name}
                    </Text>
                    <Text as="p" size="2" className={styles.color_gray}>
                      {student.course}
                    </Text>
                  </Box>
                  <Flex justify="between" className={styles.time_info}>
                    <Box className={styles.study_time}>
                      <Text as="p" size="2" weight="medium">
                        {timeLabel}
                      </Text>
                      <Text as="p" size="2" className={styles.color_gray}>
                        {formattedStudyTime}
                      </Text>
                    </Box>
                    <Box className={styles.total_time}>
                      <Text as="p" size="2" weight="medium">
                        누적시간
                      </Text>
                      <Text as="p" size="2" className={styles.color_gray}>
                        {formattedTotalTime}
                      </Text>
                    </Box>
                  </Flex>
                </li>
              </Flex>
            );
          })
        ) : (
          <li className={styles.no_ranking}>
            <Flex justify="center" align="center">
              <Text as="p" size="2" weight="medium" align="center">
                집계된 등수가 존재하지 않습니다.
              </Text>
            </Flex>
          </li>
        )}
      </ul>
    </Flex>
  );
}
