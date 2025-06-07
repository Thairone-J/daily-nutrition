import styles from './UserNutritionalGoals.module.scss';
import ProgressBar from './ProgressBar';
import Clock from '@/components/UI/Clock/Clock';
import { useMealsForSelectedDate } from '@/utils/hooks/useMealsForSelectedDate';
import { useTranslations } from 'next-intl';

import { getDateParsed } from '@/utils/dateUtils';
import { useRef } from 'react';

type UserNutritionalGoalsProps = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export default function UserNutritionalGoals({
  selectedDate,
  setSelectedDate,
}: UserNutritionalGoalsProps) {
  const t = useTranslations();

  const currentDateISO = new Date().toISOString();

  const { date: currentDateParsed } = getDateParsed(currentDateISO);
  const { date: selectedDateParsed } = getDateParsed(selectedDate);

  const mealsForSelectedDate = useMealsForSelectedDate(selectedDate);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const kcalSum = Math.floor(
    mealsForSelectedDate
      .flatMap((meal) => meal.foods.map((food) => food.kcal))
      .reduce((sum, kcal) => sum + kcal, 0)
  );

  const carbohydratesConsumed = Math.floor(
    mealsForSelectedDate
      .flatMap((meal) => meal.foods.map((food) => food.carbohydrates))
      .reduce((sum, carbs) => sum + carbs, 0)
  );

  const proteinConsumed = Math.floor(
    mealsForSelectedDate
      .flatMap((meal) => meal.foods.map((food) => food.protein))
      .reduce((sum, protein) => sum + protein, 0)
  );

  const lipidsConsumed = Math.floor(
    mealsForSelectedDate
      .flatMap((meal) => meal.foods.map((food) => food.lipids))
      .reduce((sum, lipid) => sum + lipid, 0)
  );

  const userGoals = {
    kcal: 2200,
    carbohydrates: 170,
    protein: 210,
    lipids: 100,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.dateTimeWrapper}>
        <input
          type="date"
          ref={dateInputRef}
          value={getDateParsed(selectedDate).date}
          className={styles.dateInput}
          onChange={(e) => {
            if (e.target.value > currentDateParsed) {
              alert('Não é possível adicionar refeições futuras.');
              return;
            }

            if (e.target.value === currentDateParsed) {
              setSelectedDate(currentDateISO);
            } else {
              const previousDateIso = new Date(`${e.target.value}T12:00:00`).toISOString();
              setSelectedDate(previousDateIso);
            }

            e.target.blur();
          }}
          onClick={() => dateInputRef.current?.showPicker()}
        />
        <div className={styles.dayHour}>
          {selectedDateParsed === currentDateParsed ? (
            <>
              {t(`dashboard.weekdays.${getDateParsed(currentDateISO).weekday.toLocaleLowerCase()}`)}
              {','} <Clock />
            </>
          ) : (
            <span className={styles.viewingPastMeals}>
              <span className={styles.statusDot}>•</span>

              {t('dashboard.viewingPastMeals')}
            </span>
          )}
        </div>
      </div>
      <div className={styles.header}>
        <img src="/pp.jpg" alt="" />
        <div className={styles.kcalGoal}>
          <h2>{t('dashboard.nutritionalGoals')}</h2>
          <p>
            <span className={styles.consumedCalories}>{kcalSum}</span> {t('commom.of')}{' '}
            {userGoals.kcal} {t('dashboard.calories')} 🔥
          </p>
        </div>
      </div>
      <div className={styles.goalsProgress}>
        <ProgressBar
          label={t('dashboard.carbohydrates')}
          value={carbohydratesConsumed}
          goal={userGoals.carbohydrates}
        />
        <ProgressBar
          label={t('dashboard.protein')}
          value={proteinConsumed}
          goal={userGoals.protein}
        />
        <ProgressBar label={t('dashboard.lipids')} value={lipidsConsumed} goal={userGoals.lipids} />
      </div>
    </div>
  );
}
