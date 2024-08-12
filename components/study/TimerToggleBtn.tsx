import { Root } from '@radix-ui/react-toggle';
import styles from './Timer.module.css';

interface ITimerToggleBtn {
  isActive: boolean;
  onToggle: () => void;
}

export default function TimerToggleBtn({ isActive, onToggle }: ITimerToggleBtn) {
  return (
    <Root
      pressed={isActive}
      onPressedChange={onToggle}
      className={`${styles.toggle_button} ${isActive && styles.active}`}
    >
      {isActive ? '정지' : '시작!'}
    </Root>
  );
}
