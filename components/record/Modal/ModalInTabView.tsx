import { formatTime } from '@/utils/formatTimeUtils';
import { Box, Card, Flex, ScrollArea, Strong, Text } from '@radix-ui/themes';

import styles from './ModalInTab.module.css';
import { levelColor } from '@/utils/levelUtils';

export default function ModalInTabView({ record }: { record: IRecord }) {
  const record_color: string = levelColor(record.time);

  return (
    <>
      <Box className={styles.box}>
        <Box className={styles.content}>
          <Text as="p" className={styles.total_time} weight="bold">
            {formatTime(record.time)}
          </Text>
        </Box>
      </Box>
      {record.subjects.length > 0 && (
        <Box mt="5" className={styles.box}>
          <Box className={`${styles.title} title`}>
            <Strong>과목</Strong>
          </Box>
          <Box mt="3" className={styles.content}>
            <Flex wrap="wrap" gap="15px" asChild>
              <ul className={`${styles.subject_list} subject_list ${record_color}`}>
                {record.subjects.map((subject) => {
                  return (
                    <li key={`modalSubjectList${subject.name}`}>
                      <Text as="p">{subject.name}</Text>
                    </li>
                  );
                })}
              </ul>
            </Flex>
          </Box>
        </Box>
      )}
      <Box mt="5" className={styles.box}>
        <Box className={`${styles.title} title`}>
          <Strong>회고</Strong>
        </Box>
        <Box mt="3" className={styles.content}>
          <Card>
            {record.comment == null || record.comment.trim() == '' ? (
              <Text as="p">회고를 입력해주세요!</Text>
            ) : (
              <ScrollArea type="always" scrollbars="vertical" style={{ maxHeight: 180 }}>
                <Box p="2" pr="8" style={{ whiteSpace: 'pre-wrap' }}>
                  <Flex direction="column" gap="4">
                    {record.comment}
                  </Flex>
                </Box>
              </ScrollArea>
            )}
          </Card>
        </Box>
      </Box>
    </>
  );
}
