'use client';
import { useState } from 'react';
import styles from './SearchBar.module.scss';
import { useTranslations } from 'next-intl';
import { Food } from '@/@types/global';

type SearchBarProps = {
  setIsFoodCardClosing: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFood: React.Dispatch<React.SetStateAction<Food | undefined>>;
  foods: Food[];
};

export default function SearchBar({
  setIsFoodCardClosing,
  setSelectedFood,
  foods,
}: SearchBarProps) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState(foods);

  const normalizeString = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };
  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTerm = event.target.value;
    setSearchTerm(currentTerm);

    if (!currentTerm.trim()) {
      setFilteredFoods([]);
      setIsFoodCardClosing(true);
      return;
    }

    const stopWords = ['de', 'da', 'do', 'a', 'o', 'e', 'em', 'para', 'com'];

    const normalizedTerm = normalizeString(currentTerm);

    const searchWords = normalizedTerm
      .split(' ')
      .filter((word) => !stopWords.includes(word) && word.length > 0);

    const results = foods.filter((food) => {
      const normalizedFoodName = normalizeString(food.name);

      return searchWords.every((word) => normalizedFoodName.includes(word));
    });

    setFilteredFoods(results);
  };
  return (
    <div className={styles.searchWrapper}>
      <input
        type="search"
        placeholder={`${t('dashboard.searchFoods')}...`}
        className={styles.searchBar}
        value={searchTerm}
        onChange={handleTyping}
      />

      {filteredFoods.length > 0 && searchTerm !== '' ? (
        <ul className={styles.list}>
          {filteredFoods.slice(0, 20).map((food) => (
            <li key={food.id} onClick={() => setSelectedFood({ ...food })}>
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
