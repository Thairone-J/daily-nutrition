import Icon from '../UI/Icon/Icon';
import styles from './MealCard.module.scss';
import { Meal, useMeals } from '@/context/MealsContext';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

export default function MealCard({ id, title, foods }: Meal) {
  const { updateMealTitle, deleteMeal, updateFoodQuantity } = useMeals();

  const [isEditing, setIsEditing] = useState(false);
  const [mealTitle, setMealTitle] = useState('');

  const handleSaveMealClick = () => {
    const trimmedTitle = mealTitle.trim();
    if (trimmedTitle !== '') {
      updateMealTitle(id, trimmedTitle);
    } else {
      setMealTitle('');
    }
    setIsEditing(false);
  };

  const handleEditMealClick = () => {
    setIsEditing(true);
  };

  const handleDeleteMealClick = () => {
    deleteMeal(id);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMealTitle(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveMealClick();
    } else if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(event.target.value, 10);

    if (newQuantity >= 10000) {
      return;
    } else {
      updateFoodQuantity(id, id, newQuantity);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {isEditing ? (
          <input
            type="text"
            onChange={handleTitleChange}
            onKeyDown={handleInputKeyDown}
            autoFocus
            // onBlur={handleSaveMealClick}
            className={styles.titleInput}
            placeholder="Nome da Refeição"
          />
        ) : (
          <span>{title}</span>
        )}

        <div className={styles.icons}>
          {isEditing ? (
            <>
              <Icon
                onClick={handleDeleteMealClick}
                name={'delete'}
                size={18}
                aria-label="Deletar refeição"
              />
              <Icon
                onClick={handleSaveMealClick}
                name={'save'}
                size={20}
                aria-label="Salvar título"
              />
            </>
          ) : (
            <Icon
              onClick={handleEditMealClick}
              name={'edit'}
              size={20}
              aria-label="Editar título"
            />
          )}
        </div>
      </div>
      <div className={styles.foodList}>
        {foods.map((food) => (
          <div className={styles.wrapper} key={food.id}>
            <div className={styles.inputWrapper}>
              {isEditing ? (
                <input
                  type="number"
                  className={styles.inputValue}
                  placeholder={food.quantity.toString()}
                  onChange={handleQuantityChange}
                />
              ) : (
                food.quantity
              )}
              <span className={styles.fixedUnit}>g</span>
            </div>

            <div className={styles.foodName}>{food.name}</div>

            <div className={styles.stats}>{food.kcal}kcal</div>
          </div>
        ))}
      </div>
    </div>
  );
}
