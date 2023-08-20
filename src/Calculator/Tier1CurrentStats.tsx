import { MAX_LEVEL, MAX_UPGRADE } from "../data/upgrade-costs";
import { Tier1Ship } from "../types";
import { formatNumber } from "../utils/number";
import { Coin } from "./Coin";
import { Gem } from "./Gem";
import { Icon } from "./Icon";
import { Image } from "./Image";
import { Cost, calculateCost } from "./calculateCost";
import { useTier1ShipStats } from "./useTier1ShipStats";
import { NumberInput } from "./NumberInput";
import { useMemo } from "react";
import { Card } from "./Card";
import styles from "./Tier1CurrentStats.module.css";

export function Tier1CurrentStats({ tier1Ship }: { tier1Ship: Tier1Ship }) {
  const [stats, setStats] = useTier1ShipStats(tier1Ship.id);

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

  const cost = useMemo(() => calculateCost<Cost>(stats), [stats]);

  return (
    <div className={styles.Container}>
      {tier1Ship.imageName ? (
        <Image className={styles.Image} imageName={tier1Ship.imageName} />
      ) : (
        <div className={styles.ImagePlaceholder} />
      )}
      <div className={styles.Description}>
        <div className={styles.Name}>{tier1Ship.name}</div>
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
        <Card type="specific" />
        <NumberInput
          className={styles.CardInput}
          maxValue={9999}
          minValue={0}
          onChange={(cards: number) =>
            setStats({
              ...stats,
              cards,
            })
          }
          value={stats?.cards}
        />
      </label>
      {cost.goldNeeded > 0 && (
        <div className={styles.Costs}>
          <div className={styles.Cost}>
            <Card type="specific" /> {formatNumber(cost.cardsNeeded)}
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
