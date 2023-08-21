import { useMemo } from "react";
import { Card } from "../components/Card";
import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { Icon } from "../components/Icon";
import { NumberInput } from "../components/NumberInput";
import { ItemImage } from "../components/ItemImage";
import { MAX_LEVEL, MAX_UPGRADE } from "../data/upgrade-costs";
import { Tier1Item } from "../types";
import { formatNumber } from "../utils/number";
import styles from "./Tier1ItemUpgrade.module.css";
import { calculateCost } from "./calculateCost";
import { useTier1ItemStats } from "./useTier1ItemStats";

export function Tier1ItemUpgrade({
  category,
  tier1Item,
}: {
  category: "drone" | "ship";
  tier1Item: Tier1Item;
}) {
  const [stats, setStats] = useTier1ItemStats(tier1Item.id);

  const decreaseLevel = () => {
    setStats({
      ...stats,
      level: stats.level - 1,
    });
  };
  const increaseLevel = () => {
    setStats({
      ...stats,
      level: stats.level + 1,
    });
  };
  const decreaseUpgrade = () => {
    setStats({
      ...stats,
      upgrade: stats.upgrade - 1,
    });
  };
  const increaseUpgrade = () => {
    setStats({
      ...stats,
      upgrade: stats.upgrade + 1,
    });
  };

  const cost = useMemo(() => calculateCost(stats, category), [category, stats]);

  return (
    <div className={styles.Container}>
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
            {"○".repeat(MAX_LEVEL - stats.level)}
          </div>
          <Icon
            data-disabled={stats.level === 0 || undefined}
            className={styles.AddOrSubtractIcon}
            onClick={decreaseLevel}
            type="subtract"
          />
          <Icon
            data-disabled={stats.level === MAX_LEVEL || undefined}
            className={styles.AddOrSubtractIcon}
            onClick={stats.level < MAX_LEVEL ? increaseLevel : undefined}
            type="add"
          />
        </div>
        <div className={styles.Markers}>
          <div className={styles.UpgradeMarkers}>
            {"▰".repeat(stats.upgrade)}
            <span className={styles.UpgradeMarkersInactive}>
              {"▰".repeat(MAX_UPGRADE - stats.upgrade)}
            </span>
          </div>

          <Icon
            data-disabled={stats.upgrade === 0 || undefined}
            className={styles.AddOrSubtractIcon}
            onClick={decreaseUpgrade}
            type="subtract"
          />
          <Icon
            data-disabled={stats.upgrade === MAX_UPGRADE || undefined}
            className={styles.AddOrSubtractIcon}
            onClick={stats.upgrade < MAX_UPGRADE ? increaseUpgrade : undefined}
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
          value={stats?.cards}
        />
      </label>
      {cost.goldNeeded > 0 && (
        <div className={styles.Costs}>
          <div className={styles.Cost}>
            <Card type="generic" category={category} />{" "}
            {formatNumber(cost.cardsNeeded)}
          </div>
          <div className={styles.Cost}>
            <Gem /> {formatNumber(cost.gemsNeeded.forLevels)}
          </div>
          <div className={styles.Cost}>
            <Coin /> {formatNumber(cost.goldNeeded)}
          </div>
        </div>
      )}
    </div>
  );
}
