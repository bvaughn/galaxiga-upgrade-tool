import { GEMS_TO_MERGE } from "../data/upgrade-costs";
import { Category, ItemStats, MAX_STATS, Tier } from "../types";
import { UpgradeCost, calculateUpgradeCost } from "./calculateUpgradeCost";

export type CreateCost = UpgradeCost & {
  gemsNeededToMerge: number;
};

export function calculateCreateCost({
  category,
  itemStatsArray,
  tier,
}: {
  category: Category;
  itemStatsArray: ItemStats[];
  tier: Tier;
}): CreateCost {
  const cost: CreateCost = {
    boxes: {
      with: {
        cardsNeededForLevels: 0,
        coinsNeededForLevels: 0,
        gemsNeededForLevels: 0,
      },
      without: {
        cardsNeededForLevels: 0,
        coinsNeededForLevels: 0,
        gemsNeededForLevels: 0,
      },
    },
    gemsNeededToMerge: 0,
    isEstimateComplete: true,
    totalCardsRequired: 0,
  };

  for (let index = 0; index < itemStatsArray.length; index++) {
    const itemStats = itemStatsArray[index];

    const itemCost = calculateUpgradeCost(
      itemStats,
      MAX_STATS,
      category,
      (tier - 1) as Tier
    );

    cost.boxes.with.cardsNeededForLevels +=
      itemCost.boxes.with.cardsNeededForLevels;
    cost.boxes.with.coinsNeededForLevels +=
      itemCost.boxes.with.coinsNeededForLevels;
    cost.boxes.with.gemsNeededForLevels +=
      itemCost.boxes.with.gemsNeededForLevels;

    cost.boxes.without.cardsNeededForLevels +=
      itemCost.boxes.without.cardsNeededForLevels;
    cost.boxes.without.coinsNeededForLevels +=
      itemCost.boxes.without.coinsNeededForLevels;
    cost.boxes.without.gemsNeededForLevels +=
      itemCost.boxes.without.gemsNeededForLevels;

    cost.totalCardsRequired += itemCost.totalCardsRequired;

    if (!itemCost.isEstimateComplete) {
      cost.isEstimateComplete = false;
    }
  }

  cost.gemsNeededToMerge = GEMS_TO_MERGE[category][tier - 1];

  return cost;
}
