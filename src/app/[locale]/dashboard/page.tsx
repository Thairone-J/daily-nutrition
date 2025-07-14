import { Food } from '@/@types/global';
import prisma from '@/lib/prisma';
import DashboardClient from './DashboardClient';

async function getFoods(): Promise<Food[]> {
  try {
    const foods = await prisma.food.findMany();
    return foods.map((food) => ({
      ...food,
      kcal: food.kcal / 100,
      protein: food.protein / 100,
      carbohydrates: food.carbohydrates / 100,
      lipids: food.lipids / 100,
      baseQuantity: food.baseQuantity / 100,
    })) as Food[];
  } catch (error) {
    console.error('Erro ao buscar alimentos do banco de dados:', error);

    return [];
  }
}

export default async function DashboardPage() {
  const foods = await getFoods();

  return <DashboardClient foods={foods} />;
}
