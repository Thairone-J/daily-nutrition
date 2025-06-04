'use client';
import { useMeals } from '@/context/MealsContext';
import MealCard from './MealCard/MealCard';
import styles from './MealCardList.module.scss';
import { getDateParsed } from '@/utils/dateUtils';

type MealCardListProps = {
  selectedDate: string;
};

export default function MealsList({ selectedDate }: MealCardListProps) {
  const { meals } = useMeals();

  const { date: selectedDateParsed } = getDateParsed(selectedDate);

  const mealsForSelectedDate = meals.filter(
    (meal) => meal.createdAt && getDateParsed(meal.createdAt).date === selectedDateParsed
  );

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
