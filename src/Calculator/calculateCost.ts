import {
  MAX_LEVEL,
  MAX_UPGRADE,
  TIER_1_SHIP_AND_STONE,
} from "../data/upgrade-costs";
import { Tier1ShipStats } from "./types";

export type Cost = {
  boxesNeeded: number;
  cardsNeeded: number;
  gemsNeeded: {
    forCards: number;
    forLevels: number;
  };
  goldNeeded: number;
};

export function calculateCost(stats: Tier1ShipStats): Cost {
  let cardsNeeded = 0;
  let gemsNeededForLevels = 0;
  let goldNeeded = 0;

  const firstLevelIndex = stats.level;
  const firstUpgradeIndex = stats.upgrade;

  for (let levelIndex = firstLevelIndex; levelIndex < MAX_LEVEL; levelIndex++) {
    const levelCosts = TIER_1_SHIP_AND_STONE[levelIndex];

    cardsNeeded += levelCosts.cardCost;
    gemsNeededForLevels += levelCosts.gemCost;

    for (
      let goldCostIndex =
        levelIndex === firstLevelIndex ? firstUpgradeIndex : 0;
      goldCostIndex < MAX_UPGRADE;
      goldCostIndex++
    ) {
      goldNeeded += levelCosts.goldCosts[goldCostIndex];
    }
  }

  // Factor in cards we already have
  cardsNeeded = Math.max(0, cardsNeeded - stats.cards);

  // Assumes 50 cards per box; this varies based on the type of box
  let boxesNeeded = Math.ceil(cardsNeeded / 50);

  // Assumes ship box type
  let gemsNeededForCards = boxesNeeded * 280;

  console.log("calculateCost()\nstats:", stats, "\ncost:", {
    boxesNeeded,
    cardsNeeded,
    gemsNeeded: {
      forCards: gemsNeededForCards,
      forLevels: gemsNeededForLevels,
    },
    goldNeeded,
  });
  return {
    boxesNeeded,
    cardsNeeded,
    gemsNeeded: {
      forCards: gemsNeededForCards,
      forLevels: gemsNeededForLevels,
    },
    goldNeeded,
  };
}
