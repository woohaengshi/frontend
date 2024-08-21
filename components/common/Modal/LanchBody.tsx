import { Box, Strong, Text } from '@radix-ui/themes';
import styles from './Modal.module.css';
import ModalLink from './ModalLink';

export default function LanchBody() {
  return (
    <>
      <Box className={styles.box}>
        <Box className={styles.title}>
          <Strong>뭘 적으면 좋을까요...</Strong>
        </Box>
        <Box pt="2" className={styles.typography}>
          <Text as="p">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </Box>
      </Box>
      <Box mt="5" className={styles.box}>
        <Box className={styles.title}>
          <Strong>업데이트 예정</Strong>
        </Box>
        <Box pt="2" className={styles.list}>
          <Text as="p">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
          <Box pl="5" pt="2" asChild>
            <ul>
              <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
              <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
              <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
            </ul>
          </Box>
        </Box>
      </Box>
      <Box mt="5" className={styles.box}>
        <Box className={styles.title}>
          <Strong>에러 제보 및 의견 건의</Strong>
        </Box>
        <Box pt="2" className={styles.typography}>
          <Text as="p">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
          <Box mt="2">
            <ModalLink href="/">구글폼 바로가기</ModalLink>
          </Box>
        </Box>
      </Box>
    </>
  );
}
