import styles from './SmallButton.module.css';

interface SmallButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function SmallButton({ children, onClick }: SmallButtonProps) {
  return (
    <button className={styles.btn_small} onClick={onClick}>
      {children}
    </button>
  );
}
