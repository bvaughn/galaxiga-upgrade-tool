import { useCategory } from "./useCategory";
import { Tiers, useShowTier } from "./useShowTier";

import { TIER_1_DRONES, TIER_2_DRONES } from "../data/drones";
import { TIER_1_SHIPS, TIER_2_SHIPS } from "../data/ships";
import { TIER_1_STONES, TIER_2_STONES } from "../data/stones";
import { Category, Item } from "../types";

export function useItems(
  options: {
    category?: Category;
    showTier?: Tiers;
  } = {}
): Item[] {
  const [category] = useCategory();
  const [showTier] = useShowTier();

  switch (options.showTier ?? showTier) {
    case "tier-1": {
      switch (options.category ?? category) {
        case "drone":
          return TIER_1_DRONES;
        case "ship":
          return TIER_1_SHIPS;
        case "stone":
          return TIER_1_STONES;
      }
      break;
    }
    case "tier-2": {
      switch (options.category ?? category) {
        case "drone":
          return TIER_2_DRONES;
        case "ship":
          return TIER_2_SHIPS;
        case "stone":
          return TIER_2_STONES;
      }
      break;
    }
  }
}
