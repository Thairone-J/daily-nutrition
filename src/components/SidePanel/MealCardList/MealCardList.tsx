'use client';
import MealCard from './MealCard/MealCard';
import styles from './MealCardList.module.scss';

import { useMealsForSelectedDate } from '@/utils/hooks/useMealsForSelectedDate';

type MealCardListProps = {
  selectedDate: string;
};

export default function MealsList({ selectedDate }: MealCardListProps) {
  const mealsForSelectedDate = useMealsForSelectedDate(selectedDate);

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {mealsForSelectedDate.map((meal) => (
          <MealCard key={meal.id} id={meal.id} foods={meal.foods} title={meal.title} />
        ))}
      </div>
    </div>
  );
}
