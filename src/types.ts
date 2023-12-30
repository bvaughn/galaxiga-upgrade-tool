import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "./data/upgrade-costs";

export type Category = "drone" | "ship" | "stone";
export type Tier = 1 | 2 | 3 | 4 | 5;

export type Item = {
  category: Category;
  description?: string;
  id: string;
  name: string;
  previousName?: string;
  tier: Tier;
};

export type Tier1Item = Item & {
  unlockedBy?: string;
  tier: 1;
};

export type Tier2Item = Item & {
  createdByMerging: string[];
  tier: 2;
};

export type Tier3Item = Item & {
  createdByMerging: string[];
  tier: 3;
};

export type Tier4Item = Item & {
  createdByMerging: string[];
  tier: 4;
};

export type Tier5Item = Item & {
  createdByMerging: string[];
  tier: 5;
};

export function isTier1Item(item: Item): item is Tier1Item {
  return item.tier === 1;
}

export function isTier2Item(item: Item): item is Tier2Item {
  return item.tier === 2;
}

export function isTier3Item(item: Item): item is Tier1Item {
  return item.tier === 3;
}

// Each evolution level costs a fixed number of cards and gems.
// There are also 10 incremental upgrades within a level, each of which costs coins.
export type LevelUpgradeCost = {
  cardCost: number;
  gemCost: number;
  coinsCosts: [
    subLevel1: number,
    subLevel2: number,
    subLevel3: number,
    subLevel4: number,
    subLevel5: number,
    subLevel6: number,
    subLevel7: number,
    subLevel8: number,
    subLevel9: number,
    subLevel10: number
  ];
};

export type ItemStats = {
  level: number;
  subLevel: number;
};

export const MAX_STATS: ItemStats = {
  level: MAX_LEVEL_NUMBER,
  subLevel: MAX_SUB_LEVEL_NUMBER,
};

export const DEFAULT_ITEM_STATS: ItemStats = {
  level: 0,
  subLevel: 0,
};
