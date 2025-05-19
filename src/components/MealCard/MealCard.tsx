import Icon from '../UI/Icon/Icon';
import styles from './MealCard.module.scss';
import { useMeals } from '@/context/MealsContext';
import { useState, ChangeEvent, createContext, useContext } from 'react';

type props = {
  children: React.ReactNode;
  mealId: string;
  title: string;
};

type MealCardContextType = {
  isEditing: boolean;
};

const MealCardContext = createContext<MealCardContextType | undefined>(undefined);

export const useMealCardState = () => {
  const context = useContext(MealCardContext);
  if (context === undefined) {
    throw new Error(
      'useMealCardSharedState must be used within a MealCardProvider (MealCard component)'
    );
  }
  return context;
};

export default function MealCard({ children, mealId, title: initialTitle }: props) {
  const { updateMealTitle, deleteMeal } = useMeals();

  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(initialTitle);

  if (!isEditing && initialTitle !== editableTitle) {
    setEditableTitle(initialTitle);
  }

  const handleSaveMealClick = () => {
    if (editableTitle.trim() !== '') {
      updateMealTitle(mealId, editableTitle.trim());
      setIsEditing(false);
    } else {
      setEditableTitle(initialTitle);
      setIsEditing(false);
    }
  };

  const handleEditMealClick = () => {
    setIsEditing(true);
  };

  const handleDeleteMealClick = () => {
    deleteMeal(mealId);
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
            placeholder={editableTitle}
            onChange={handleTitleChange}
            onKeyDown={handleInputKeyDown}
            autoFocus
            /* onBlur={() => {
              setIsEditing(false);
            }}   <<---- TODO fix (if use like that it will bug.)*/
            className={styles.titleInput}
          />
        ) : (
          <span>{initialTitle}</span>
        )}

        {isEditing ? (
          <>
            <Icon onClick={handleDeleteMealClick} name={'delete'} size={18} />
            <Icon onClick={handleSaveMealClick} name={'save'} size={20} />
          </>
        ) : (
          <Icon onClick={handleEditMealClick} name={'edit'} size={20} />
        )}
      </div>
      <MealCardContext.Provider value={{ isEditing }}>
        <div className={styles.foodList}> {children}</div>
      </MealCardContext.Provider>
    </div>
  );
}
