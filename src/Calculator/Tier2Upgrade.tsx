import { useMemo } from "react";
import { Card } from "../components/Card";
import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { ShipImage } from "../components/ShipImage";
import { TIER_1_SHIPS } from "../data/ships";
import { Tier2Ship } from "../types";
import { Tier1CurrentStats } from "./Tier1CurrentStats";

import useLocalStorage from "../hooks/useLocalStorage";
import { formatNumber } from "../utils/number";
import styles from "./Tier2Upgrade.module.css";
import { Cost, calculateCost } from "./calculateCost";
import { useTier1ShipStats } from "./useTier1ShipStats";

export function Tier2Upgrade({ tier2Ship }: { tier2Ship: Tier2Ship }) {
  const [ship1Stats] = useTier1ShipStats(tier2Ship.createdByMerging[0]);
  const [ship2Stats] = useTier1ShipStats(tier2Ship.createdByMerging[1]);
  const [numGenericCards] = useLocalStorage<number>(
    "num-generic-ship-cards",
    0
  );
  const [buyCards] = useLocalStorage<boolean>("buy-cards-with-gems", false);

  const costForShip1 = useMemo<Cost>(
    () => calculateCost(ship1Stats),
    [ship1Stats]
  );
  const costForShip2 = useMemo<Cost>(
    () => calculateCost(ship2Stats),
    [ship2Stats]
  );

  const isComplete =
    costForShip1.goldNeeded === 0 && costForShip2.goldNeeded === 0;

  // Only count the generic cards once
  const cardsNeeded =
    costForShip1.cardsNeeded + costForShip2.cardsNeeded + numGenericCards;
  const goldNeeded = costForShip1.goldNeeded + costForShip2.goldNeeded;

  let gemsNeeded =
    costForShip1.gemsNeeded.forLevels + costForShip2.gemsNeeded.forLevels;
  if (buyCards) {
    gemsNeeded +=
      costForShip1.gemsNeeded.forCards + costForShip2.gemsNeeded.forCards;
  }

  return (
    <div className={styles.Container} data-complete={isComplete || undefined}>
      <div className={styles.Description}>
        {tier2Ship.imageName && (
          <ShipImage className={styles.Image} ship={tier2Ship} />
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
                  <Card category="generic" type="ship" />
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
