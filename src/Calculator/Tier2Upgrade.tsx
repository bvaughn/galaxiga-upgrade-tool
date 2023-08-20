import { useMemo, useState } from "react";
import { TIER_1_SHIPS } from "../data/ships";
import { Tier2Ship } from "../types";
import { Card } from "./Card";
import { Coin } from "./Coin";
import { Gem } from "./Gem";
import { Image } from "./Image";
import { Tier1CurrentStats } from "./Tier1CurrentStats";

import { formatNumber } from "../utils/number";
import styles from "./Tier2Upgrade.module.css";
import { Cost, calculateCost } from "./calculateCost";
import { useTier1ShipStats } from "./useTier1ShipStats";
import useLocalStorage from "../hooks/useLocalStorage";

export function Tier2Upgrade({ tier2Ship }: { tier2Ship: Tier2Ship }) {
  const [ship1Stats] = useTier1ShipStats(tier2Ship.createdByMerging[0]);
  const [ship2Stats] = useTier1ShipStats(tier2Ship.createdByMerging[1]);
  const [numGenericCards] = useLocalStorage<number>("num-generic-cards", 0);
  const [buyCards] = useLocalStorage<boolean>("buy-cards-with-gems", false);

  const cost1 = useMemo<Cost>(() => calculateCost(ship1Stats), [ship1Stats]);
  const cost2 = useMemo<Cost>(() => calculateCost(ship2Stats), [ship2Stats]);

  const isComplete = cost1.goldNeeded === 0 && cost2.goldNeeded === 0;

  // Only count the generic cards once
  const cardsNeeded = cost1.cardsNeeded + cost2.cardsNeeded + numGenericCards;
  const goldNeeded = cost1.goldNeeded + cost2.goldNeeded;

  let gemsNeeded = cost1.gemsNeeded.forLevels + cost2.gemsNeeded.forLevels;
  if (buyCards) {
    gemsNeeded += cost1.gemsNeeded.forCards + cost2.gemsNeeded.forCards;
  }

  return (
    <div className={styles.Container} data-complete={isComplete || undefined}>
      <div className={styles.Description}>
        {tier2Ship.imageName && (
          <Image className={styles.Image} imageName={tier2Ship.imageName} />
        )}
        <div className={styles.Column}>
          <div className={styles.Name}>{tier2Ship.name}</div>
          {isComplete || (
            <>
              <div className={styles.Costs}>
                <div
                  className={styles.Cost}
                  data-disabled={buyCards || undefined}
                >
                  <Card type="generic" />
                  {buyCards ? "N/A" : formatNumber(cardsNeeded)}
                </div>
                <div className={styles.Cost}>
                  <Gem /> {formatNumber(gemsNeeded)}
                </div>
                <div className={styles.Cost}>
                  <Coin /> {formatNumber(goldNeeded)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.ShipContainer}>
        {tier2Ship.createdByMerging.map((id) => (
          <Tier1CurrentStats
            key={id}
            tier1Ship={TIER_1_SHIPS.find((ship) => ship.id === id)!}
          />
        ))}
      </div>
    </div>
  );
}
