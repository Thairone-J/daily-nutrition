'use client';

import styles from './SidePanel.module.scss';
import UserNutritionalGoals from './UserNutritionalGoals/UserNutrionalGoals';
import MealsList from './MealCardList/MealCardList';
import Button from '../UI/Button/Button';
import { useMeals } from '@/context/MealsContext';
import { getDateParsed } from '@/utils/dateUtils';
import { useState } from 'react';

export default function SidePanel() {
  const { addMeal } = useMeals();

  const currentDateISO = new Date().toISOString();

  const [selectedDate, setSelectedDate] = useState(currentDateISO);

  const { date: selectedDateParsed } = getDateParsed(selectedDate);
  const { date: currentDateParsed } = getDateParsed(currentDateISO);

  const createNewMeal = (createdDate: string) => {
    return { id: crypto.randomUUID(), createdAt: createdDate, foods: [] };
  };

  const handleAddMealClick = () => {
    if (selectedDateParsed === currentDateParsed) {
      addMeal(createNewMeal(currentDateISO));
    } else {
      const previousDateIso = new Date(`${selectedDateParsed}T12:00:00`).toISOString();
      addMeal(createNewMeal(previousDateIso));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.userNutritionalGoalsSection}>
        <UserNutritionalGoals selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className={styles.buttonWrapper}>
        <Button variant="outline" onClick={handleAddMealClick}>
          Criar refeição
        </Button>
      </div>

      <div className={styles.mealsListSection}>
        <MealsList selectedDate={selectedDate} />
      </div>
    </div>
  );
}
