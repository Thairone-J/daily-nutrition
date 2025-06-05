import Icon from '@/components/UI/Icon/Icon';
import styles from './MealCard.module.scss';
import { Meal, useMeals } from '@/context/MealsContext';
import { useState, KeyboardEvent } from 'react';
import { Food } from '@/context/FoodsContext';

export default function MealCard(meal: Meal) {
  const { updateMealTitle, deleteMeal, updateFood, removeFoodFromMeal } = useMeals();

  const [isEditing, setIsEditing] = useState(false);
  const [mealTitle, setMealTitle] = useState('');

  const confirmChanges = () => {
    const trimmedTitle = mealTitle.trim();
    if (trimmedTitle !== '') {
      updateMealTitle(meal.id, trimmedTitle);
    } else {
      setMealTitle('');
    }
    setIsEditing(false);
    // Food changes is already confirmed when food quantity input is changed.
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      confirmChanges();
    } else if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleQuantityChange = (food: Food, event: React.ChangeEvent<HTMLInputElement>) => {
    let inputQuantity = parseInt(event.target.value, 10);

    if (!inputQuantity || isNaN(inputQuantity) || inputQuantity >= 10000) return;
    else {
      const updatedFood = {
        ...food,
        quantity: inputQuantity,
        // Recalculates nutrients proportionally to the new quantity.
        kcal: (food.kcal / food.quantity) * inputQuantity,
        protein: (food.protein / food.quantity) * inputQuantity,
        carbohydrates: (food.carbohydrates / food.quantity) * inputQuantity,
        lipids: (food.lipids / food.quantity) * inputQuantity,
      };

      updateFood(meal.id, updatedFood);
    }
  };

  const totalMacros = meal.foods.reduce(
    (totals, food) => {
      totals.carbohydrates += food.carbohydrates;
      totals.protein += food.protein;
      totals.lipids += food.lipids;
      totals.kcal += food.kcal;
      return totals;
    },
    { carbohydrates: 0, protein: 0, lipids: 0, kcal: 0 }
  );
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {isEditing ? (
          <input
            type="text"
            onChange={(e) => {
              setMealTitle(e.target.value);
            }}
            onKeyDown={handleInputKeyDown}
            autoFocus
            // onBlur={handleSaveMealClick}
            className={styles.titleInput}
            placeholder="Nome da Refeição"
          />
        ) : (
          <span>{meal.title}</span>
        )}

        <div className={styles.icons}>
          {isEditing ? (
            <>
              <Icon
                onClick={() => {
                  deleteMeal(meal.id);
                }}
                name={'delete'}
                size={18}
                aria-label="Deletar refeição"
              />
              <Icon
                onClick={confirmChanges}
                name={'save'}
                size={20}
                aria-label="Confirmar alterações"
              />
            </>
          ) : (
            <Icon
              onClick={() => {
                setIsEditing(true);
              }}
              name={'edit'}
              size={20}
              aria-label="Editar refeição"
            />
          )}
        </div>
      </div>
      <div className={styles.foodList}>
        {meal.foods.map((food) => (
          <div className={styles.wrapper} key={food.id}>
            <div className={styles.inputWrapper}>
              {isEditing ? (
                <>
                  <input
                    type="number"
                    className={styles.inputValue}
                    onKeyDown={handleInputKeyDown}
                    placeholder={food.quantity.toString()}
                    onChange={(e) => handleQuantityChange(food, e)}
                  />
                </>
              ) : (
                food.quantity
              )}
              <span className={styles.fixedUnit}>g</span>
            </div>

            <div className={styles.foodName}>{food.name.split(',', 1)}</div>

            {isEditing ? (
              <div
                className={styles.removeFood}
                onClick={() => {
                  removeFoodFromMeal(meal.id, food.id);
                }}
              >
                X
              </div>
            ) : (
              <div className={styles.stats}>{isNaN(food.kcal) ? 0 : Math.round(food.kcal)}kcal</div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.totalMacrosKcal}>
        <div className={styles.totalMacros}>
          <span>Carbohydrates: {Math.floor(totalMacros.carbohydrates)}g</span>
          <span>Protein: {Math.floor(totalMacros.protein)}g</span>
          <span>Lipids: {Math.floor(totalMacros.lipids)}g</span>
        </div>

        <div className={styles.kcal}>
          <span>{Math.floor(totalMacros.kcal)}kcal</span>
        </div>
      </div>
    </div>
  );
}
