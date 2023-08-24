import {
  MAX_LEVEL_NUMBER,
  MAX_SUB_LEVEL_NUMBER,
  CARDS_PER_LEVEL,
  COINS_PER_LEVEL,
  GEMS_PER_LEVEL,
  GEMS_TO_MERGE,
} from "../data/upgrade-costs";
import { Tier1ItemStats } from "./useTier1ItemStats";

const MAX_LEVEL_INDEX = MAX_LEVEL_NUMBER - 1;
const MAX_UPGRADE_INDEX = MAX_SUB_LEVEL_NUMBER - 1;

export type Cost = {
  boxesNeeded: number;
  cardsNeeded: number;
  gemsNeeded: {
    forCards: number;
    forLevels: number;
    forMerge: number;
  };
  coinsNeeded: number;
};

export function calculateCost(
  stats: Tier1ItemStats,
  category: "drone" | "ship"
): Cost {
  if (stats.level === 0) {
    // This item has not yet been acquired
    // We can't calculate the cost because we don't know how much it takes to acquire it
    return {
      boxesNeeded: 0,
      cardsNeeded: 0,
      coinsNeeded: 0,
      gemsNeeded: {
        forCards: 0,
        forLevels: 0,
        forMerge: 0,
      },
    };
  }

  let cardsNeeded = 0;
  let gemsNeededForLevels = 0;
  let coinsNeeded = 0;

  // TODO Handle different tiers (via param)
  const cardsPerLevel = CARDS_PER_LEVEL[0];
  const coinsPerLevel = COINS_PER_LEVEL[category][0];
  const gemsPerLevel = GEMS_PER_LEVEL[category][0];
  const gemsNeededForMerge = GEMS_TO_MERGE[category][0];

  const firstLevelndex = stats.level - 1;

  for (
    let levelIndex = firstLevelndex;
    levelIndex <= MAX_LEVEL_INDEX;
    levelIndex++
  ) {
    if (levelIndex > firstLevelndex) {
      cardsNeeded += cardsPerLevel[levelIndex];
      gemsNeededForLevels += gemsPerLevel[levelIndex];
    }

    for (
      let upgradeIndex = levelIndex === firstLevelndex ? stats.subLevel : 0;
      upgradeIndex <= MAX_UPGRADE_INDEX;
      upgradeIndex++
    ) {
      const coins = coinsPerLevel[levelIndex][upgradeIndex];

      coinsNeeded += coins;
    }
  }

  // Factor in cards we already have
  // cardsNeeded = Math.max(0, cardsNeeded - stats.cards);

  // Assumes 50 cards per box; this varies based on the type of box
  // TODO Switch based on type of box
  let boxesNeeded = Math.ceil(cardsNeeded / 50);

  // Assumes item-specific box type
  // TODO Switch cost based on type of box
  let boxCost = category === "drone" ? 140 : 280;
  let gemsNeededForCards = boxesNeeded * boxCost;

  return {
    boxesNeeded,
    cardsNeeded,
    coinsNeeded,
    gemsNeeded: {
      forCards: gemsNeededForCards,
      forLevels: gemsNeededForLevels,
      forMerge: gemsNeededForMerge,
    },
  };
}
