import React, { useState, useEffect } from 'react';
import styles from './Clock.module.scss';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={styles.clockContainer}>
      <span className={styles.time}>{formattedTime}</span>
    </div>
  );
}
