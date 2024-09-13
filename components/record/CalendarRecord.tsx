import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './CalendarRecord.module.css';
import { levelColor } from '@/utils/levelUtils';
import { formatTime } from '@/utils/formatTimeUtils';
import useIsMobile from '@/hook/useIsMobile';
import CalendarModal from './Modal/CalendarModal';
import { useEffect, useState } from 'react';
import { useEventStore } from '@/store/recordStore';

export default function CalendarRecord({ nowDate, record }: { nowDate: number; record: IRecord }) {
  const record_color: string = levelColor(record.time);
  const isMobile = useIsMobile(840);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { eventChange } = useEventStore();

  const onClose = () => {
    // 모달내에서 이벤트가 일어났으면 닫기전에 확인
    if (eventChange) {
      const confirmClose = confirm('모달을 닫으시겠습니까? 변경 내용이 저장되지 않을 수 있습니다.');
      if (confirmClose) {
        setIsModalOpen(false);
      }
    } else {
      setIsModalOpen(false);
    }
  };
  const [animation, setAnimation] = useState('fade_out');
  const [hoverButton, setHoverButton] = useState(false);

  const toggleVisibility = () => {
    if (hoverButton) {
      setAnimation('fade_out');
      setTimeout(() => {
        setHoverButton(false);
      }, 250);
    } else {
      setHoverButton(true);
      setTimeout(() => {
        setAnimation('fade_in');
      }, 250);
    }
  };
  const content = (
    <Flex
      direction="column"
      gap="10px"
      justify="between"
      className={styles.record_box}
      onMouseEnter={toggleVisibility}
      onMouseLeave={toggleVisibility}
    >
      {hoverButton && (
        <Box className={`${styles.btn_open_modal} ${animation}`}>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <i>상세보기</i>
          </button>
        </Box>
      )}
      <Flex wrap="wrap" gap="5px" asChild>
        <ul
          className={`${styles.subject_list} ${styles[record_color]} ${record.subjects.length == 0 ? styles.blank : ''}`}
        >
          {record.subjects.length > 0 &&
            record.subjects.map((subject) => {
              return (
                <li key={`${nowDate}${subject.name}`}>
                  <Text as="p" size="2">
                    #{subject.name}
                  </Text>
                </li>
              );
            })}
        </ul>
      </Flex>

      <Text as="p" className={styles.total_time} size="5" weight="medium" align="center">
        {record.time > 0 && formatTime(record.time)}
      </Text>
    </Flex>
  );

  return (
    <>
      {!isMobile ? content : <div className={styles.mobile_record}>{content}</div>}
      {isModalOpen && <CalendarModal nowDate={nowDate} record={record} onClose={onClose} />}
    </>
  );
}
