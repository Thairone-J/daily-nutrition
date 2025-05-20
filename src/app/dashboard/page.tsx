'use client';

import styles from './page.module.scss';
import SidePanel from '@/components/SidePanel/SidePanel';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useState } from 'react';
import { Food } from '@/context/MealsContext';
import { useFoods } from '@/context/FoodsContext';
import Icon from '@/components/UI/Icon/Icon';
import Button from '@/components/UI/Button/Button';

export default function Dashboard() {
  const { currentFood } = useFoods();

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
          <div className={`${currentFood ? styles.display : styles.hide}`}>
            {currentFood ? (
              <>
                <div className={styles.addFoodToMealWrapper}></div>
              </>
            ) : (
              <></>
            )}
            {currentFood ? (
              <div className={styles.foodCard}>
                <h3 className={styles.foodName}>{currentFood.name}</h3>

                <div className={styles.nutrientTagsContainer}>
                  <span>️‍🔥 {currentFood.kcal}kcal</span>
                  <span> Carboidrato: {currentFood.carbohydrates}g</span>
                  <span>Proteína: {currentFood.protein}g</span>
                  <span>Gordura: {currentFood.lipids}g</span>
                </div>

                <div className={styles.controlsContainer}>
                  <div className={styles.quantityDisplay}>
                    <span className={styles.quantityText}>{currentFood.quantity}g</span>
                    <Icon name="edit" size={20} />
                  </div>

                  <Button fontSize="medium"> Adicionar a uma refeição</Button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
