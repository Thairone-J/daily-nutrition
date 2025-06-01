import styles from './FoodCard.module.scss';
import { useMeals, Meal } from '@/context/MealsContext';
import { useFoods, Food } from '@/context/FoodsContext';
import { useState } from 'react';
import { getTodayDateFormated } from '@/utils/dateUtils';

type FoodCardProps = {
  food: Food;
};

export default function FoodCard({ food }: FoodCardProps) {
  const today = getTodayDateFormated();

  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [isClosing, setIsClosing] = useState(false);
  const [isAddingToMeal, setIsAddingToMeal] = useState(false);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [inputFoodQuantity, setInputFoodQuantity] = useState(0);
  const [hasQuantity, setHasQuantity] = useState<boolean | 'initial'>('initial');

  const { meals, addFoodToMeal } = useMeals();
  const { setselectedFood } = useFoods();

  const foodFirstName = food.name.split(',', 1);

  const handleAddFoodToMeal = () => {
    if (inputFoodQuantity === 0) {
      setHasQuantity(false);
    } else {
      if (!meal) {
        alert('Choose a meal');
      } else {
        const updatedFood = {
          id: crypto.randomUUID(),
          name: food.name,
          quantity: inputFoodQuantity,
          // Recalculates nutrients proportionally to the new quantity.
          kcal: food.kcal * inputFoodQuantity,
          protein: food.protein * inputFoodQuantity,
          carbohydrates: food.carbohydrates * inputFoodQuantity,
          lipids: food.lipids * inputFoodQuantity,
        };

        addFoodToMeal(meal.id, updatedFood);
      }
    }
  };

  const handleSelectMeal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMeal = meals.find((m) => m.id === event.target.value);
    if (selectedMeal) {
      setMeal(selectedMeal);
    }
  };

  const handleClosingCardAnimationEnd = () => {
    setIsClosing(false);
    setIsAddingToMeal(false);
    setselectedFood(undefined);
  };

  return (
    <div
      className={`${styles.foodCard} ${isClosing ? styles.isClosingAnimation : ''}`}
      onAnimationEnd={isClosing ? handleClosingCardAnimationEnd : undefined}
    >
      <div className={styles.header}>
        <span onClick={() => setIsClosing(!isClosing)}>X</span>
        <h3 className={styles.foodName}>{food.name.toUpperCase()}</h3>
      </div>

      <div className={styles.nutrientTagsContainer}>
        <span>
          ️‍🔥
          {inputFoodQuantity > 0
            ? Number((food.kcal * inputFoodQuantity).toFixed(2))
            : Number((food.kcal * 100).toFixed(2))}
          kcal
        </span>
        <span>
          Proteína:
          {inputFoodQuantity > 0
            ? Number((food.protein * inputFoodQuantity).toFixed(2))
            : Number((food.protein * 100).toFixed(2))}
          g
        </span>
        <span>
          Carboidrato:
          {inputFoodQuantity > 0
            ? Number((food.carbohydrates * inputFoodQuantity).toFixed(2))
            : Number((food.carbohydrates * 100).toFixed(2))}
          g
        </span>
        <span className={styles.lipid}>
          Gordura:
          {inputFoodQuantity > 0
            ? Number((food.lipids * inputFoodQuantity).toFixed(2))
            : Number((food.lipids * 100).toFixed(2))}
          g
        </span>
      </div>

      <div className={styles.controls}>
        <input
          type="number"
          placeholder={food.quantity * 100 + 'g'}
          onChange={(event) => {
            const quantityInputValue = event.target.value;
            if (quantityInputValue === '') {
              setIsAddingToMeal(false);
              setInputFoodQuantity(0);
            } else {
              setInputFoodQuantity(Number(quantityInputValue));
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
                setSelectedDate(e.target.value);
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
              {meals.filter((m) => m.createdAt === selectedDate).length > 0 ? (
                meals
                  .filter((m) => m.createdAt === selectedDate)
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
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
        <button onClick={handleAddFoodToMeal}>
          {!isAddingToMeal
            ? `Adicionar ${foodFirstName} a uma refeição`
            : `Adicionar ${foodFirstName} a ${meal?.title || 'uma refeição'}`}
        </button>
      </div>
    </div>
  );
}
