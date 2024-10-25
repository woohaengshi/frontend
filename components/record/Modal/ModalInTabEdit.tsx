'use client';

import {
  useSelectedMonthStore,
  useSelectedYearStore,
  useCommentStore,
  useAddedSubjectStore,
  useDeletedSubjectStore,
  useFullSubjectStore,
} from '@/stores/recordStore';
import { Box, Card, Flex, Strong } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import styles from './ModalInTab.module.css';
import { levelColor } from '@/utils/levelUtils';
import CommonButton from '@/components/common/CommonButton';
import { Subject } from '@/types/studyType';
import { patchStudyRecord } from '@/apis/recordApi';

export default function ModalInTabEdit({ record }: { record: IRecord; onClose: () => void }) {
  const record_color: string = levelColor(record.time);

  // 탭 이동시에도 회고 value 유지
  const { comment, setComment } = useCommentStore();

  const { selectedYear } = useSelectedYearStore();
  const { selectedMonth } = useSelectedMonthStore();
  const { fullSubject } = useFullSubjectStore();

  const recordDate = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${record.day}`;

  const [recordSubject, setRecordSubject] = useState<Subject[]>(record.subjects);
  const [leftSubject, setLeftSubject] = useState<Subject[]>([]);

  useEffect(() => {
    setComment(record.comment || '');
  }, [record.comment, setComment]);

  useEffect(() => {
    // 오늘 과목 id
    const todaySubject = record.subjects.map((subject) => subject.id);

    // fullSubjects에서 필터링
    const filteredSubject = fullSubject.filter((subject) => !todaySubject.includes(subject.id));

    setLeftSubject(filteredSubject);
  }, [fullSubject, record]);

  // 추가할 과목
  const { addedSubject, setAddedSubject } = useAddedSubjectStore();

  // 삭제할 과목
  const { deletedSubject, setDeletedSubject } = useDeletedSubjectStore();

  const recordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recordUpdateResponse = await patchStudyRecord(recordDate, addedSubject, deletedSubject, comment);

    if (recordUpdateResponse?.error) {
      alert(recordUpdateResponse.error.message);
    } else {
      window.location.reload();
    }
  };

  // 기록할 과목 -> 전체 과목
  const removeSubjectToLeft = (subject: Subject) => {
    if (recordSubject.length > 1) {
      setLeftSubject((prev) => [...prev, subject]);
      setRecordSubject((prev) => prev.filter((s) => s.id !== subject.id));
    } else {
      alert('최소 하나의 과목은 기록해야 합니다.');
    }
  };

  // 전체 과목 -> 기록할 과목
  const addSubjectToRecord = (subject: Subject) => {
    setRecordSubject((prev) => [...prev, subject]);
    setLeftSubject((prev) => prev.filter((s) => s.id !== subject.id));
  };

  // 추가/삭제 과목 업데이트
  useEffect(() => {
    const deleted = record.subjects
      .filter((subject) => !recordSubject.some((s) => s.id == subject.id))
      .map((subject) => subject.id);

    const added = recordSubject
      .filter((subject) => !record.subjects.some((s) => s.id == subject.id))
      .map((subject) => subject.id);

    setDeletedSubject(deleted);
    setAddedSubject(added);
  }, [record.subjects, recordSubject, setAddedSubject, setDeletedSubject]);

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
                  {recordSubject.map((subject) => {
                    return (
                      <li key={`editSubjectList${subject.name}`}>
                        <button type="button" onClick={() => removeSubjectToLeft(subject)}>
                          {subject.name}
                        </button>
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
                  {leftSubject.map((subject) => {
                    return (
                      <li key={`totalSubjectList${subject.name}`}>
                        <button
                          type="button"
                          onClick={() => {
                            addSubjectToRecord(subject);
                          }}
                        >
                          {subject.name}
                        </button>
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
                setComment(e.target.value);
              }}
              defaultValue={record.comment || ''}
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
