'use client';

import styles from './page.module.scss';
import SidePanel from '@/components/SidePanel/SidePanel';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useFoods } from '@/context/FoodsContext';
import { useState } from 'react';

export default function Dashboard() {
  const { currentFood, setCurrentFood } = useFoods();
  const [isClosing, setIsClosing] = useState(false);

  const handleAnimationEnd = () => {
    setCurrentFood(undefined);
    setIsClosing(false);
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
                  {' '}
                  <input type="number" placeholder={currentFood.quantity + 'g'} />
                  <button onClick={() => {}}>Adicionar a uma refeição</button>
                </div>

                {/* Implementar add food to meal    
                  Date pick | Meal Select | Confirm button
                */}
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
