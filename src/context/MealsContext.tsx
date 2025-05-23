'use client';
import { createContext, useContext, useState } from 'react';

export type Food = {
  id: string;
  name: string;
  kcal: number;
  protein: number;
  lipids: number;
  carbohydrates: number;
  quantity: number;
};

type Meal = {
  id: string;
  title: string;
  foods: Food[];
};

type MealsContextType = {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  addFoodToMeal: (mealId: string, food: Food) => void;
  removeFoodFromMeal: (mealId: string, foodId: string) => void;
  updateMealTitle: (mealId: string, newTitle: string) => void;
  deleteMeal: (mealId: string) => void;
  updateFoodQuantity: (foodId: string, mealId: string, newQuantity: number) => void;
};

const MealsContext = createContext<MealsContextType | undefined>(undefined);

export function MealsProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  const addMeal = (meal: Meal) => {
    setMeals((prevMeals) => [...prevMeals, meal]);
  };

  const deleteMeal = (mealId: string) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
  };

  const addFoodToMeal = (mealId: string, food: Food) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === mealId ? { ...meal, foods: [...meal.foods, food] } : meal
      )
    );
  };

  const removeFoodFromMeal = (mealId: string, foodId: string) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) => {
        if (meal.id !== mealId) {
          return meal;
        }

        const updatedFoods = meal.foods.filter((food) => food.id !== foodId);

        return { ...meal, foods: updatedFoods };
      })
    );
  };

  const updateMealTitle = (mealId: string, newTitle: string) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) => (meal.id === mealId ? { ...meal, title: newTitle } : meal))
    );
  };

  const updateFoodQuantity = (mealId: string, foodId: string, newQuantity: number) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) => {
        if (meal.id !== mealId) {
          return meal;
        }

        const updatedFoods = meal.foods.map((food) =>
          food.id === foodId ? { ...food, quantity: newQuantity } : food
        );

        return { ...meal, foods: updatedFoods };
      })
    );
  };

  return (
    <MealsContext.Provider
      value={{
        meals,
        addMeal,
        addFoodToMeal,
        removeFoodFromMeal,
        updateMealTitle,
        deleteMeal,
        updateFoodQuantity,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(MealsContext);
  if (!context) throw new Error('useMeals deve estar dentro de <MealsProvider>');
  return context;
}
