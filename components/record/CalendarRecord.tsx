import { Box, Flex, Text } from '@radix-ui/themes';
import styles from './CalendarRecord.module.css';
import { levelColor } from '@/utils/levelUtils';
import { formatTime } from '@/utils/formatTimeUtils';
import CalendarModal from './Modal/CalendarModal';
import { useState } from 'react';

export default function CalendarRecord({ record }: { record: IRecord }) {
  const record_color: string = levelColor(record.time);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const [hoverButton, setHoverButton] = useState(false);

  return (
    <>
      <Flex
        direction="column"
        gap="10px"
        justify="between"
        className={styles.record_box}
        onMouseEnter={() => {
          setHoverButton(true);
        }}
        onMouseLeave={() => {
          setHoverButton(false);
        }}
      >
        {hoverButton && (
          <Box className={`${styles.btn_open_modal}`}>
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
            className={`${styles.subject_list} subject_list ${record_color} ${record.subjects.length == 0 ? styles.blank : ''}`}
          >
            {record.subjects.length > 0 &&
              record.subjects.map((subject, i) => {
                return (
                  <li key={`${subject.name}${i}`}>
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
      {isModalOpen && <CalendarModal record={record} onClose={onClose} />}
    </>
  );
}
