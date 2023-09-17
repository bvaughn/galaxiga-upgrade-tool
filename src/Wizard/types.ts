import { ItemStats } from "../hooks/useItemStats";
import { Category, Item } from "../types";

export type WizardDataCreate = {
  action: "create-tier-2";
  category: Category;
  genericCards: number;
  id: string;
  primaryItem: Item;
  secondaryItemStats: ItemStats[];
};

export type WizardDataUpgrade = {
  action: "upgrade-tier-1" | "upgrade-tier-2";
  category: Category;
  genericCards: number;
  id: string;
  itemStatsFrom: ItemStats;
  itemStatsTo: ItemStats;
  primaryItem: Item;
};

export type WizardData = WizardDataCreate | WizardDataUpgrade;

export type PendingWizardData = Partial<WizardData> & {
  id: string;
};

export type WizardDataStep = 1 | 2 | 3 | 4;

export function isWizardDataCreate(
  value: WizardData
): value is WizardDataCreate {
  return value.action === "create-tier-2";
}

export function isWizardDataUpgrade(
  value: WizardData
): value is WizardDataUpgrade {
  return value.action === "upgrade-tier-1" || value.action === "upgrade-tier-2";
}
