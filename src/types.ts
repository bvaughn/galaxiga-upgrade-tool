export type Item = {
  description?: string;
  id: string;
  name: string;
  previousName?: string;
};

export type Tier1Item = Item & {
  unlockedBy?: string;
};

export type Tier2Item = Item & {
  createdByMerging: string[];
};

export function isTier1Item(item: Item): item is Tier1Item {
  return !isTier2Item(item);
}

export function isTier2Item(item: Item): item is Tier2Item {
  return item.hasOwnProperty("createdByMerging");
}

// Each evolution level costs a fixed number of cards and gems.
// There are also 10 incremental upgrade within a level, each of which costs gold.
export type LevelUpgradeCost = {
  cardCost: number;
  gemCost: number;
  goldCosts: [
    upgrade1: number,
    upgrade2: number,
    upgrade3: number,
    upgrade4: number,
    upgrade5: number,
    upgrade6: number,
    upgrade7: number,
    upgrade8: number,
    upgrade9: number,
    upgrade10: number
  ];
};
