import { Food } from '@/@types/global';
import { Meal } from '@/context/MealsContext';
import prisma from '@/lib/prisma';

export async function getFoods(): Promise<Food[]> {
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

export async function getMeals(userId:string): Promise<Meal[]> {
  try {
    const meals = await prisma.meal.findMany({
      where: {
        userId: userId,
      },
    });

    return meals as Meal[];
  } catch (error) {
    console.error('Erro ao buscar refeições no banco de dados:', error);
  }

  return [];
}
