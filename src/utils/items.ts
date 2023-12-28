import {
  TIER_1_DRONES,
  TIER_2_DRONES,
  TIER_3_DRONES,
  TIER_4_DRONES,
  TIER_5_DRONES,
} from "../data/drones";
import {
  TIER_1_SHIPS,
  TIER_2_SHIPS,
  TIER_3_SHIPS,
  TIER_4_SHIPS,
  TIER_5_SHIPS,
} from "../data/ships";
import {
  TIER_1_STONES,
  TIER_2_STONES,
  TIER_3_STONES,
  TIER_4_STONES,
  TIER_5_STONES,
} from "../data/stones";
import { Category, Item, Tier } from "../types";
import { assert } from "./assert";

export function getItem(category: Category, tier: Tier, id: string): Item {
  const items = getItems(category, tier);
  const item = items.find((item) => item.id === id);
  assert(item);
  return item;
}

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
        case 4:
          return TIER_4_DRONES;
        case 5:
          return TIER_5_DRONES;
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
        case 4:
          return TIER_4_SHIPS;
        case 5:
          return TIER_5_SHIPS;
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
        case 4:
          return TIER_4_STONES;
        case 5:
          return TIER_5_STONES;
      }
      break;
  }

  throw Error(`Unknown category: ${category} and tier: ${tier}`);
}
