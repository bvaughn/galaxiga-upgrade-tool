import { UpgradeItem } from "../Wizard/types";
import { UpgradeCost, calculateUpgradeCost } from "./calculateUpgradeCost";

export function calculateUpgradeItemCost(action: UpgradeItem): UpgradeCost {
  const {
    itemStatsFrom: fromStats,
    itemStatsTo: toStats,
    primaryItem: item,
  } = action;
  const { category, tier } = item;

  return calculateUpgradeCost(fromStats, toStats, category, tier);
}
