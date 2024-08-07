import { Box, Container, Flex, Strong, Text, Tooltip } from '@radix-ui/themes';
import Image from 'next/image';
import styles from './page.module.css';

import medal_first_on from '@/assets/imgs/medal_first_on.svg';
import medal_second_off from '@/assets/imgs/medal_second_off.svg';
import medal_third_off from '@/assets/imgs/medal_third_off.svg';

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
              <Tooltip content={`7월 3주차`}>
                <Box>
                  <Image src={medal_first_on} width={120} height={150} alt="1등 뱃지" />
                  <Text as="p" mt="3" weight="medium">
                    1회
                  </Text>
                </Box>
              </Tooltip>
            </li>
            <li>
              <Tooltip content={`7월 3주차`}>
                <Box>
                  <Image src={medal_second_off} width={120} height={150} alt="2등 뱃지" />
                  <Text as="p" mt="3" weight="medium">
                    0회
                  </Text>
                </Box>
              </Tooltip>
            </li>
            <li>
              <Tooltip content={`7월 3주차`}>
                <Box>
                  <Image src={medal_third_off} width={120} height={150} alt="3등 뱃지" />
                  <Text as="p" mt="3" weight="medium">
                    0회
                  </Text>
                </Box>
              </Tooltip>
            </li>
          </ul>
        </Flex>
      </Box>
    </Container>
  );
}
