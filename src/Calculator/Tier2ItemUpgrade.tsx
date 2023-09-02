import { useMemo } from "react";
import { Card } from "../components/Card";
import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { ItemImage } from "../components/ItemImage";
import { TIER_1_DRONES } from "../data/drones";
import { TIER_1_SHIPS } from "../data/ships";
import { Category, Tier1Item, Tier2Item } from "../types";
import { Tier1ItemUpgrade } from "./Tier1ItemUpgrade";

import { Icon } from "../components/Icon";
import { TIER_1_STONES } from "../data/stones";
import useLocalStorage from "../hooks/useLocalStorage";
import { formatNumber } from "../utils/number";
import styles from "./Tier2ItemUpgrade.module.css";
import { Cost, calculateCost } from "./calculateCost";
import { useBuyCardsWithGems } from "./useBuyCardsWithGems";
import { useItemStats } from "./useItemStats";
import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";

export function Tier2ItemUpgrade({
  category,
  tier2Item,
}: {
  category: Category;
  tier2Item: Tier2Item;
}) {
  const [item1Stats] = useItemStats(tier2Item.createdByMerging[0]);
  const [item2Stats] = useItemStats(tier2Item.createdByMerging[1]);
  const [numGenericCards] = useLocalStorage<number>(
    `num-generic-${category}-cards`,
    0
  );
  const [buyCardsWithGems] = useBuyCardsWithGems();

  const costForItem1 = useMemo<Cost>(
    () => calculateCost(item1Stats, category, 1),
    [category, item1Stats]
  );
  const costForItem2 = useMemo<Cost>(
    () => calculateCost(item2Stats, category, 1),
    [category, item2Stats]
  );

  const cannotSafelyEstimate =
    !costForItem1.isEstimateComplete || !costForItem2.isEstimateComplete;

  const isComplete =
    item1Stats.level === MAX_LEVEL_NUMBER &&
    item1Stats.subLevel === MAX_SUB_LEVEL_NUMBER &&
    item2Stats.level === MAX_LEVEL_NUMBER &&
    item2Stats.subLevel === MAX_SUB_LEVEL_NUMBER;

  // Generic cards have not yet been factored into the cost of tier 1 items
  const cardsNeeded = Math.max(
    0,
    buyCardsWithGems
      ? costForItem1.boxes.with.cardsNeededForLevels +
          costForItem2.boxes.with.cardsNeededForLevels -
          numGenericCards
      : costForItem1.boxes.without.cardsNeededForLevels +
          costForItem2.boxes.without.cardsNeededForLevels -
          numGenericCards
  );
  const coinsNeeded = buyCardsWithGems
    ? costForItem1.boxes.with.coinsNeededForLevels +
      costForItem2.boxes.with.coinsNeededForLevels
    : costForItem1.boxes.without.coinsNeededForLevels +
      costForItem2.boxes.without.coinsNeededForLevels;
  const gemsNeeded =
    costForItem1.gemsNeededToMerge! +
    (buyCardsWithGems
      ? costForItem1.boxes.with.gemsNeededForLevels +
        costForItem2.boxes.with.gemsNeededForLevels
      : costForItem1.boxes.without.gemsNeededForLevels +
        costForItem2.boxes.without.gemsNeededForLevels);

  let tier1Items: Tier1Item[];
  switch (category) {
    case "drone":
      tier1Items = TIER_1_DRONES;
      break;
    case "ship":
      tier1Items = TIER_1_SHIPS;
      break;
    case "stone":
      tier1Items = TIER_1_STONES;
      break;
  }

  return (
    <div className={styles.Container} data-complete={isComplete || undefined}>
      <div className={styles.Description}>
        <ItemImage
          category={category}
          className={styles.Image}
          item={tier2Item}
        />
        <div
          className={styles.Column}
          data-is-complete={isComplete || undefined}
        >
          <div className={styles.Name}>{tier2Item.name}</div>
          <div className={styles.Costs}>
            {cannotSafelyEstimate && (
              <div title="Estimate might not include cost of acquiring all tier 1 items">
                <Icon className={styles.CannotSafelyEstimate} type="warn" />
              </div>
            )}
            <div
              className={styles.Cost}
              data-disabled={cardsNeeded === 0 ? "" : undefined}
              title={`${formatNumber(cardsNeeded, "long")} cards`}
            >
              <Card type="generic" category={category} />
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
      </div>
      <div className={styles.ItemContainer}>
        {tier2Item.createdByMerging.map((id) => {
          const tier1Item = tier1Items.find((item) => item.id === id)!;

          return (
            <Tier1ItemUpgrade
              category={category}
              key={id}
              tier1Item={tier1Item}
            />
          );
        })}
      </div>
    </div>
  );
}
