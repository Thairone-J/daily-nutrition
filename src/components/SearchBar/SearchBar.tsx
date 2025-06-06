'use client';
import { useState } from 'react';
import { useFoods } from '@/context/FoodsContext';
import styles from './SearchBar.module.scss';
import { useTranslations } from 'next-intl';

type SearchBarProps = {
  setIsFoodCardClosing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBar({ setIsFoodCardClosing }: SearchBarProps) {
  const t = useTranslations();
  const { foods, setSelectedFood } = useFoods();
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

    const normalizedTerm = normalizeString(currentTerm);

    const results = foods.filter((food) => normalizeString(food.name).includes(normalizedTerm));

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
