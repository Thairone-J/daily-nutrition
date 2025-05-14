'use client';
import { createContext, useContext, useState } from 'react';

type Meal = {
  id: string;
  title: string;
};

type MealsContextType = {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
};

const MealsContext = createContext<MealsContextType | undefined>(undefined);

export function MealsProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  const addMeal = (meal: Meal) => {
    setMeals((prev) => [...prev, meal]);
  };

  return <MealsContext.Provider value={{ meals, addMeal }}>{children}</MealsContext.Provider>;
}

export function useMeals() {
  const context = useContext(MealsContext);
  if (!context) throw new Error('useMeals deve estar dentro de <MealsProvider>');
  return context;
}
