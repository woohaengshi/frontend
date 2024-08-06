import { Grid } from '@radix-ui/themes';
import styles from './topRankingList.module.css';

interface Student {
  id: number;
  name: string;
  studyTime: string;
  totalTime: string;
  class: string; // 반 추가
  // previousRank: number; // 이전 순위
  imageUrl?: string; // 학생 이미지 URL (선택 사항)
  isCurrentUser?: boolean; // 현재 사용자 여부
}

interface TopRankingsProps {
  rankings: Student[];
}

function TopRankings({ rankings }: TopRankingsProps) {
  return (
    <Grid columns="3" gap="1" rows="repeat(1, 64px)" className={styles.top_ranking_box_wrap}>
      {rankings.slice(0, 3).map((student, index) => {
        // 인덱스에 따라 클래스 설정
        const sizeClass = index === 1 ? styles.size_large : styles.size_small;

        return (
        <div key={student.id} className={`${styles.top_ranking_box} ${sizeClass}`}>
          <img src={student.imageUrl} alt={`${student.name} 이미지`} className={styles.student_image} />
          <div className={styles.student_info}>
            {/* <span className={styles.rank}>{index + 1}.</span>  */}
            <span className={styles.name}>{student.name}</span>
            <span className={styles.details}> - 공부시간: {student.studyTime}, 누적시간: {student.totalTime}, 반: {student.class}</span>
          </div>
        </div>
    ) }  )}
    </Grid>
  );
}

export default TopRankings;
