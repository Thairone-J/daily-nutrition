import styles from './UserNutritionalGoals.module.scss';
import ProgressBar from './ProgressBar';
type HeaderProps = {
  calorieGoal?: number;
  consumedCalories?: number;
};

export default function UserNutritionalGoals({ calorieGoal, consumedCalories }: HeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src="/pp.jpg" alt="" />
        <div className={styles.kcalGoal}>
          <h2>Metas nutricionais</h2>
          <p>
            <span className={styles.consumedCalories}>{consumedCalories}</span> de {calorieGoal}{' '}
            calorias 🔥
          </p>
        </div>

        
      </div>
      <div className={styles.goalsProgress}>
          <ProgressBar label="Carboidratos" value={250} goal={250} />
          <ProgressBar label="Proteínas" value={100} goal={250} />
          <ProgressBar label="Gorduras" value={100} goal={250} />
        </div>
    </div>
  );
}
