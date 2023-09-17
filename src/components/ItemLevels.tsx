import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";
import { useItemStats } from "../hooks/useItemStats";
import { Item } from "../types";
import styles from "./ItemLevels.module.css";

export function ItemLevels({
  item,
  persistenceKey,
}: {
  item: Item;
  persistenceKey?: string;
}) {
  const [stats, setStats] = useItemStats(item, persistenceKey);

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
        {new Array(stats.level).fill(true).map((_, index) => (
          <div className={styles.LevelMarker} key={index}>
            {index + 1}
          </div>
        ))}
        {stats.level < MAX_LEVEL_NUMBER &&
          new Array(MAX_LEVEL_NUMBER - stats.level)
            .fill(true)
            .map((_, index) => (
              <div className={styles.LevelMarkerInactive} key={index}>
                {stats.level + index + 1}
              </div>
            ))}

        <div className={styles.Spacer} />

        <button
          className={styles.AddOrSubtractButton}
          data-disabled={stats.level === 0 || undefined}
          onClick={decreaseLevel}
        >
          -
        </button>
        <button
          className={styles.AddOrSubtractButton}
          data-disabled={stats.level === MAX_LEVEL_NUMBER || undefined}
          onClick={increaseLevel}
        >
          +
        </button>
      </div>
      <div className={styles.Markers}>
        {new Array(stats.subLevel).fill(true).map((_, index) => (
          <div className={styles.SubLevelMarker} key={index}>
            {index + 1}
          </div>
        ))}
        {stats.subLevel < MAX_SUB_LEVEL_NUMBER &&
          new Array(MAX_SUB_LEVEL_NUMBER - stats.subLevel)
            .fill(true)
            .map((_, index) => (
              <div className={styles.SubLevelMarkerInactive} key={index}>
                {stats.subLevel + index + 1}
              </div>
            ))}

        <div className={styles.Spacer} />
        <button
          className={styles.AddOrSubtractButton}
          data-disabled={stats.subLevel === 0 || undefined}
          onClick={decreaseSubLevel}
        >
          -
        </button>
        <button
          className={styles.AddOrSubtractButton}
          data-disabled={stats.subLevel === MAX_LEVEL_NUMBER || undefined}
          onClick={increaseSubLevel}
        >
          +
        </button>
      </div>
    </>
  );
}
