'use client';

import {
  useEventStore,
  useSelectedMonthStore,
  useSelectedYearStore,
  useCommentStore,
  useAddedSubjectStore,
  useDeletedSubjectStore,
} from '@/store/recordStore';
import { Box, Card, Flex, Strong } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import styles from './ModalInTab.module.css';
import { levelColor } from '@/utils/levelUtils';
import CommonButton from '@/components/common/CommonButton';

export default function ModalInTabEdit({ record }: { record: IRecord }) {
  const record_color: string = levelColor(record.time);

  const [changed, setChanged] = useState(false);
  // 기록 입력시 이벤트 감지
  const { setEventChange } = useEventStore();
  // 탭 이동시에도 회고 value 유지
  const { comment, setComment } = useCommentStore();

  const { selectedYear } = useSelectedYearStore();
  const { selectedMonth } = useSelectedMonthStore();
  const recordDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${record.day}`;

  useEffect(() => {
    setComment('');
  }, []);

  // 오늘 과목
  const todaySubject = record.subjects.map((subject) => subject.id);
  console.log(todaySubject);

  // 추가할 과목
  const { addedSubject, setAddedSubject } = useAddedSubjectStore();

  // 삭제할 과목
  const { deletedSubject, setDeletedSubject } = useDeletedSubjectStore();

  const recordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <form onSubmit={recordSubmit}>
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
                setComment(e.target.value);
              }}
              defaultValue={comment}
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
