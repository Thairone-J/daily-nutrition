import styles from './FoodCard.module.scss';
import { useMeals, Meal } from '@/context/MealsContext';
import { useFoods, Food } from '@/context/FoodsContext';
import { useState, useRef } from 'react';
import { getDateParsed } from '@/utils/dateUtils';
import { useTranslations } from 'next-intl';

type FoodCardProps = {
  food: Food;
  isFoodCardClosing: boolean;
  setIsFoodCardClosing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FoodCard({ food, isFoodCardClosing, setIsFoodCardClosing }: FoodCardProps) {
  const t = useTranslations();
  const currentDateISO = new Date().toISOString();
  const { date: today } = getDateParsed(currentDateISO);

  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [isAddingToMeal, setIsAddingToMeal] = useState(false);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [inputFoodQuantity, setInputFoodQuantity] = useState(0);
  const [hasQuantity, setHasQuantity] = useState<boolean | 'initial'>('initial');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const { meals, addFoodToMeal } = useMeals();
  const { setSelectedFood } = useFoods();

  const foodFirstName = food.name.split(',', 1)[0];

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
    setIsFoodCardClosing(false);
    setIsAddingToMeal(false);
    setSelectedFood(undefined);
  };

  return (
    <div
      className={`${styles.foodCard} ${isFoodCardClosing ? styles.isFoodCardClosingnimation : ''}`}
      onAnimationEnd={isFoodCardClosing ? handleClosingCardAnimationEnd : undefined}
    >
      <div className={styles.header}>
        <span onClick={() => setIsFoodCardClosing(!isFoodCardClosing)}>X</span>
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
          {`${t('dashboard.protein')}:`}
          {inputFoodQuantity > 0
            ? Number((food.protein * inputFoodQuantity).toFixed(2))
            : Number((food.protein * 100).toFixed(2))}
          g
        </span>
        <span>
          {`${t('dashboard.carbohydrates')}:`}
          {inputFoodQuantity > 0
            ? Number((food.carbohydrates * inputFoodQuantity).toFixed(2))
            : Number((food.carbohydrates * 100).toFixed(2))}
          g
        </span>
        <span className={styles.lipid}>
          {`${t('dashboard.lipids')}:`}
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
              ref={dateInputRef}
              defaultValue={today}
              className={styles.dateInput}
              onClick={() => dateInputRef.current?.showPicker()}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                // Don't need ISO date for this component.
                e.target.blur();
              }}
            />
            <select
              name="selectMeal"
              className={styles.selectMeal}
              onChange={handleSelectMeal}
              defaultValue={'default'}
            >
              <option value="default" disabled hidden>
                {t('dashboard.chooseMeal')}
              </option>
              {meals.filter((m) => m.createdAt && getDateParsed(m.createdAt).date === selectedDate)
                .length > 0 ? (
                meals
                  .filter((m) => m.createdAt && getDateParsed(m.createdAt).date === selectedDate)
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))
              ) : (
                <option value="none" disabled>
                  {t('dashboard.noMealsRecorded')}
                </option>
              )}
            </select>
          </div>
        ) : null}
        <button onClick={handleAddFoodToMeal}>
          {!isAddingToMeal
            ? t('dashboard.foodActions.addFoodToNewMeal', { foodFirstName: foodFirstName })
            : t('dashboard.foodActions.addFoodToExistingMeal', {
                foodFirstName: foodFirstName,
                mealTitle: meal?.title || t('dashboard.foodActions.aMealDefault'),
              })}
        </button>
      </div>
    </div>
  );
}
