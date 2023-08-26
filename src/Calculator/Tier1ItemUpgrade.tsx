import { useMemo } from "react";
import { Card } from "../components/Card";
import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { Icon } from "../components/Icon";
import { NumberInput } from "../components/NumberInput";
import { ItemImage } from "../components/ItemImage";
import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";
import { Category, Tier1Item } from "../types";
import { formatNumber } from "../utils/number";
import styles from "./Tier1ItemUpgrade.module.css";
import { calculateCost } from "./calculateCost";
import { useTier1ItemStats } from "./useTier1ItemStats";

export function Tier1ItemUpgrade({
  category,
  tier1Item,
}: {
  category: Category;
  tier1Item: Tier1Item;
}) {
  const [stats, setStats] = useTier1ItemStats(tier1Item.id);

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
  const decreaseUpgrade = () => {
    setStats({
      ...stats,
      subLevel: Math.max(0, stats.subLevel - 1),
    });
  };
  const increaseUpgrade = () => {
    setStats({
      ...stats,
      subLevel: Math.min(MAX_SUB_LEVEL_NUMBER, stats.subLevel + 1),
    });
  };

  const cost = useMemo(() => calculateCost(stats, category), [category, stats]);

  return (
    <div className={styles.Container}>
      <div className={styles.LeftColumn}>
        <ItemImage
          category={category}
          className={styles.Image}
          item={tier1Item}
        />
        <div className={styles.Description}>
          <div className={styles.Name}>{tier1Item.name}</div>
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
              onClick={
                stats.level < MAX_LEVEL_NUMBER ? increaseLevel : undefined
              }
              type="add"
            />
          </div>
          <div className={styles.Markers}>
            <div className={styles.UpgradeMarkers}>
              {"▰".repeat(stats.subLevel)}
              <span className={styles.UpgradeMarkersInactive}>
                {"▰".repeat(MAX_SUB_LEVEL_NUMBER - stats.subLevel)}
              </span>
            </div>

            <Icon
              data-disabled={stats.subLevel === 0 || undefined}
              className={styles.AddOrSubtractIcon}
              onClick={decreaseUpgrade}
              type="subtract"
            />
            <Icon
              data-disabled={
                stats.subLevel === MAX_SUB_LEVEL_NUMBER || undefined
              }
              className={styles.AddOrSubtractIcon}
              onClick={
                stats.subLevel < MAX_SUB_LEVEL_NUMBER
                  ? increaseUpgrade
                  : undefined
              }
              type="add"
            />
          </div>
        </div>
        <label className={styles.CardInputLabel}>
          <Card type="specific" category={category} />
          <NumberInput
            className={styles.CardInput}
            maxValue={9999}
            minValue={0}
            onChange={(cards: number) => {
              setStats({
                ...stats,
                cards,
              });
            }}
            value={stats.cards}
          />
        </label>
      </div>
      {cost.coinsNeeded > 0 && (
        <div className={styles.RightColumn}>
          <div className={styles.Costs}>
            <div
              className={styles.Cost}
              title={`${formatNumber(cost.cardsNeeded, "long")} cards`}
            >
              <Card type="generic" category={category} />{" "}
              {formatNumber(cost.cardsNeeded)}
            </div>
            <div
              className={styles.Cost}
              title={`${formatNumber(cost.gemsNeeded.forLevels, "long")} gems`}
            >
              <Gem /> {formatNumber(cost.gemsNeeded.forLevels)}
            </div>
            <div
              className={styles.Cost}
              title={`${formatNumber(cost.coinsNeeded, "long")} coins`}
            >
              <Coin /> {formatNumber(cost.coinsNeeded)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
