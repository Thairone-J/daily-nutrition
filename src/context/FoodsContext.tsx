'use client';
import { createContext, useContext, ReactNode, useState } from 'react';
import { Food } from './MealsContext';
import allFoodsData from '@/context/staticFoods.json';

type FoodsContextType = {
  foods: Food[];
  currentFood?: Food;
  setCurrentFood: React.Dispatch<React.SetStateAction<Food | undefined>>;
};

const FoodsContext = createContext<FoodsContextType | undefined>(undefined);

export function FoodsProvider({ children }: { children: ReactNode }) {
  const [foods, setFoods] = useState<Food[]>(allFoodsData);
  const [currentFood, setCurrentFood] = useState<Food>();

  return (
    <FoodsContext.Provider value={{ foods, currentFood, setCurrentFood }}>
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
