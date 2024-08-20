import { Box, Container, Flex, Strong, Text, Tooltip } from '@radix-ui/themes';
import Image from 'next/image';
import styles from './page.module.css';

export default function Mypage() {
  return (
    <Container size="2" className={styles.container}>
      <div className={styles.title}>
        <Strong>총 월간 배지</Strong>
      </div>
      <Box mt="5" className={styles.content}>
        <Flex asChild justify="center" align="center" gap="65px">
          <ul>
            <li>
              {/* <Tooltip content={`7월 3주차`}> */}
              <Box>
                <Image src={'/imgs/medal_first_off.svg'} width={120} height={150} alt="1등 뱃지" />
                <Text as="p" mt="3" weight="medium">
                  0회
                </Text>
              </Box>
              {/* </Tooltip> */}
            </li>
            <li>
              {/* <Tooltip content={`7월 3주차`}> */}
              <Box>
                <Image src={'/imgs/medal_second_off.svg'} width={120} height={150} alt="2등 뱃지" />
                <Text as="p" mt="3" weight="medium">
                  0회
                </Text>
              </Box>
              {/* </Tooltip> */}
            </li>
            <li>
              {/* <Tooltip content={`7월 3주차`}> */}
              <Box>
                <Image src={'/imgs/medal_third_off.svg'} width={120} height={150} alt="3등 뱃지" />
                <Text as="p" mt="3" weight="medium">
                  0회
                </Text>
              </Box>
              {/* </Tooltip> */}
            </li>
          </ul>
        </Flex>
      </Box>
    </Container>
  );
}
