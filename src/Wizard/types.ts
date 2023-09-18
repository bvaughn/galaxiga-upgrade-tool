import { ItemStats } from "../hooks/useItemStats";
import { Category, Item } from "../types";

export type WizardDataCreateTier2 = {
  action: "create-tier-2";
  category: Category;
  genericCards: number;
  id: string;
  primaryItem: Item;
  secondaryItemStats: ItemStats[];
};

export type WizardDataCreateTier3 = {
  action: "create-tier-3";
  category: Category;
  genericCards: number;
  id: string;
  secondaryItems: Item[];
  secondaryItemStats: ItemStats[];
};

export type WizardDataUpgrade = {
  action: "upgrade-tier-1" | "upgrade-tier-2" | "upgrade-tier-3";
  category: Category;
  genericCards: number;
  id: string;
  itemStatsFrom: ItemStats;
  itemStatsTo: ItemStats;
  primaryItem: Item;
};

export type WizardData =
  | WizardDataCreateTier2
  | WizardDataCreateTier3
  | WizardDataUpgrade;

export function isWizardDataCreateTier2(
  value: WizardData
): value is WizardDataCreateTier2 {
  return value.action === "create-tier-2";
}

export function isWizardDataCreateTier3(
  value: WizardData
): value is WizardDataCreateTier3 {
  return value.action === "create-tier-3";
}

export function isWizardDataUpgrade(
  value: WizardData
): value is WizardDataUpgrade {
  return (
    value.action === "upgrade-tier-1" ||
    value.action === "upgrade-tier-2" ||
    value.action === "upgrade-tier-3"
  );
}

export type PendingUpgradeData = Partial<WizardDataUpgrade> & {
  id: string;
};
export type PendingCreateTier2Data = Partial<WizardDataCreateTier2> & {
  id: string;
};
export type PendingCreateTier3Data = Partial<WizardDataCreateTier3> & {
  id: string;
};

export type PendingWizardData =
  | PendingUpgradeData
  | PendingCreateTier2Data
  | PendingCreateTier3Data;

export type WizardDataStep = 1 | 2 | 3 | 4;

export function isPendingUpgradeData(
  value: PendingWizardData
): value is PendingUpgradeData {
  return (
    value.action === "upgrade-tier-1" ||
    value.action === "upgrade-tier-2" ||
    value.action === "upgrade-tier-3"
  );
}

export function isPendingCreateTier2Data(
  value: PendingWizardData
): value is PendingCreateTier2Data {
  return value.action === "create-tier-2";
}

export function isPendingCreateTier3Data(
  value: PendingWizardData
): value is PendingCreateTier3Data {
  return value.action === "create-tier-3";
}
