export type Category = "drone" | "ship" | "stone";
export type Tier = 1 | 2 | 3;

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

export function isTier1Item(item: Item): item is Tier1Item {
  return !isTier2Item(item);
}

export function isTier2Item(item: Item): item is Tier2Item {
  return item.hasOwnProperty("createdByMerging");
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
