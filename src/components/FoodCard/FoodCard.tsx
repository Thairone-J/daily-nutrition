import styles from './FoodCard.module.scss';
import { useMeals, Meal } from '@/context/MealsContext';
import { Food } from '@/@types/global';
import { useState, useRef, useEffect } from 'react';
import { getDateParsed } from '@/utils/dateUtils';
import { useTranslations } from 'next-intl';

type FoodCardProps = {
  isFoodCardClosing: boolean;
  setIsFoodCardClosing: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedFood: React.Dispatch<React.SetStateAction<Food | undefined>>;
  selectedFood: Food;
};

export default function FoodCard({
  isFoodCardClosing,
  setIsFoodCardClosing,
  selectedDate,
  setSelectedDate,
  setAlertMessage,
  setSelectedFood,
  selectedFood,
}: FoodCardProps) {
  const t = useTranslations();
  const currentDateISO = new Date().toISOString();
  const { date: currentDateParsed } = getDateParsed(currentDateISO);

  const [isAddingToMeal, setIsAddingToMeal] = useState(false);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [quantityInput, setquantityInput] = useState(0);
  const [hasQuantity, setHasQuantity] = useState<boolean | 'initial'>('initial');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const { meals, addFoodToMeal } = useMeals();

  const foodFirstName = selectedFood.name.split(',', 1)[0];

  useEffect(() => {
    setMeal(null);
  }, [selectedDate]);

  const handleAddFoodToMeal = () => {
    if (quantityInput === 0) {
      setHasQuantity(false);
    } else {
      if (!meal) {
        setAlertMessage(`${t('dashboard.noMealChosen')}`);
      } else {
        const updatedFood = {
          id: crypto.randomUUID(),
          name: selectedFood.name,
          quantity: quantityInput,
          // Recalculates nutrients proportionally to the new quantity.
          kcal: selectedFood.kcal * quantityInput,
          protein: selectedFood.protein * quantityInput,
          carbohydrates: selectedFood.carbohydrates * quantityInput,
          lipids: selectedFood.lipids * quantityInput,
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
        <h3 className={styles.foodName}>{selectedFood.name.toUpperCase()}</h3>
      </div>

      <div className={styles.nutrientTagsContainer}>
        <span>
          ️‍🔥
          {quantityInput > 0
            ? Number((selectedFood.kcal * quantityInput).toFixed(2))
            : Number((selectedFood.kcal * 100).toFixed(2))}
          kcal
        </span>
        <span>
          {`${t('dashboard.protein')}:`}
          {quantityInput > 0
            ? Number((selectedFood.protein * quantityInput).toFixed(2))
            : Number((selectedFood.protein * 100).toFixed(2))}
          g
        </span>
        <span>
          {`${t('dashboard.carbohydrates')}:`}
          {quantityInput > 0
            ? Number((selectedFood.carbohydrates * quantityInput).toFixed(2))
            : Number((selectedFood.carbohydrates * 100).toFixed(2))}
          g
        </span>
        <span className={styles.lipid}>
          {`${t('dashboard.lipids')}:`}
          {quantityInput > 0
            ? Number((selectedFood.lipids * quantityInput).toFixed(2))
            : Number((selectedFood.lipids * 100).toFixed(2))}
          g
        </span>
      </div>

      <div className={styles.controls}>
        <input
          type="number"
          placeholder={selectedFood.baseQuantity * 100 + 'g'}
          onChange={(event) => {
            const quantityInputValue = event.target.value;
            if (quantityInputValue === '') {
              setIsAddingToMeal(false);
              setquantityInput(0);
            } else {
              setquantityInput(Number(quantityInputValue));
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
              value={getDateParsed(selectedDate).date}
              className={styles.dateInput}
              onClick={() => dateInputRef.current?.showPicker()}
              onChange={(e) => {
                if (e.target.value > currentDateParsed) {
                  setAlertMessage(`${t('dashboard.cannotAddFutureMeals')}`);
                  return;
                }

                if (e.target.value === currentDateParsed) {
                  setSelectedDate(currentDateISO);
                } else {
                  const previousDateIso = new Date(`${e.target.value}T12:00:00`).toISOString();
                  setSelectedDate(previousDateIso);
                }

                e.target.blur();
              }}
            />
            <select
              name="selectMeal"
              className={styles.selectMeal}
              onChange={handleSelectMeal}
              value={meal ? meal.id : 'default'}
            >
              <option value="default" disabled hidden>
                {t('dashboard.chooseMeal')}
              </option>
              {meals.filter(
                (m) =>
                  m.createdAt &&
                  getDateParsed(m.createdAt).date === getDateParsed(selectedDate).date
              ).length > 0 ? (
                meals
                  .filter(
                    (m) =>
                      m.createdAt &&
                      getDateParsed(m.createdAt).date === getDateParsed(selectedDate).date
                  )
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
