import styles from './ProgressBar.module.scss';

type ProgressBarProps = {
  label: string;
  value: number;
  goal: number;
  unit?: string;
};

export default function ProgressBar({ label, value, goal, unit = 'g' }: ProgressBarProps) {
  const percentage = Math.min((value / goal) * 100, 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.fill} style={{ width: `${percentage}%` }} />
      <div className={styles.label}>{label}</div>
      <div className={styles.goalText}>{`${value} / ${goal}${unit}`}</div>
    </div>
  );
}
