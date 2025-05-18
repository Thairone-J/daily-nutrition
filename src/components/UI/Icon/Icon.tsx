import icons from './svgPaths';
import styles from './Icon.module.scss';

type IconProps = {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  onClick?: () => void;
  onMouseDown?: () => void;
};

export default function Icon({ name, size = 24, color = 'currentColor', onClick }: IconProps) {
  const path = icons[name];

  if (!path) return null;

  return (
    <svg
      className={styles.icon}
      width={size}
      height={size}
      fill={color}
      viewBox="0 -960 960 960"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path d={path} />
    </svg>
  );
}
