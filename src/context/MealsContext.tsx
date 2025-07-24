'use client';
import { createContext, useContext, useState } from 'react';
import { Food } from '@/@types/global';
import { createMealAction } from '@/lib/actions';

export type Meal = {
  id: string;
  title?: string;
  foods: Food[] | null;
  createdAt?: string;
};

type MealsContextType = {
  meals: Meal[];
  createMeal: (title: string, previousDateIso?: string) => Promise<void>;
  deleteMeal: (mealId: string) => void;
  updateMealTitle: (mealId: string, newTitle: string) => void;
  addFoodToMeal: (mealId: string, food: Food) => void;
  removeFoodFromMeal: (mealId: string, foodId: string) => void;
  updateFood: (mealId: string, food: Food) => void;
};

const MealsContext = createContext<MealsContextType | undefined>(undefined);

export function MealsProvider({ children }: { children: React.ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  const createMeal = async (title: string, previousDateIso?: string) => {
    try {
      const result = await createMealAction(title, previousDateIso);

      if (result.success && result.data) {
        const newMeal: Meal = {
          id: result.data.id,
          title: result.data.title || '',
          foods: [],
          createdAt: result.data.createdAt?.toISOString(),
        };
        setMeals((prevMeals) => [...prevMeals, newMeal]);
      } else {
        throw new Error(result.error || 'Erro desconhecido ao criar refeição');
      }
    } catch (error) {
      console.error('Erro ao criar refeição:', error);
      throw error; // Propaga o erro para ser tratado no componente
    }
  };
  const deleteMeal = (mealId: string) => {
    setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== mealId));
  };

  const updateMealTitle = (mealId: string, newTitle: string) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) => (meal.id === mealId ? { ...meal, title: newTitle } : meal))
    );
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
        createMeal,
        deleteMeal,
        updateMealTitle,
        addFoodToMeal,
        removeFoodFromMeal,
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
