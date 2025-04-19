import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fontSize?: 'small' | 'medium' | 'large';
  onClick?: () => void;
};

export default function Button({
  children,
  variant = 'primary',
  fontSize = 'small',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[`font-${fontSize}`]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
