import { Card } from "../../components/Card";
import { NumberInput } from "../../components/NumberInput";
import { Category, DEFAULT_ITEM_STATS, ItemStats } from "../../types";
import styles from "./ItemStatsSelector.module.css";
import { LevelSelector } from "./LevelSelector";

export function ItemStatsSelector({
  category,
  className = "",
  hideCardsInput = false,
  itemStats = DEFAULT_ITEM_STATS,
  onChange,
}: {
  category: Category;
  className?: string;
  hideCardsInput?: boolean;
  itemStats?: Readonly<ItemStats>;
  onChange: (itemStats: ItemStats) => void;
}) {
  const { cards, level, subLevel } = itemStats;

  const onChangeCards = (cards: number) => {
    onChange({
      ...itemStats,
      cards,
    });
  };

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
      {hideCardsInput || (
        <div className={styles.Row}>
          <div className={styles.Text}>Cards</div>
          <Card type="specific" category={category} />
          <NumberInput
            className={styles.CardInput}
            maxValue={99999}
            minValue={0}
            onChange={onChangeCards}
            value={cards}
          />
        </div>
      )}
    </div>
  );
}
