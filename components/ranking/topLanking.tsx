import { Grid } from '@radix-ui/themes';
import styles from './topRankingList.module.css';
import rankingOne from '../../assets/icons/ranking_1.png';
import rankingTwo from '../../assets/icons/ranking_2.png';
import rankingThird from '../../assets/icons/ranking_3.png';
import Image from 'next/image'; // Image 컴포넌트를 import

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string; // 반 추가
  imageUrl?: any; // 학생 이미지 URL (선택 사항)
  isCurrentUser?: boolean; // 현재 사용자 여부
}

interface TopRankingsProps {
  rankings: Student[];
}

function TopRankings({ rankings }: TopRankingsProps) {
  // 랭킹 배열에서 1등과 2등 학생의 위치를 교환합니다.
  const modifiedRankings = [...rankings];
  if (modifiedRankings.length > 1) {
    [modifiedRankings[0], modifiedRankings[1]] = [modifiedRankings[1], modifiedRankings[0]];
  }

  return (
    <Grid columns="3" gap="1" rows="repeat(1, 64px)" className={styles.top_ranking_box_wrap}>
      {modifiedRankings.slice(0, 3).map((student, index) => {
        // 인덱스에 따라 클래스 설정
        const sizeClass = index === 1 ? styles.size_large : styles.size_small;
        const medalImage = index === 0 
        ? rankingTwo
        : index === 1
          ? rankingOne
          : rankingThird;

        return (
          <div key={student.id} className={`${styles.top_ranking_box} ${sizeClass}`}>
            <div className={styles.medal_image_wrap} >
              <Image src={medalImage} alt={`${index + 1}등 메달`} className={styles.medal_image} />
            </div>
            <Image src={student.imageUrl} alt={`${student.name} 이미지`} className={styles.student_image} />
            <Grid columns="1" gap="2" rows="repeat(1, 10px)" >
                <span className={styles.student_name}>{student.name}</span>
                <span className={styles.student_class}> {student.class}</span>
            </Grid>
            <div className={styles.student_info}>
          
              <span className={styles.details}>
                - 공부시간: {student.studyTime}, 누적시간: {student.totalTime}
              </span>
            </div>
          </div>
        );
      })}
    </Grid>
  );
}

export default TopRankings;
