'use client';
import { useMeals } from '@/context/MealsContext';
import MealCard from '../MealCard/MealCard';
import styles from './MealsList.module.scss';
import MealFood from '../MealFood/MealFood';

export default function MealsList() {
  const { meals, addMeal } = useMeals();

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {meals.map((meal) => (
          <MealCard key={meal.id} mealId={meal.id} title={meal.title}>
            <MealFood />
          </MealCard>
        ))}
      </div>
    </div>
  );
}
