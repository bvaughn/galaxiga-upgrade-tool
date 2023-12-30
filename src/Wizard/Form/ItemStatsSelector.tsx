import { DEFAULT_ITEM_STATS, ItemStats } from "../../types";
import styles from "./ItemStatsSelector.module.css";
import { LevelSelector } from "./LevelSelector";

export function ItemStatsSelector({
  className = "",
  itemStats = DEFAULT_ITEM_STATS,
  onChange,
}: {
  className?: string;
  itemStats?: Readonly<ItemStats>;
  onChange: (itemStats: ItemStats) => void;
}) {
  const { level, subLevel } = itemStats;

  const onChangeLevel = (level: number) => {
    onChange({
      ...itemStats,
      level,
    });
  };

  const onChangeSubLevel = (subLevel: number) => {
    onChange({
      ...itemStats,
      subLevel,
    });
  };

  return (
    <div className={`${className} ${styles.Container}`}>
      <div className={styles.Row}>
        <div className={styles.Text}>Evolution</div>
        <LevelSelector onChange={onChangeLevel} type="level" value={level} />
      </div>
      <div className={styles.Row}>
        <div className={styles.Text}>Upgrade</div>
        <LevelSelector
          onChange={onChangeSubLevel}
          type="subLevel"
          value={subLevel}
        />
      </div>
    </div>
  );
}
