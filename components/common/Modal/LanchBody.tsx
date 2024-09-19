import { Box, Strong, Text } from '@radix-ui/themes';
import styles from './Modal.module.css';
import ModalLink from './ModalLink';

export default function LanchBody() {
  return (
    <>
      <Box className={styles.box}>
        <Box className="title">
          <Strong>서비스 소개</Strong>
        </Box>
        <Box pt="2" className={styles.typography}>
          <Text as="p">안녕하세요, 우리 FIS 아카데미 3기 클라우드 서비스입니다😄</Text>
          <Text as="p">다름이 아니라, 저희 클라우스 서비스반 입과생들끼리 사이드 프로젝트를 진행하였습니다👏👏</Text>
          <Text as="p">
            저희가 개발한 서비스는<b>&#39;우.행.시.&#39;</b>라는 서비스인데요.
          </Text>
          <Text as="p">
            우행시는 우리FIS 아카데미 교육생분들이 <b>공부한 시간을 측정하여 학습 기록을 확인할 수 있는 서비스</b>
            입니다⏰
          </Text>
          <Text as="p">
            저희가 개발한 서비스를 사용해보시고 자유롭게 <b>버그, 피드백</b> 의견주시면 감사하겠습니다💜
          </Text>
        </Box>
      </Box>
      <Box mt="5" className={styles.box}>
        <Box className="title">
          <Strong>업데이트 예정</Strong>
        </Box>
        <Box pt="2" className={styles.list}>
          <Text as="p"></Text>
          <Box pl="5" pt="2" asChild>
            <ul>
              <li>비밀번호 재설정</li>
              <li>기록하기 페이지에서 기록한 과목 수정하기</li>
              <li>월간 뱃지 기록</li>
              <li>프로필 이미지 선택</li>
              <li>반응형</li>
              <li>새로고침이 됐을때도 공부기록이 유지되게끔 하기</li>
            </ul>
          </Box>
        </Box>
      </Box>
      <Box mt="5" className={styles.box}>
        <Box className="title">
          <Strong>에러 제보 및 의견 건의</Strong>
        </Box>
        <Box pt="2" className={styles.typography}>
          <Text as="p">
            사용하시면서 에러를 발견하거나 요청하고 싶은 사항이 있으시다면 아래 구글폼에 의견을 남겨주세요!
          </Text>
          <Box mt="2">
            <ModalLink href="https://forms.gle/yevM69EGXh4wmvom8">구글폼 바로가기</ModalLink>
          </Box>
        </Box>
      </Box>
    </>
  );
}
