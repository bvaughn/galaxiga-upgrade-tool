import { TIER_1_DRONES, TIER_2_DRONES, TIER_3_DRONES } from "../data/drones";
import { TIER_1_SHIPS, TIER_2_SHIPS, TIER_3_SHIPS } from "../data/ships";
import { TIER_1_STONES, TIER_2_STONES, TIER_3_STONES } from "../data/stones";
import { Category, Item, Tier } from "../types";

export function getItems(category: Category, tier: Tier): Item[] {
  switch (category) {
    case "drone":
      switch (tier) {
        case 1:
          return TIER_1_DRONES;
        case 2:
          return TIER_2_DRONES;
        case 3:
          return TIER_3_DRONES;
      }
      break;
    case "ship":
      switch (tier) {
        case 1:
          return TIER_1_SHIPS;
        case 2:
          return TIER_2_SHIPS;
        case 3:
          return TIER_3_SHIPS;
      }
      break;
    case "stone":
      switch (tier) {
        case 1:
          return TIER_1_STONES;
        case 2:
          return TIER_2_STONES;
        case 3:
          return TIER_3_STONES;
      }
      break;
  }

  throw Error(`Unknown category: ${category} and tier: ${tier}`);
}
