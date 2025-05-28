'use client';

import styles from './page.module.scss';
import SidePanel from '@/components/SidePanel/SidePanel';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useFoods } from '@/context/FoodsContext';
import FoodCard from '@/components/FoodCard/FoodCard';

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
          {currentFood ? <FoodCard food={currentFood} /> : null}
        </div>
      </div>
    </div>
  );
}
