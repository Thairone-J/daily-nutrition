import styles from './FoodCard.module.scss';
import { Food } from '@/context/MealsContext';
import { useFoods } from '@/context/FoodsContext';
import { useState } from 'react';
import { useMeals } from '@/context/MealsContext';
import { Meal } from '@/context/MealsContext';

type FoodCardProps = {
  food: Food;
};

export default function FoodCard({ food }: FoodCardProps) {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [isClosing, setIsClosing] = useState(false);
  const [isAddingToMeal, setIsAddingToMeal] = useState(false);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [foodQuantity, setFoodQuantity] = useState(0);
  const [hasQuantity, setHasQuantity] = useState<boolean | 'initial'>('initial');

  const { meals, addFoodToMeal } = useMeals();
  const { setselectedFood } = useFoods();

  const foodFirstName = food.name.split(',', 1);

  const handleClosingAnimationEnd = () => {
    setIsClosing(false);
    setIsAddingToMeal(false);
    setselectedFood(undefined);
  };

  const handleAddFoodToMeal = () => {
    if (foodQuantity == 0) {
      setHasQuantity(false);
    } else {
      if (!meal) {
        alert('Choose a meal');
      } else {
        addFoodToMeal(meal.id, { ...food, id: crypto.randomUUID(), quantity: foodQuantity });
      }
    }
  };

  const handleSelectMeal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMeal = meals.find((meal) => meal.id === event.target.value);

    selectedMeal && setMeal(selectedMeal);
  };

  const handleSelectDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div
      className={`${styles.foodCard} ${isClosing ? styles.isClosingAnimation : ''}`}
      onAnimationEnd={isClosing ? handleClosingAnimationEnd : undefined}
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
        <input
          type="number"
          placeholder={food.quantity + 'g'}
          onChange={(event) => {
            const quantityInputValue = Number(event.target.value);

            if (quantityInputValue.toString() === '') {
              isAddingToMeal ? setIsAddingToMeal(false) : null;
              setFoodQuantity(0);
            } else {
              setFoodQuantity(quantityInputValue);
              setIsAddingToMeal(true);
            }
          }}
          className={hasQuantity ? undefined : styles.missingQuantityShakeAnimation}
          onAnimationEnd={() => setHasQuantity('initial')}
        />
        {isAddingToMeal ? (
          <div className={styles.dateMealInputWrapper}>
            <input
              type="date"
              defaultValue={today}
              className={styles.dateInput}
              onChange={(e) => {
                handleSelectDate(e);
                e.target.blur();
              }}
            />
            <select
              name="selectMeal"
              id="selectMeal"
              onChange={handleSelectMeal}
              defaultValue={'default'}
            >
              <option value="default" disabled hidden>
                Escolher refeição
              </option>
              {meals.filter((meal) => meal.createdAt === selectedDate).length > 0 ? (
                meals
                  .filter((meal) => meal.createdAt === selectedDate)
                  .map((meal) => (
                    <option key={meal.id} value={meal.id}>
                      {meal.title}
                    </option>
                  ))
              ) : (
                <option value="none" disabled>
                  Nenhuma refeição registrada
                </option>
              )}
            </select>
          </div>
        ) : null}
        <button
          onClick={() => {
            handleAddFoodToMeal();
          }}
        >
          {!isAddingToMeal
            ? `Adicionar ${foodFirstName} a uma refeição`
            : `Adicionar ${foodFirstName} a ${meal?.title || 'uma refeição'}`}
        </button>
      </div>
    </div>
  );
}
