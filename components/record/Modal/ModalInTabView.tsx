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
            <ScrollArea type="always" scrollbars="vertical" style={{ height: 180 }}>
              <Box p="2" pr="8">
                <Flex direction="column" gap="4">
                  <Text as="p">회고를 입력해주세요!</Text>

                  {/* <Text as="p">
                    Legibility describes how easily individual characters can be distinguished from one another. It is
                    described by Walter Tracy as “the quality of being decipherable and recognisable”. For instance, if
                    a “b” and an “h”, or a “3” and an “8”, are difficult to distinguish at small sizes, this is a
                    problem of legibility.
                  </Text>

                  <Text as="p">
                    Typographers are concerned with legibility insofar as it is their job to select the correct font to
                    use. Brush Script is an example of a font containing many characters that might be difficult to
                    distinguish. The selection of cases influences the legibility of typography because using only
                    uppercase letters (all-caps) reduces legibility.
                  </Text> */}
                </Flex>
              </Box>
            </ScrollArea>
          </Card>
        </Box>
      </Box>
    </>
  );
}
