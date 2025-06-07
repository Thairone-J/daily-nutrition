'use client';

import styles from './SidePanel.module.scss';
import UserNutritionalGoals from './UserNutritionalGoals/UserNutrionalGoals';
import MealsList from './MealCardList/MealCardList';
import Button from '../UI/Button/Button';
import { useMeals } from '@/context/MealsContext';
import { getDateParsed } from '@/utils/dateUtils';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type SidePanelProps = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function SidePanel({
  selectedDate,
  setSelectedDate,
  setAlertMessage,
}: SidePanelProps) {
  const t = useTranslations();

  const { addMeal } = useMeals();

  const currentDateISO = new Date().toISOString();
  const currentDateObject = new Date(currentDateISO);

  const { date: selectedDateParsed } = getDateParsed(selectedDate);
  const { date: currentDateParsed } = getDateParsed(currentDateISO);

  const getMealTitleByTime = (hour: number): string => {
    if (hour < 0 || hour > 23) {
      return 'Refeição';
    }

    if (hour >= 6 && hour <= 11) {
      return 'Café da manhã';
    } else if (hour >= 12 && hour <= 15) {
      return 'Almoço';
    } else if (hour >= 16 && hour <= 18) {
      return 'Lanche da tarde';
    } else if (hour >= 19 && hour <= 21) {
      return 'Jantar';
    } else {
      return 'Refeição';
    }
  };

  const createNewMeal = (createdDate: string, title: string) => {
    return { id: crypto.randomUUID(), title: title, createdAt: createdDate, foods: [] };
  };

  const handleAddMealClick = () => {
    const currentHour = currentDateObject.getHours();
    const mealTitle = getMealTitleByTime(currentHour) ?? 'Refeição';

    if (selectedDateParsed === currentDateParsed) {
      addMeal(createNewMeal(currentDateISO, mealTitle));
    } else {
      const previousDateIso = new Date(`${selectedDateParsed}T12:00:00`).toISOString();
      addMeal(createNewMeal(previousDateIso, mealTitle));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.userNutritionalGoalsSection}>
        <UserNutritionalGoals
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setAlertMessage={setAlertMessage}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button variant="outline" onClick={handleAddMealClick}>
          {t('dashboard.createMeal')}
        </Button>
      </div>

      <div className={styles.mealsListSection}>
        <MealsList selectedDate={selectedDate} />
      </div>
    </div>
  );
}
