import { useItemStats } from "../hooks/useItemStats";
import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";
import { Item } from "../types";
import { Icon } from "./Icon";
import styles from "./ItemLevels.module.css";

export function ItemLevels({ item }: { item: Item }) {
  const [stats, setStats] = useItemStats(item);

  const decreaseLevel = () => {
    setStats({
      ...stats,
      level: Math.max(0, stats.level - 1),
    });
  };
  const increaseLevel = () => {
    setStats({
      ...stats,
      level: Math.min(MAX_LEVEL_NUMBER, stats.level + 1),
    });
  };

  const decreaseSubLevel = () => {
    setStats({
      ...stats,
      subLevel: Math.max(0, stats.subLevel - 1),
    });
  };
  const increaseSubLevel = () => {
    setStats({
      ...stats,
      subLevel: Math.min(MAX_SUB_LEVEL_NUMBER, stats.subLevel + 1),
    });
  };

  return (
    <>
      <div className={styles.Markers}>
        <div className={styles.LevelMarkers}>
          {"●".repeat(stats.level)}
          {"○".repeat(MAX_LEVEL_NUMBER - stats.level)}
        </div>
        <Icon
          data-disabled={stats.level === 0 || undefined}
          className={styles.AddOrSubtractIcon}
          onClick={decreaseLevel}
          type="subtract"
        />
        <Icon
          data-disabled={stats.level === MAX_LEVEL_NUMBER || undefined}
          className={styles.AddOrSubtractIcon}
          onClick={stats.level < MAX_LEVEL_NUMBER ? increaseLevel : undefined}
          type="add"
        />
      </div>
      <div className={styles.Markers}>
        <div className={styles.SubLevelMarkers}>
          {"▰".repeat(stats.subLevel)}
          <span className={styles.SubLevelMarkersInactive}>
            {"▰".repeat(MAX_SUB_LEVEL_NUMBER - stats.subLevel)}
          </span>
        </div>

        <Icon
          data-disabled={stats.subLevel === 0 || undefined}
          className={styles.AddOrSubtractIcon}
          onClick={decreaseSubLevel}
          type="subtract"
        />
        <Icon
          data-disabled={stats.subLevel === MAX_SUB_LEVEL_NUMBER || undefined}
          className={styles.AddOrSubtractIcon}
          onClick={
            stats.subLevel < MAX_SUB_LEVEL_NUMBER ? increaseSubLevel : undefined
          }
          type="add"
        />
      </div>
    </>
  );
}
