import { Category, Item, ItemStats } from "../types";

export type CreateTier2Item = {
  category: Category;
  id: string;
  primaryItem: Item;
  secondaryItemStats: ItemStats[];
  type: "create-tier-2";
};

export type CreateTier3Item = {
  category: Category;
  id: string;
  secondaryItems: Item[];
  secondaryItemStats: ItemStats[];
  type: "create-tier-3";
};

export type UpgradeItem = {
  category: Category;
  id: string;
  itemStatsFrom: ItemStats;
  itemStatsTo: ItemStats;
  primaryItem: Item;
  type: "upgrade-tier-1" | "upgrade-tier-2" | "upgrade-tier-3";
};

export type Action = CreateTier2Item | CreateTier3Item | UpgradeItem;

export function isCreateTier2Item(action: Action): action is CreateTier2Item {
  return action.type === "create-tier-2";
}

export function isCreateTier3Item(action: Action): action is CreateTier3Item {
  return action.type === "create-tier-3";
}

export function isUpgradeItem(action: Action): action is UpgradeItem {
  return (
    action.type === "upgrade-tier-1" ||
    action.type === "upgrade-tier-2" ||
    action.type === "upgrade-tier-3"
  );
}

export type PendingUpgradeItem = Partial<UpgradeItem> & {
  id: string;
};
export type PendingCreateTier2Item = Partial<CreateTier2Item> & {
  id: string;
};
export type PendingCreateTier3Item = Partial<CreateTier3Item> & {
  id: string;
};

export type PendingAction =
  | PendingUpgradeItem
  | PendingCreateTier2Item
  | PendingCreateTier3Item;

export type WizardDataStep = 1 | 2 | 3 | 4;

export function isPendingUpgradeItem(
  value: PendingAction
): value is PendingUpgradeItem {
  return (
    value.type === "upgrade-tier-1" ||
    value.type === "upgrade-tier-2" ||
    value.type === "upgrade-tier-3"
  );
}

export function isPendingCreateTier2Item(
  value: PendingAction
): value is PendingCreateTier2Item {
  return value.type === "create-tier-2";
}

export function isPendingCreateTier3Item(
  value: PendingAction
): value is PendingCreateTier3Item {
  return value.type === "create-tier-3";
}
