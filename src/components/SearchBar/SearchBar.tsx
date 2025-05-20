'use client';
import { useState } from 'react';
import { useFoods } from '@/context/FoodsContext';
import styles from './SearchBar.module.scss';
import { Food } from '@/context/MealsContext';

export default function SearchBar() {
  const { foods } = useFoods();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState(foods);

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      // Hide food stats if search bar is empty
      setCurrentFood(undefined);
    }

    const results = foods.filter((food) => food.name.toLowerCase().includes(term));
    setFilteredFoods(results);
  };

  const { setCurrentFood } = useFoods();

  return (
    <div className={styles.searchWrapper}>
      <input
        type="search"
        placeholder="Buscar alimentos..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={handleTyping}
      />

      {filteredFoods.length > 0 && searchTerm !== '' ? (
        <ul className={styles.list}>
          {filteredFoods.slice(0, 20).map((food) => (
            <li key={food.id} onClick={() => setCurrentFood(food)}>
              {food.name}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
