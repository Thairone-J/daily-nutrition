import styles from './page.module.scss';
import Button from '@/components/UI/Button/Button';
import Card from '@/components/UI/Card/Card';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div className={styles['welcome-container']}>
          <img src="./logo.png" alt="" />
          <div className={styles['text-content']}>
            <h1>Daily nutrition</h1>
            <h2>
              Registre refeições, veja as calorias e nutrientes de cada alimento, acompanhe metas e
              cuide da sua saúde de forma simples e prática.
            </h2>
          </div>

          <div className={styles['start-links']}>
            <Button fontSize="medium" variant="primary">
              Registrar refeição
            </Button>
            <a href="" className={styles.link}>
              Saiba mais sobre Daily Nutrition ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
