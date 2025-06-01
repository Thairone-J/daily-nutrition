import styles from './UserNutritionalGoals.module.scss';
import ProgressBar from './ProgressBar';
import { getTodayDateFormated } from '@/utils/dateUtils';
import { useState } from 'react';

export default function UserNutritionalGoals(calorieGoal: Number, consumedCalories: Number) {
  const today = getTodayDateFormated();
  const [selectedDate, setSelectedDate] = useState<string>(today);
  return (
    <div className={styles.wrapper}>
      <div className={styles.dateSelect}>
        <input
          type="date"
          defaultValue={today}
          className={styles.dateInput}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            e.target.blur();
          }}
        />
      </div>
      <div className={styles.header}>
        <img src="/pp.jpg" alt="" />
        <div className={styles.kcalGoal}>
          <h2>Metas nutricionais</h2>
          <p>
            <span className={styles.consumedCalories}>{}</span> de {} calorias 🔥
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
