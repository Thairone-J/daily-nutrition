'use client';
import { useMeals } from '@/context/MealsContext';
import MealCard from '../MealCard/MealCard';
import styles from './MealCardList.module.scss';



export default function MealsList() {
  const { meals, addMeal } = useMeals();

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {meals.map((meal) => (
          <MealCard key={meal.id} {...meal}/>
           
    
        
        ))}
      </div>
    </div>
  );
}
