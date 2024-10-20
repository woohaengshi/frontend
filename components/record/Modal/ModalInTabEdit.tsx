'use client';

import { useEventStore, useTextareaStore } from '@/stores/recordStore';
import { Box, Card, Flex, Strong, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import styles from './ModalInTab.module.css';
import { levelColor } from '@/utils/levelUtils';
import CommonButton from '@/components/common/CommonButton';

export default function ModalInTabEdit({ record, onClose }: { record: IRecord; onClose: () => void }) {
  const record_color: string = levelColor(record.time);

  const [changed, setChanged] = useState(false);
  // 기록 입력시 이벤트 감지
  const { setEventChange } = useEventStore();
  // 탭 이동시에도 회고 value 유지
  const { textValue, setTextValue } = useTextareaStore();

  useEffect(() => {
    setTextValue('');
  }, []);

  return (
    <form>
      {record.subjects.length > 0 && (
        <>
          <Box mb="5" className={styles.box}>
            <Box className={`${styles.title} title`}>
              <Strong>기록할 과목들</Strong>
            </Box>
            <Box mt="3" className={styles.content}>
              <Flex wrap="wrap" gap="15px" asChild>
                <ul className={`${styles.subject_list} subject_list ${styles.btn_minus} ${record_color}`}>
                  {record.subjects.map((subject) => {
                    return (
                      <li key={`editSubjectList${subject.name}`}>
                        <button>{subject.name}</button>
                      </li>
                    );
                  })}
                </ul>
              </Flex>
            </Box>
          </Box>
          <Box mb="5" className={styles.box}>
            <Box className={`${styles.title} title`}>
              <Strong>전체 과목 목록</Strong>
            </Box>
            <Box mt="3" className={styles.content}>
              <Flex wrap="wrap" gap="15px" asChild>
                <ul className={`${styles.subject_list} subject_list ${styles.btn_plus} ${record_color}`}>
                  {record.subjects.map((subject) => {
                    return (
                      <li key={`totalSubjectList${subject.name}`}>
                        <button>{subject.name}</button>
                      </li>
                    );
                  })}
                </ul>
              </Flex>
            </Box>
          </Box>
        </>
      )}
      <Box className={styles.box}>
        <Box className={`${styles.title} title`}>
          <Strong>회고 수정/기록</Strong>
        </Box>
        <Box mt="3" className={styles.content}>
          <Card className={styles.textarea}>
            <textarea
              placeholder="회고를 입력해주세요!"
              onChange={(e) => {
                if (!changed) {
                  setChanged(true);
                  setEventChange(true);
                }
                setTextValue(e.target.value);
              }}
              defaultValue={textValue}
            ></textarea>
          </Card>
        </Box>
      </Box>
      <Flex mt="5" justify="center" align="center" gap="20px" className={styles.btn_box}>
        <CommonButton type="submit" style="dark_purple">
          저장
        </CommonButton>
      </Flex>
    </form>
  );
}
