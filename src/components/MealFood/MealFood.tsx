import styles from './MealFood.module.scss';
import { useMeals } from '@/context/MealsContext';
import { Food } from '@/context/MealsContext';
import { useMealCardState } from '../MealCard/MealCard';

type FoodBasicInfo = Pick<Food, 'id' | 'name' | 'quantity' | 'kcal'> & {
  mealId: string;
};
export default function MealFood({ id, mealId, name, quantity, kcal }: FoodBasicInfo) {
  const { updateFoodQuantity } = useMeals();
  const { isEditing } = useMealCardState();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(event.target.value, 10);

    if (newQuantity >= 10000) {
      return;
    } else {
      updateFoodQuantity(mealId, id, newQuantity);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        {isEditing ? (
          <input
            type="number"
            className={styles.inputValue}
            placeholder={quantity.toString()}
            onChange={handleQuantityChange}
          />
        ) : (
          quantity
        )}
        <span className={styles.fixedUnit}>g</span>
      </div>

      <div className={styles.foodName}>{name}</div>

      <div className={styles.stats}>{kcal}kcal</div>
    </div>
  );
}
