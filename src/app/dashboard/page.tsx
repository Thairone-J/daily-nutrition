'use client';

import styles from './page.module.scss';
import SidePanel from '@/components/SidePanel/SidePanel';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useFoods } from '@/context/FoodsContext';
import { useState } from 'react';
import { useMeals } from '@/context/MealsContext';

export default function Dashboard() {
  const { currentFood, setCurrentFood } = useFoods();
  const [isClosing, setIsClosing] = useState(false);
  const [isAddingToMeal, setIsAddingToMeal] = useState(false);
  const { meals } = useMeals();

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedTodayDate = `${year}-${formattedMonth}-${formattedDay}`;

  const handleAnimationEnd = () => {
    setCurrentFood(undefined);
    setIsClosing(false);
    setIsAddingToMeal(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidePanel}>
        <SidePanel />
      </div>
      <div className={styles.searchArea}>
        <div className={styles.searchBarWrapper}>
          <h2>Escolha um Alimento</h2>
          <SearchBar />
        </div>
        <div className={styles.currentFoodDisplayArea}>
          {currentFood ? (
            <>
              <div
                className={`${styles.foodCard} ${isClosing ? styles.isClosingAnimation : ''} `}
                onAnimationEnd={isClosing ? handleAnimationEnd : undefined}
              >
                <div className={styles.header}>
                  <span
                    onClick={() => {
                      setIsClosing(!isClosing);
                    }}
                  >
                    X
                  </span>
                  <h3 className={styles.foodName}>{currentFood.name.toUpperCase()}</h3>
                </div>

                <div className={styles.nutrientTagsContainer}>
                  <span> ️‍🔥 {currentFood.kcal}kcal</span>
                  <span>Proteína: {currentFood.protein}g</span>
                  <span> Carboidrato: {currentFood.carbohydrates}g</span>
                  <span className={styles.lipid}>Gordura: {currentFood.lipids}g</span>
                </div>

                <div className={styles.controls}>
                  <input type="number" placeholder={currentFood.quantity + 'g'} />
                  {isAddingToMeal ? (
                    <>
                      <div className={styles.dateMealInputWrapper}>
                        <input
                          type="date"
                          defaultValue={formattedTodayDate}
                          className={styles.dateInput}
                        />
                        <select name="selectMeal" id="selectMeal">
                          {meals.map((meal) => (
                            <option key={meal.id}>{meal.title}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                  <button
                    onClick={() => {
                      setIsAddingToMeal(!isAddingToMeal);
                    }}
                  >
                    Adicionar a uma refeição
                  </button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
