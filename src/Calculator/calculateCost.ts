import {
  MAX_LEVEL,
  MAX_UPGRADE,
  TIER_1_SHIP_AND_STONE,
} from "../data/upgrade-costs";
import { Tier1ItemStats } from "./useTier1ItemStats";

export type Cost = {
  boxesNeeded: number;
  cardsNeeded: number;
  gemsNeeded: {
    forCards: number;
    forLevels: number;
  };
  goldNeeded: number;
};

export function calculateCost(
  stats: Tier1ItemStats,
  category: "drone" | "ship"
): Cost {
  let cardsNeeded = 0;
  let gemsNeededForLevels = 0;
  let goldNeeded = 0;

  // let todo = `level: ${stats.level}, upgrade: ${stats.upgrade}`;
  for (let levelIndex = stats.level; levelIndex < MAX_LEVEL; levelIndex++) {
    // todo += `\n  level: ${levelIndex + 1}`;
    const levelCosts = TIER_1_SHIP_AND_STONE[levelIndex];

    cardsNeeded += levelCosts.cardCost;
    gemsNeededForLevels += levelCosts.gemCost;

    for (
      let goldCostIndex = levelIndex === stats.level ? stats.upgrade : 0;
      goldCostIndex < MAX_UPGRADE;
      goldCostIndex++
    ) {
      // todo += `\n    upgrade: ${goldCostIndex + 1}`;
      goldNeeded += levelCosts.goldCosts[goldCostIndex];
    }
  }

  // Factor in cards we already have
  cardsNeeded = Math.max(0, cardsNeeded - stats.cards);

  // Assumes 50 cards per box; this varies based on the type of box
  let boxesNeeded = Math.ceil(cardsNeeded / 50);

  // Assumes item-specific box type
  let boxCost = category === "drone" ? 140 : 280;
  let gemsNeededForCards = boxesNeeded * boxCost;

  // console.log(todo);
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
