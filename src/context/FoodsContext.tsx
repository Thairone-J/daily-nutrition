'use client';
import { createContext, useContext, ReactNode, useState } from 'react';
import { Food } from './MealsContext';
import foodsNutrientsPer100g from '@/context/staticFoods.json';

type FoodsContextType = {
  foods: Food[];
  selectedFood?: Food;
  setselectedFood: React.Dispatch<React.SetStateAction<Food | undefined>>;
};

const FoodsContext = createContext<FoodsContextType | undefined>(undefined);

export function FoodsProvider({ children }: { children: ReactNode }) {
  const foodsNutrientsPerGram = foodsNutrientsPer100g.map((food) => {
    return {
      ...food,
      quantity: 1,
      kcal: food.kcal / 100,
      carbohydrates: food.carbohydrates / 100,
      protein: food.protein / 100,
      lipids: food.lipids / 100,
    };
  });

  const [foods, setFoods] = useState<Food[]>(foodsNutrientsPerGram);
  const [selectedFood, setselectedFood] = useState<Food>();

  return (
    <FoodsContext.Provider value={{ foods, selectedFood, setselectedFood }}>
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);
  if (context === undefined) {
    throw new Error('useFoods deve ser usado dentro de um FoodsProvider');
  }
  return context;
}
