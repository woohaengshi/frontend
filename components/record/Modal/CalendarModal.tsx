'use client';

import styles from './CalendarModal.module.css';
import { Box, Card, Dialog, Flex, Inset, ScrollArea, Strong, Tabs, Text } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useEventStore, useSelectedMonthStore, useSelectedYearStore, useTextareaStore } from '@/store/recordStore';
import { levelColor } from '@/utils/levelUtils';
import ModalInTabEdit from './ModalInTabEdit';
import { useEffect } from 'react';
import { formatTime } from '@/utils/formatTimeUtils';

export default function CalendarModal({
  nowDate,
  record,
  onClose,
}: {
  nowDate: number;
  record: IRecord;
  onClose: () => void;
}) {
  const record_color: string = levelColor(record.time);

  const { selectedYear } = useSelectedYearStore();
  const { selectedMonth } = useSelectedMonthStore();
  const { setEventChange } = useEventStore();

  const { textValue, setTextValue } = useTextareaStore();

  // 모달 열리면 이벤트 감지 초기화
  useEffect(() => {
    setEventChange(false);
  }, [setEventChange]);

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Content maxWidth="640px" height="600px" aria-describedby={undefined}>
        <Box className="modal_content">
          <Inset side="x">
            <Flex align="center" className="modal_header">
              <Flex justify="between" align="center">
                <Dialog.Title>
                  {selectedYear}.{selectedMonth}.{nowDate}
                </Dialog.Title>
                <Flex align="center" gap="10px" className="right">
                  <Dialog.Close>
                    <button className="btn_close">
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Flex>
              </Flex>
            </Flex>
          </Inset>
          <Box py="5" className={`${styles.modal_body} modal_body`}>
            <Tabs.Root defaultValue="view">
              <Tabs.List>
                <Tabs.Trigger value="view">그날의 기록</Tabs.Trigger>
                <Tabs.Trigger value="edit">편집하기</Tabs.Trigger>
              </Tabs.List>
              <Box pt="3">
                <Tabs.Content value="view">
                  <Box className={styles.tab_box}>
                    <Box className="title">
                      <Strong>시간</Strong>
                    </Box>
                    <Box className={styles.content}>
                      <Text as="p" className={styles.total_time} size="5" weight="bold">
                        {record.time > 0 && formatTime(record.time)}
                      </Text>
                    </Box>
                  </Box>
                  <Box className={styles.tab_box}>
                    <Box className="title">
                      <Strong>과목</Strong>
                    </Box>
                    <Box className={styles.content}>
                      <Flex wrap="wrap" gap="5px" asChild>
                        <ul className={`${styles.subject_list} ${styles[record_color]}`}>
                          {record.subjects.length > 0 &&
                            record.subjects.map((subject) => {
                              return (
                                <li key={`${nowDate}${subject.name}`}>
                                  <Text as="p" size="2">
                                    {subject.name}
                                  </Text>
                                </li>
                              );
                            })}
                        </ul>
                      </Flex>
                    </Box>
                  </Box>
                  <Box className={styles.tab_box}>
                    <Box className="title">
                      <Strong>회고</Strong>
                    </Box>
                    <Box className={styles.content}>
                      <Card>
                        <ScrollArea type="always" scrollbars="vertical" style={{ height: 180 }}>
                          <Box p="2" pr="8">
                            <Flex direction="column" gap="4">
                              <Text as="p">
                                Three fundamental aspects of typography are legibility, readability, and aesthetics.
                                Although in a non-technical sense “legible” and “readable” are often used synonymously,
                                typographically they are separate but related concepts.
                              </Text>

                              <Text as="p">
                                Legibility describes how easily individual characters can be distinguished from one
                                another. It is described by Walter Tracy as “the quality of being decipherable and
                                recognisable”. For instance, if a “b” and an “h”, or a “3” and an “8”, are difficult to
                                distinguish at small sizes, this is a problem of legibility.
                              </Text>

                              <Text as="p">
                                Typographers are concerned with legibility insofar as it is their job to select the
                                correct font to use. Brush Script is an example of a font containing many characters
                                that might be difficult to distinguish. The selection of cases influences the legibility
                                of typography because using only uppercase letters (all-caps) reduces legibility.
                              </Text>
                            </Flex>
                          </Box>
                        </ScrollArea>
                      </Card>
                    </Box>
                  </Box>
                </Tabs.Content>
                <Tabs.Content value="edit">
                  <ModalInTabEdit />
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
