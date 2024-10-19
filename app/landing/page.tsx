import { Box,Text} from '@radix-ui/themes';
import styles from './page.module.css'

export default function Landing() {

  return (
    <Box px="9" className={styles.landing_wrap}>
      <section className={styles.first}>
        <Text className="">우리들의 행복한 시간</Text>
        <div className={styles.timer_img_wrap}>
          <img src="/imgs/landing_timer_desktop.png" alt="랜딩타이머데스크탑" className={styles.timer_img_desktop} />
          <img src="/imgs/landing_timer_mobile.png" alt="랜딩타이머모바일" className={styles.timer_img_mobile} />
        </div>
      </section>
      <section>2</section>
      <section>3</section>
    </Box>
  );
}
