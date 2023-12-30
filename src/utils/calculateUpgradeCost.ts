import {
  CARDS_PER_BOX,
  COINS_PER_BOX,
  COST_IN_GEMS_PER_BOX,
} from "../data/boxes";
import {
  CARDS_PER_LEVEL,
  COINS_PER_LEVEL,
  GEMS_PER_LEVEL,
  MAX_LEVEL_NUMBER,
  MAX_SUB_LEVEL_NUMBER,
} from "../data/upgrade-costs";
import { Category, ItemStats, Tier } from "../types";

const MAX_LEVEL_INDEX = MAX_LEVEL_NUMBER - 1;
const MAX_SUB_LEVEL_INDEX = MAX_SUB_LEVEL_NUMBER - 1;

export type UpgradeCost = {
  boxes: {
    with: {
      cardsNeededForLevels: number;
      coinsNeededForLevels: number;
      gemsNeededForLevels: number;
    };
    without: {
      cardsNeededForLevels: number;
      coinsNeededForLevels: number;
      gemsNeededForLevels: number;
    };
  };
  isEstimateComplete: boolean;
  totalCardsRequired: number;
};

export function calculateUpgradeCost(
  fromStats: ItemStats,
  toStats: Pick<ItemStats, "level" | "subLevel">,
  category: Category,
  tier: Tier
): UpgradeCost {
  let cardsNeededForLevels = 0;
  let gemsNeededForLevels = 0;
  let coinsNeededForLevels = 0;
  let totalCardsRequired = 0;

  // If an item has not yet been acquired,
  // We can't calculate the cost because we don't know how much it takes to acquire it
  const isEstimateComplete = fromStats.level > 0;

  const tierIndex = tier - 1;

  const cardsPerLevel = CARDS_PER_LEVEL[tierIndex];
  const coinsPerLevel = COINS_PER_LEVEL[category][tierIndex];
  const gemsPerLevel = GEMS_PER_LEVEL[category][tierIndex];

  const firstLevelIndex = Math.max(0, fromStats.level - 1);
  const lastLevelIndex = Math.min(MAX_LEVEL_INDEX, toStats.level - 1);

  for (
    let levelIndex = firstLevelIndex;
    levelIndex <= lastLevelIndex;
    levelIndex++
  ) {
    if (levelIndex > firstLevelIndex) {
      totalCardsRequired += cardsPerLevel[levelIndex];
      gemsNeededForLevels += gemsPerLevel[levelIndex];
    }

    for (
      let upgradeIndex =
        levelIndex === firstLevelIndex ? fromStats.subLevel : 0;
      upgradeIndex <=
      (levelIndex === lastLevelIndex
        ? toStats.subLevel - 1
        : MAX_SUB_LEVEL_INDEX);
      upgradeIndex++
    ) {
      const coins = coinsPerLevel[levelIndex][upgradeIndex];

      coinsNeededForLevels += coins;
    }
  }

  cardsNeededForLevels = totalCardsRequired;

  let boxesNeeded = NaN;
  let coinsFromBoxesProjected = NaN;
  let gemsNeededForCards = NaN;

  const cardsPerBox = CARDS_PER_BOX[category];
  const coinsPerBox = COINS_PER_BOX[category];
  const costPerBox = COST_IN_GEMS_PER_BOX[category];
  if (cardsPerBox && coinsPerBox && costPerBox) {
    const genericCardsPerBoxAverage =
      (cardsPerBox.generic[0] + cardsPerBox.generic[1]) / 2;
    const specificCardsPerBoxAverage =
      (cardsPerBox.specific[0] + cardsPerBox.specific[1]) / 2;
    const cardsPerBoxAverage =
      genericCardsPerBoxAverage + specificCardsPerBoxAverage;
    const coinsPerBoxAverage = (coinsPerBox[0] + coinsPerBox[1]) / 2;

    boxesNeeded = Math.ceil(cardsNeededForLevels / cardsPerBoxAverage);
    gemsNeededForCards = boxesNeeded * costPerBox;
    coinsFromBoxesProjected = coinsPerBoxAverage * boxesNeeded;
  }

  return {
    boxes: {
      with: {
        cardsNeededForLevels: 0,
        coinsNeededForLevels: Math.max(
          0,
          coinsNeededForLevels - coinsFromBoxesProjected
        ),
        gemsNeededForLevels: gemsNeededForLevels + gemsNeededForCards,
      },
      without: {
        cardsNeededForLevels,
        coinsNeededForLevels,
        gemsNeededForLevels,
      },
    },
    isEstimateComplete,
    totalCardsRequired,
  };
}
