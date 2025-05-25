import styles from './FoodCard.module.scss';
import { Food } from '@/context/MealsContext';
import { useFoods } from '@/context/FoodsContext';
import { useState } from 'react';
import { useMeals } from '@/context/MealsContext';

type FoodCardProps = {
  food: Food;
};

export default function FoodCard({ food }: FoodCardProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isAddingToMeal, setIsAddingToMeal] = useState(false);
  const { meals } = useMeals();

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedTodayDate = `${year}-${formattedMonth}-${formattedDay}`;

  const { currentFood, setCurrentFood } = useFoods();

  const handleAnimationEnd = () => {
    setCurrentFood(undefined);
    setIsClosing(false);
    setIsAddingToMeal(false);
  };

  return (
    <div
      className={`${styles.foodCard} ${isClosing ? styles.isClosingAnimation : ''}`}
      onAnimationEnd={isClosing ? handleAnimationEnd : undefined}
    >
      <div className={styles.header}>
        <span onClick={() => setIsClosing(!isClosing)}>X</span>
        <h3 className={styles.foodName}>{food.name.toUpperCase()}</h3>
      </div>

      <div className={styles.nutrientTagsContainer}>
        <span>️‍🔥 {food.kcal}kcal</span>
        <span>Proteína: {food.protein}g</span>
        <span> Carboidrato: {food.carbohydrates}g</span>
        <span className={styles.lipid}>Gordura: {food.lipids}g</span>
      </div>

      <div className={styles.controls}>
        <input type="number" placeholder={food.quantity + 'g'} />
        {isAddingToMeal ? (
          <div className={styles.dateMealInputWrapper}>
            <input type="date" defaultValue={formattedTodayDate} className={styles.dateInput} />
            <select name="selectMeal" id="selectMeal">
              {meals.map((meal) => (
                <option key={meal.id}>{meal.title}</option>
              ))}
            </select>
          </div>
        ) : null}
        <button onClick={() => {setIsAddingToMeal(!isAddingToMeal)}}>Adicionar a uma refeição</button>
      </div>
    </div>
  );
}
