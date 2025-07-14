'use client';

import styles from './page.module.scss';
import SidePanel from '@/components/SidePanel/SidePanel';
import SearchBar from '@/components/SearchBar/SearchBar';
import { Food } from '@/@types/global';
import FoodCard from '@/components/FoodCard/FoodCard';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@/components/UI/Icon/Icon';

type DashboardClientProps = {
  foods: Food[];
};

export default function DashboardClient({ foods }: DashboardClientProps) {
  const currentDateISO = new Date().toISOString();
  const [selectedDate, setSelectedDate] = useState(currentDateISO);

  const t = useTranslations();

  const [selectedFood, setSelectedFood] = useState<Food | undefined>();
  const [isFoodCardClosing, setIsFoodCardClosing] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isAlertClosing, setIsAlertClosing] = useState(false);

  useEffect(() => {
    if (alertMessage && !isAlertClosing) {
      const timer = setTimeout(() => {
        setIsAlertClosing(true); // Inicia a animação de saída
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [alertMessage, isAlertClosing]);

  const handleAlertAnimationEnd = () => {
    // Quando a animação de 'shrink' terminar...
    if (isAlertClosing) {
      setAlertMessage(null);
      setIsAlertClosing(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidePanel}>
        <SidePanel
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setAlertMessage={setAlertMessage}
        />
      </div>
      <div className={styles.searchArea}>
        <div className={styles.searchBarWrapper}>
          <h2>{t('dashboard.chooseFood')}</h2>
          <SearchBar
            setIsFoodCardClosing={setIsFoodCardClosing}
            setSelectedFood={setSelectedFood}
            foods={foods}
          />
        </div>
        <div className={styles.currentFoodDisplayArea}>
          <div className={styles.alertsWrapper}>
            {alertMessage && (
              <div
                className={isAlertClosing ? styles.messageBoxOut : styles.messageBoxIn}
                onAnimationEnd={handleAlertAnimationEnd}
              >
                <Icon name="info" size={24} />
                {alertMessage}
              </div>
            )}
          </div>
          {selectedFood ? (
            <FoodCard
              isFoodCardClosing={isFoodCardClosing}
              setIsFoodCardClosing={setIsFoodCardClosing}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setAlertMessage={setAlertMessage}
              setSelectedFood={setSelectedFood}
              selectedFood={selectedFood}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
