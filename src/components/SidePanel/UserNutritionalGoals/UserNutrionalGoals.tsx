import styles from './UserNutritionalGoals.module.scss';
import ProgressBar from './ProgressBar';
import Clock from '@/components/UI/Clock/Clock';

import { getDateParsed } from '@/utils/dateUtils';
import { useRef } from 'react';

type props = {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export default function UserNutritionalGoals({ selectedDate, setSelectedDate }: props) {
  const currenteDateISO = new Date().toISOString();
  const { date: currentDateParsed } = getDateParsed(currenteDateISO);
  const { date: selectedDateParsed } = getDateParsed(selectedDate);

  const dateInputRef = useRef<HTMLInputElement>(null);
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
              setSelectedDate(currenteDateISO);
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
              {`${getDateParsed(currenteDateISO).weekday},`} <Clock />
            </>
          ) : (
            <span>Visualisando refeições anteriores</span>
          )}
        </div>
      </div>
      <div className={styles.header}>
        <img src="/pp.jpg" alt="" />
        <div className={styles.kcalGoal}>
          <h2>Metas nutricionais</h2>
          <p>
            <span className={styles.consumedCalories}>{}</span> de {} calorias 🔥
          </p>
        </div>
      </div>
      <div className={styles.goalsProgress}>
        <ProgressBar label="Carboidratos" value={250} goal={250} />
        <ProgressBar label="Proteínas" value={100} goal={250} />
        <ProgressBar label="Gorduras" value={100} goal={250} />
      </div>
    </div>
  );
}
