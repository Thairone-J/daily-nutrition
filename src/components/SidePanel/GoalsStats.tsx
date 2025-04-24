import styles from './GoalsStats.module.scss';
import ProgressBar from './ProgressBar';

export default function GoalsStats() {
  return (
    <div className={styles.wrapper}>
      <ProgressBar label="Carboidratos" value={250} goal={250} />
      <ProgressBar label="Proteínas" value={100} goal={250} />
      <ProgressBar label="Gorduras" value={100} goal={250} />
    </div>
  );
}
