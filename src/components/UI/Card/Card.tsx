import styles from './Card.module.scss';

type CardProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  titleSize?: 'small' | 'medium' | 'large';
  subtitleSize?: 'small' | 'medium' | 'large';
};

export default function Card({ title, subtitle, children, textAlign, titleSize, subtitleSize }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={`${styles.header} ${styles[`align-${textAlign || 'left'}`]}`}>
        <h3 className={styles[`title-${titleSize}`]}>{title}</h3>
        <p className={styles[`subtitle-${subtitleSize}`]}>{subtitle}</p>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
