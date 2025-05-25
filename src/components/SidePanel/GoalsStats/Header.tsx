import styles from './Header.module.scss';

type HeaderProps = {
  calorieGoal?: number;
  consumedCalories?: number;
};

export default function Header({ calorieGoal, consumedCalories }: HeaderProps) {
  consumedCalories = 0;
  calorieGoal = 2500;

  return (
    <div className={styles.wrapper}>
      <img src="/pp.jpg" alt="" />
      <div className={styles.kcalGoal}>
        <h2>Metas nutricionais</h2>
        <p>
          <span className={styles.consumedCalories}>{consumedCalories}</span> de {calorieGoal} calorias
          🔥
        </p>
      </div>
    </div>
  );
}
