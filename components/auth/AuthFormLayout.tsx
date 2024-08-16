import { Box, Strong } from '@radix-ui/themes';
import styles from './AuthForm.module.css';

interface AuthFormLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthFormLayout({ title, children }: AuthFormLayoutProps) {
  return (
    <Box className="member_wrap">
      <div className={styles.title}>
        <Strong>{title}</Strong>
      </div>
      <Box mt="6" className="content" asChild>
        <section>{children}</section>
      </Box>
    </Box>
  );
}
