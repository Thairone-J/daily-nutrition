import styles from './SidePanel.module.scss';
import Header from './Header';
import GoalsStats from './GoalsStats';

export default function SidePanel() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.goalsWrapper}>
        <Header />
        <GoalsStats />
      </div>
      <div className={styles.mealsWrapper}>
        {Array.from({ length: 1000 }).map((_, index) => (
          <p key={index}>teste {index}</p>
        ))}
      </div>
    </div>
  );
}
