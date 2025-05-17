import Icon from '../UI/Icon/Icon';
import styles from './MealCard.module.scss';
import { useMeals } from '@/context/MealsContext';
import { useState, ChangeEvent } from 'react';

type props = {
  children: React.ReactNode;
  mealId: string;
  title: string;
};

export default function MealCard({ children, mealId, title: initialTitle }: props) {
  const { updateMealTitle } = useMeals();

  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(initialTitle);

  if (!isEditing && initialTitle !== editableTitle) {
    setEditableTitle(initialTitle);
  }

  const handleIconClick = () => {
    if (isEditing) {
      if (editableTitle.trim() !== '') {
        updateMealTitle(mealId, editableTitle.trim());
        setIsEditing(false);
      } else {
        setEditableTitle(initialTitle);
        setIsEditing(false);
      }
    } else {
      setEditableTitle(initialTitle);
      setIsEditing(true);
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (editableTitle.trim() !== '') {
        updateMealTitle(mealId, editableTitle.trim());
        setIsEditing(false);
      } else {
        setEditableTitle(initialTitle);
        setIsEditing(false);
      }
    } else if (event.key === 'Escape') {
      setEditableTitle(initialTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {isEditing ? (
          <input
            type="text"
            value={editableTitle}
            onChange={handleTitleChange}
            onKeyDown={handleInputKeyDown}
            autoFocus
            /* onBlur={() => {
              setIsEditing(false);
            }} */
            className={styles.titleInput}
          />
        ) : (
          <span>{initialTitle}</span>
        )}
        <Icon onClick={handleIconClick} name={isEditing ? 'save' : 'edit'} />
      </div>
      <div className={styles.foodList}> {children}</div>
    </div>
  );
}
