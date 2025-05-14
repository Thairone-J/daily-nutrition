import styles from './MealFood.module.scss';

export default function MealFood() {
  return (
    <div className={styles.wrapper}>
      <div>100g</div>
      <div className={styles.foodName}>Arroz branco</div>
      <div className={styles.stats}>
      254kcal
      </div>
    </div>
  );
}
