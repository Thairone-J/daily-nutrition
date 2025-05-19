'use client';
import { createContext, useContext, ReactNode, useState } from 'react';
import { Food } from './MealsContext';
import allFoodsData from '@/context/staticFoods.json';

type FoodsContextType = {
  foods: Food[];
};

const FoodsContext = createContext<FoodsContextType | undefined>(undefined);

export function FoodsProvider({ children }: { children: ReactNode }) {
  const [foods, setFoods] = useState<Food[]>(allFoodsData);

  return <FoodsContext.Provider value={{ foods }}>{children}</FoodsContext.Provider>;
}

export function useFoods() {
  const context = useContext(FoodsContext);
  if (context === undefined) {
    throw new Error('useFoods deve ser usado dentro de um FoodsProvider');
  }
  return context;
}
