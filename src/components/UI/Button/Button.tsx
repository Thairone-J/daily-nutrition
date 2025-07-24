import styles from './Button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outlineSecondary';
  fontSize?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

export default function Button({
  children,
  type,
  variant = 'primary',
  fontSize = 'small',
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[`font-${fontSize}`]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
