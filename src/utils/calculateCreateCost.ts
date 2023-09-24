import { GEMS_TO_MERGE } from "../data/upgrade-costs";
import { Category, ItemStats, MAX_STATS, Tier } from "../types";
import { UpgradeCost, calculateUpgradeCost } from "./calculateUpgradeCost";

export type CreateCost = UpgradeCost & {
  gemsNeededToMerge: number;
};

export function calculateCreateCost({
  genericCards,
  category,
  itemStatsArray,
  tier,
}: {
  genericCards: number;
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

    let allocatedGenericCards = 0;
    if (genericCards > 0) {
      const {
        boxes: {
          without: { cardsNeededForLevels },
        },
      } = calculateUpgradeCost(
        0, // Generic cards
        itemStats,
        MAX_STATS,
        category,
        (tier - 1) as Tier
      );

      if (cardsNeededForLevels > 0) {
        if (genericCards >= cardsNeededForLevels) {
          allocatedGenericCards = cardsNeededForLevels;
          genericCards -= allocatedGenericCards;
        } else {
          allocatedGenericCards = genericCards;
          genericCards = 0;
        }
      }
    }

    const itemCost = calculateUpgradeCost(
      allocatedGenericCards,
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
