'use client';

import styles from './page.module.scss';
import SidePanel from '@/components/SidePanel/SidePanel';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useFoods } from '@/context/FoodsContext';
import FoodCard from '@/components/FoodCard/FoodCard';
import { useState } from 'react';

export default function Dashboard() {
  const { selectedFood } = useFoods();
  const [isFoodCardClosing, setIsFoodCardClosing] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidePanel}>
        <SidePanel />
      </div>
      <div className={styles.searchArea}>
        <div className={styles.searchBarWrapper}>
          <h2>Escolha um Alimento</h2>
          <SearchBar setIsFoodCardClosing={setIsFoodCardClosing} />
        </div>
        <div className={styles.currentFoodDisplayArea}>
          {selectedFood ? (
            <FoodCard
              food={selectedFood}
              isFoodCardClosing={isFoodCardClosing}
              setIsFoodCardClosing={setIsFoodCardClosing}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
