import { LevelSelector } from "./LevelSelector";

import { Card } from "../components/Card";
import { NumberInput } from "../components/NumberInput";
import { useItemStats } from "../hooks/useItemStats";
import { Item } from "../types";
import styles from "./ItemStatsSelector.module.css";

export function ItemStatsSelector({
  className = "",
  hideCardsInput = false,
  item,
  persistenceKey,
}: {
  className?: string;
  hideCardsInput?: boolean;
  item: Item;
  persistenceKey: string;
}) {
  const [stats, setStats] = useItemStats(item, persistenceKey);

  const { category } = item;
  const { cards, level, subLevel } = stats;

  const onChangeCards = (cards: number) => {
    setStats({
      ...stats,
      cards,
    });
  };

  const onChangeLevel = (level: number) => {
    setStats({
      ...stats,
      level,
    });
  };

  const onChangeSubLevel = (subLevel: number) => {
    setStats({
      ...stats,
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
