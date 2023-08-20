export type Ship = {
  description?: string;
  id: string;
  imageName?: string;
  name: string;
  previousName?: string;
};

export type Tier1Ship = Ship & {
  unlockedBy?: string;
};

export type Tier2Ship = Ship & {
  createdByMerging: string[];
};

export function isTier1Ship(ship: Ship): ship is Tier1Ship {
  return !isTier2Ship(ship);
}

export function isTier2Ship(ship: Ship): ship is Tier2Ship {
  return ship.hasOwnProperty("createdByMerging");
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
