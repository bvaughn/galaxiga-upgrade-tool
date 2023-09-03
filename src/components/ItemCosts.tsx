import { useMemo } from "react";
import { useBuyCardsWithGems } from "../Calculator/useBuyCardsWithGems";
import { getItemStats } from "../hooks/useItemStats";
import { Item } from "../types";
import { Card } from "./Card";
import { Coin } from "./Coin";
import { Gem } from "./Gem";

import { calculateCost } from "../Calculator/calculateCost";
import useLocalStorage from "../hooks/useLocalStorage";
import { formatNumber } from "../utils/number";
import styles from "./ItemCosts.module.css";

export function ItemCosts({
  deductGenericCards,
  includeCostToMerge,
  items,
}: {
  deductGenericCards: boolean;
  includeCostToMerge: boolean;
  items: Item[];
}) {
  const { category } = items[0];

  const [buyCardsWithGems] = useBuyCardsWithGems();

  const [numGenericCards] = useLocalStorage<number>(
    `num-generic-${category}-cards`,
    0
  );

  const { cardsNeeded, coinsNeeded, gemsNeeded } = useMemo(() => {
    let cardsNeeded = 0;
    let coinsNeeded = 0;
    let gemsNeeded = 0;

    items.forEach((item, index) => {
      // TODO This won't re-trigger when the status change
      //      Use an effect with an event listener, like ItemUpgradePlanner
      const stats = getItemStats(item);

      const cost = calculateCost(stats, item.category, item.tier);

      if (includeCostToMerge && index === 0) {
        gemsNeeded += cost.gemsNeededToMerge ?? 0;
      }

      cardsNeeded += buyCardsWithGems
        ? cost.boxes.with.cardsNeededForLevels
        : cost.boxes.without.cardsNeededForLevels;
      coinsNeeded += buyCardsWithGems
        ? cost.boxes.with.coinsNeededForLevels
        : cost.boxes.without.coinsNeededForLevels;
      gemsNeeded += buyCardsWithGems
        ? cost.boxes.with.gemsNeededForLevels
        : cost.boxes.without.gemsNeededForLevels;
    });

    if (deductGenericCards) {
      cardsNeeded = Math.max(0, cardsNeeded - numGenericCards);
    }

    return {
      cardsNeeded,
      coinsNeeded,
      gemsNeeded,
    };
  }, [
    buyCardsWithGems,
    deductGenericCards,
    includeCostToMerge,
    items,
    numGenericCards,
  ]);

  return (
    <div className={styles.Costs}>
      <div
        className={styles.Cost}
        data-disabled={cardsNeeded === 0 ? "" : undefined}
        title={`${formatNumber(cardsNeeded, "long")} cards`}
      >
        <Card type="generic" category={category} /> {formatNumber(cardsNeeded)}
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
  );
}
