'use client';
import { useState } from 'react';
import { useFoods } from '@/context/FoodsContext';

export default function SearchBar() {
  const { foods } = useFoods();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFoods, setFilteredFoods] = useState(foods);

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const results = foods.filter((food) => food.name.toLowerCase().includes(term));
    setFilteredFoods(results);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Buscar alimentos..."
        value={searchTerm}
        onChange={handleTyping}
      />

      {filteredFoods.length > 0 && searchTerm !== '' ? (
        <ul>
          {filteredFoods.slice(0, 10).map((food) => (
            <li key={food.id}>
              {food.name} - {food.kcal} kcal
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum resultado encontrado</p>
      )}
    </div>
  );
}
