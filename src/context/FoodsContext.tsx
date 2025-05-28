'use client';
import { createContext, useContext, ReactNode, useState } from 'react';
import { Food } from './MealsContext';
import allFoodsData from '@/context/staticFoods.json';

type FoodsContextType = {
  foods: Food[];
  selectedFood?: Food;
  setselectedFood: React.Dispatch<React.SetStateAction<Food | undefined>>;
};

const FoodsContext = createContext<FoodsContextType | undefined>(undefined);

export function FoodsProvider({ children }: { children: ReactNode }) {
  const [foods, setFoods] = useState<Food[]>(allFoodsData);
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
