'use client';

import styles from './SidePanel.module.scss';
import Header from './GoalsStats/Header';
import GoalsStats from './GoalsStats/GoalsStats';
import MealsList from '../MealCardList/MealCardList';
import Button from '../UI/Button/Button';
import { useMeals } from '@/context/MealsContext';
import { getTodayDateFormated } from '@/utils/dateUtils';

export default function SidePanel() {
  const { addMeal } = useMeals();

  const today = getTodayDateFormated();

  return (
    <div className={styles.wrapper}>
      <div className={styles.goalsWrapper}>
        <Header />
        <GoalsStats />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          variant="outline"
          onClick={() => {
            const newMeal = {
              id: crypto.randomUUID(),
              createdAt: today,
              foods: [],
            };
            addMeal(newMeal);
          }}
        >
          Criar refeição
        </Button>
      </div>

      <div className={styles.mealsWrapper}>
        <MealsList />
      </div>
    </div>
  );
}
