import styles from './page.module.scss';
import SidePanel from '@/components/SidePanel/SidePanel';

export default function dashboard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidePanel}>
        <SidePanel />
      </div>
      <div className={styles.searchArea}>SearchArea</div>
    </div>
  );
}
