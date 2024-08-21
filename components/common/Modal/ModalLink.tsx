import { Text } from '@radix-ui/themes';
import styles from './ModalLink.module.css';
export default function ModalLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a className={styles.link} href={href} target="_blank">
      <Text as="span">{children}</Text>
    </a>
  );
}
