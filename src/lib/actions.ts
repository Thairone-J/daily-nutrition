'use server';

import { getServerSession } from 'next-auth';
import prisma from './prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

export async function createMealAction(title: string, previousDateIso?: string) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return { 
        success: false, 
        error: 'Usuário não autenticado' 
      };
    }

    const newMeal = await prisma.meal.create({
      data: {
        title,
        createdAt: previousDateIso ? new Date(previousDateIso) : new Date(),
        userId: session.user.id
      },
    });

    revalidatePath('/dashboard');
    
    return { 
      success: true, 
      data: newMeal 
    };
  } catch (error) {
    console.error('Erro prisma ao criar refeição:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Falha ao criar refeição' 
    };
  }
}