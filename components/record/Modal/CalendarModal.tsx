'use client';

import styles from './CalendarModal.module.css';
import { Box, Dialog, Flex, Inset, Tabs, Text } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useEventStore, useSelectedMonthStore, useSelectedYearStore, useTextareaStore } from '@/store/recordStore';
import { levelColor } from '@/utils/levelUtils';
import ModalInTabEdit from './ModalInTabEdit';
import { useEffect } from 'react';
import ModalInTabView from './ModalInTabView';

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

  // 모달 열리면 이벤트 감지 초기화
  useEffect(() => {
    setEventChange(false);
  }, [setEventChange]);

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Content maxWidth="640px" aria-describedby={undefined}>
        <Box className="modal_content">
          <Inset side="x">
            <Flex align="center" className="modal_header">
              <Flex justify="between" align="center">
                <Dialog.Title>
                  {selectedYear}.{selectedMonth}.{nowDate}
                </Dialog.Title>
                <Flex align="center" gap="10px" className="right">
                  <Text as="p" className={`${styles.level_rank} ${styles.record_color}`}>
                    {record_color}
                  </Text>
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
              <Box className={styles.tab_tit}>
                <Tabs.List>
                  <Tabs.Trigger value="view">그날의 기록</Tabs.Trigger>
                  {/* <Tabs.Trigger value="edit">편집하기</Tabs.Trigger> */}
                </Tabs.List>
              </Box>
              <Box pt="4" className={styles.tab_cont}>
                <Tabs.Content value="view">
                  <ModalInTabView record={record} />
                </Tabs.Content>
                <Tabs.Content value="edit">
                  <ModalInTabEdit record={record} onClose={onClose} />
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
