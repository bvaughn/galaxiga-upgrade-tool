import { MAX_LEVEL, MAX_UPGRADE } from "../data/upgrade-costs";
import { Tier1Ship } from "../types";
import { formatNumber } from "../utils/number";
import { Image } from "./Image";
import { Cost, calculateCost } from "./calculateCost";
import { useTier1ShipStats } from "./useTier1ShipStats";

import { useMemo } from "react";
import styles from "./Tier1CurrentStats.module.css";

export function Tier1CurrentStats({ tier1Ship }: { tier1Ship: Tier1Ship }) {
  const [stats, setStats] = useTier1ShipStats(tier1Ship.id);

  const cost = useMemo(() => calculateCost<Cost>(stats), [stats]);

  return (
    <div className={styles.Container}>
      {tier1Ship.imageName ? (
        <Image className={styles.Image} imageName={tier1Ship.imageName} />
      ) : (
        <div className={styles.ImagePlaceholder} />
      )}
      <div className={styles.Description}>
        <div className={styles.Column}>
          <div className={styles.Name}>{tier1Ship.name}</div>
          <div className={styles.LevelMarkers}>
            {"●".repeat(stats.level)}
            {"○".repeat(MAX_LEVEL - stats.level)}
          </div>
          <div className={styles.UpgradeMarkers}>
            {"▰".repeat(stats.upgrade)}
            <span className={styles.UpgradeMarkersInactive}>
              {"▰".repeat(MAX_UPGRADE - stats.upgrade)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.Inputs}>
        <label className={styles.Input}>
          <div className={styles.LevelMarkers}>●</div>
          <NumberInput
            maxValue={MAX_LEVEL}
            minValue={0}
            onChange={(level: number) =>
              setStats({
                ...stats,
                level,
              })
            }
            value={stats?.level}
          />
        </label>
        <label className={styles.Input}>
          <div className={styles.UpgradeMarkers}>▰</div>
          <NumberInput
            maxValue={MAX_UPGRADE}
            minValue={0}
            onChange={(upgrade: number) =>
              setStats({
                ...stats,
                upgrade,
              })
            }
            value={stats?.upgrade}
          />
        </label>
      </div>
      <label className={styles.CardInputLabel}>
        🃏
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
          <div>🃏 {formatNumber(cost.cardsNeeded)}</div>
          <div>💎 {formatNumber(cost.gemsNeeded.forLevels)}</div>
          <div>🪙 {formatNumber(cost.goldNeeded)}</div>
        </div>
      )}
    </div>
  );
}

function NumberInput({
  className = "",
  maxValue,
  minValue,
  onChange,
  value,
}: {
  className?: string;
  maxValue: number;
  minValue: number;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <input
      className={`${styles.NumberInput} ${className}`}
      min={minValue}
      max={maxValue}
      onChange={({ target }) => {
        onChange(
          Math.max(
            minValue,
            Math.min(maxValue, parseInt(target.value || "0", 10))
          )
        );
      }}
      type="number"
      value={value}
    />
  );
}
