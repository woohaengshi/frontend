import { Flex, Text } from '@radix-ui/themes';
import styles from './CalendarRecord.module.css';

export default function CalendarRecord({ nowDate, record }) {
  return (
    <Flex direction="column" gap="10px" justify="between" className={styles.record_box}>
      <Flex wrap="wrap" gap="5px" asChild>
        <ul className={styles.subject_list}>
          {record.subjects.map((subject) => {
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
        {record.time}
      </Text>
    </Flex>
  );
}
