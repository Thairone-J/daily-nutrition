'use client';

import styles from './SidePanel.module.scss';
import Header from './GoalsStats/Header';
import GoalsStats from './GoalsStats/GoalsStats';
import MealsList from '../MealsList/MealsList';
import Button from '../UI/Button/Button';
import { useMeals } from '@/context/MealsContext';
import { title } from 'process';

export default function SidePanel() {
  const { meals, addMeal } = useMeals();

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
              title: 'new meal',
              foods: [],
            };
            addMeal(newMeal);
          }}
        >
          Adicionar refeição
        </Button>
      </div>

      <div className={styles.mealsWrapper}>
        <MealsList />
      </div>
    </div>
  );
}
