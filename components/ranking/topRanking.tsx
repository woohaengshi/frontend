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

  // 탭에 따라 라벨 설정
  const timeLabel = activeTab === 'DAILY' ? '일시간' : activeTab === 'WEEKLY' ? '주시간' : '월시간';

  // 집계된 랭킹이 없을 경우 메시지 표시
  if (modifiedRankings.length === 0) {
    return (
      <Flex justify="center" align="center" gap="20px" className={styles.ranking_list} asChild>
        <ul>
          <li className={styles.no_ranking}>
            <Flex justify="center" align="center">
              <Text as="p" size="2" weight="medium" align="center">
                집계된 등수가 존재하지 않습니다.
              </Text>
            </Flex>
          </li>
        </ul>
      </Flex>
    );
  }

  // 빈 자리 채우기 위해 필요한 빈 객체 생성, 집계된 랭킹이 1이상일때만
  const emptyObjectCount = Math.max(0, 3 - modifiedRankings.length);
  const emptyObjects = Array.from({ length: emptyObjectCount }, () => ({}) as Student);

  // 랭킹 순서 변경
  if (modifiedRankings.length >= 1) {
    // 랭킹이 1명만 집계된 경우 modifiedRankings[1]에 빈 객체를 할당
    if (modifiedRankings.length === 1) {
      modifiedRankings[1] = {} as Student; // 빈 객체를 할당
    }
    [modifiedRankings[0], modifiedRankings[1]] = [modifiedRankings[1], modifiedRankings[0]];
  }

  return (
    <Flex justify="center" align="center" gap="20px" className={styles.ranking_list} asChild>
      <ul>
        {modifiedRankings
          .concat(emptyObjects)
          .slice(0, 3)
          .map((student, index) => {
            const sizeClass = index === 1 ? '' : styles.side_box;
            const medalImage = index === 0 ? rankingTwo : index === 1 ? rankingOne : rankingThird;

            // 시간 포맷팅
            const formattedStudyTime = student.studyTime ? formatTime(student.studyTime) : '';
            const formattedTotalTime = student.totalTime ? formatTime(student.totalTime) : '';

            return (
              <Flex key={student.id || index} direction="column" align="center" justify="end" gap="10px" asChild>
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
                    <Image
                      className={styles.student_image}
                      src={student.image || rankingImg}
                      alt={`${student.name || 'Placeholder'} 이미지`}
                      width={80}
                      height={80}
                    />
                  </Box>
                  <Box className={styles.user_info}>
                    <Text as="p" size="2" weight="medium" className={styles.ellipsis}>
                      {student.name || '주인공은 당신'}
                    </Text>
                    <Text as="p" size="2" className={styles.color_gray}>
                      {student.course || '랭킹에 도전하세요'}
                    </Text>
                  </Box>
                  <Flex justify="between" className={styles.time_info}>
                    <Box className={styles.study_time}>
                      <Text as="p" size="2" weight="medium">
                        {timeLabel}
                      </Text>
                      <Text
                        as="p"
                        size="2"
                        className={styles.color_gray}
                        style={{
                          textAlign: formattedStudyTime ? 'left' : 'center',
                        }}
                      >
                        {formattedStudyTime || '-'}
                      </Text>
                    </Box>
                    <Box className={styles.total_time}>
                      <Text as="p" size="2" weight="medium">
                        누적시간
                      </Text>
                      <Text
                        as="p"
                        size="2"
                        className={styles.color_gray}
                        style={{
                          textAlign: formattedTotalTime ? 'left' : 'center',
                        }}
                      >
                        {formattedTotalTime || '-'}
                      </Text>
                    </Box>
                  </Flex>
                </li>
              </Flex>
            );
          })}
      </ul>
    </Flex>
  );
}
