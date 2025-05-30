'use client';
import { createContext, useContext, useState } from 'react';

export type Food = {
  id: string;
  name: string;
  quantity: number;
  kcal: number;
  protein: number;
  carbohydrates: number;
  lipids: number;
};

export type Meal = {
  id: string;
  title?: string;
  foods: Food[];
  createdAt?: string;
};

type MealsContextType = {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  addFoodToMeal: (mealId: string, food: Food) => void;
  removeFoodFromMeal: (mealId: string, foodId: string) => void;
  updateMealTitle: (mealId: string, newTitle: string) => void;
  deleteMeal: (mealId: string) => void;
  updateFood: (mealId: string, food: Food) => void;
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
  const updateFood = (mealId: string, food: Food) => {
    setMeals((prevMeals) => {
      const mealToUpdate = prevMeals.find((meal) => meal.id === mealId);

      if (!mealToUpdate) {
        return prevMeals;
      }

      const updatedFoods = mealToUpdate.foods.map((f) => {
        if (f.id !== food.id) {
          return f;
        }
        return { ...f, ...food };
      });

      return prevMeals.map((meal) =>
        meal.id === mealId ? { ...meal, foods: updatedFoods } : meal
      );
    });
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
        updateFood,
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
