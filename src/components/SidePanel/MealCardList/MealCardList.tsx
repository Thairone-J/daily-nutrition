'use client';
import { useMeals } from '@/context/MealsContext';
import MealCard from './MealCard/MealCard';
import styles from './MealCardList.module.scss';

export default function MealsList() {
  const { meals } = useMeals();

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {meals.map((meal) => (
          <MealCard key={meal.id} id={meal.id} foods={meal.foods} title={meal.title} />
        ))}
      </div>
    </div>
  );
}
