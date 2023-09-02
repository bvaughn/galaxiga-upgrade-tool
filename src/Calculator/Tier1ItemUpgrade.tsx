import { useMemo } from "react";
import { Card } from "../components/Card";
import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { Icon } from "../components/Icon";
import { ItemImage } from "../components/ItemImage";
import { NumberInput } from "../components/NumberInput";
import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";
import { Category, Tier1Item } from "../types";
import { formatNumber } from "../utils/number";
import styles from "./Tier1ItemUpgrade.module.css";
import { calculateCost } from "./calculateCost";
import { useBuyCardsWithGems } from "./useBuyCardsWithGems";
import { useItemStats } from "./useItemStats";

export function Tier1ItemUpgrade({
  category,
  tier1Item,
}: {
  category: Category;
  tier1Item: Tier1Item;
}) {
  const [buyCardsWithGems] = useBuyCardsWithGems();

  const [stats, setStats] = useItemStats(tier1Item.id);

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

  const cost = useMemo(
    () => calculateCost(stats, category, 1),
    [category, stats]
  );

  const cardsNeeded = buyCardsWithGems
    ? cost.boxes.with.cardsNeededForLevels
    : cost.boxes.without.cardsNeededForLevels;
  const coinsNeeded = buyCardsWithGems
    ? cost.boxes.with.coinsNeededForLevels
    : cost.boxes.without.coinsNeededForLevels;
  const gemsNeeded = buyCardsWithGems
    ? cost.boxes.with.gemsNeededForLevels
    : cost.boxes.without.gemsNeededForLevels;

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
      {(stats.level < MAX_LEVEL_NUMBER ||
        stats.subLevel < MAX_SUB_LEVEL_NUMBER) && (
        <div className={styles.RightColumn}>
          <div className={styles.Costs}>
            <div
              className={styles.Cost}
              data-disabled={cardsNeeded === 0 ? "" : undefined}
              title={`${formatNumber(cardsNeeded, "long")} cards`}
            >
              <Card type="generic" category={category} />{" "}
              {formatNumber(cardsNeeded)}
            </div>
            <div
              className={styles.Cost}
              data-disabled={gemsNeeded === 0 ? "" : undefined}
              title={`${formatNumber(gemsNeeded, "long")} gems`}
            >
              <Gem /> {formatNumber(gemsNeeded)}
            </div>
            <div
              className={styles.Cost}
              data-disabled={coinsNeeded === 0 ? "" : undefined}
              title={`${formatNumber(coinsNeeded, "long")} coins`}
            >
              <Coin /> {formatNumber(coinsNeeded)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
