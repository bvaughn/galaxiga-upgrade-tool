import { Category, Item, ItemStats } from "../types";

export type CreateTier2Item = {
  category: Category;
  id: string;
  itemStats: ItemStats[];
  primaryItem: Item;
  type: "create-tier-2";
};

export type CreateTier3Item = {
  category: Category;
  id: string;
  itemStats: ItemStats[];
  secondaryItems: Item[];
  type: "create-tier-3";
};

export type CreateTier4Item = {
  category: Category;
  id: string;
  itemStats: ItemStats;
  primaryItem: Item;
  type: "create-tier-4";
};

export type CreateTier5Item = {
  category: Category;
  id: string;
  itemStats: ItemStats;
  primaryItem: Item;
  type: "create-tier-5";
};

export type UpgradeItem = {
  category: Category;
  id: string;
  itemStatsFrom: ItemStats;
  itemStatsTo: ItemStats;
  primaryItem: Item;
  type:
    | "upgrade-tier-1"
    | "upgrade-tier-2"
    | "upgrade-tier-3"
    | "upgrade-tier-4"
    | "upgrade-tier-5";
};

export type CreateItem =
  | CreateTier2Item
  | CreateTier3Item
  | CreateTier4Item
  | CreateTier5Item;

export type Action = CreateItem | UpgradeItem;

export type FormData = {
  actions: Action[];
  pendingAction: PendingAction;
  step: number;
};

export function isCreateTier2Item(action: Action): action is CreateTier2Item {
  return action.type === "create-tier-2";
}

export function isCreateTier3Item(action: Action): action is CreateTier3Item {
  return action.type === "create-tier-3";
}

export function isCreateTier4Item(action: Action): action is CreateTier4Item {
  return action.type === "create-tier-4";
}

export function isCreateTier5Item(action: Action): action is CreateTier5Item {
  return action.type === "create-tier-5";
}

export function isUpgradeItem(action: Action): action is UpgradeItem {
  return (
    action.type === "upgrade-tier-1" ||
    action.type === "upgrade-tier-2" ||
    action.type === "upgrade-tier-3" ||
    action.type === "upgrade-tier-4" ||
    action.type === "upgrade-tier-5"
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
export type PendingCreateTier4Item = Partial<CreateTier4Item> & {
  id: string;
};
export type PendingCreateTier5Item = Partial<CreateTier5Item> & {
  id: string;
};

export type PendingAction =
  | PendingUpgradeItem
  | PendingCreateTier2Item
  | PendingCreateTier3Item
  | PendingCreateTier4Item
  | PendingCreateTier5Item;

export type WizardDataStep = 1 | 2 | 3 | 4;

export function isPendingUpgradeItem(
  value: PendingAction
): value is PendingUpgradeItem {
  return (
    value.type === "upgrade-tier-1" ||
    value.type === "upgrade-tier-2" ||
    value.type === "upgrade-tier-3" ||
    value.type === "upgrade-tier-4" ||
    value.type === "upgrade-tier-5"
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

export function isPendingCreateTier4Item(
  value: PendingAction
): value is PendingCreateTier4Item {
  return value.type === "create-tier-4";
}

export function isPendingCreateTier5Item(
  value: PendingAction
): value is PendingCreateTier5Item {
  return value.type === "create-tier-5";
}
