import Icon from '../UI/Icon/Icon';
import styles from './MealCard.module.scss';
import { useMeals } from '@/context/MealsContext';

type props = {
  children: React.ReactNode;
  title: string;
  icon: 'edit' | 'delete' | 'save';
};

export default function MealCard({ children, title, icon }: props) {
  const { meals, addMeal } = useMeals();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {title}
        <Icon onClick={() => {}} name={icon} />
      </div>
      <div className={styles.foodList}> {children}</div>
    </div>
  );
}
