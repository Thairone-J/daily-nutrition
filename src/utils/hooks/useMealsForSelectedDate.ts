import { useMeals } from '@/context/MealsContext';
import { getDateParsed } from '@/utils/dateUtils';

export function useMealsForSelectedDate(selectedDate: string) {
  const { meals } = useMeals();
  const { date: selectedDateParsed } = getDateParsed(selectedDate);

  return meals.filter(
    (meal) => meal.createdAt && getDateParsed(meal.createdAt).date === selectedDateParsed
  );
}
