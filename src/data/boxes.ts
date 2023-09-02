import { TIER_1_DRONES } from "./drones";
import { TIER_1_SHIPS } from "./ships";

export const CARDS_PER_BOX = {
  drone: {
    generic: [50, 70],
    specific: [
      // 80-100 cards per box, 2 boxes, divided by the number of tier 1 drone types
      160 / TIER_1_DRONES.length,
      200 / TIER_1_DRONES.length,
    ],
  },
  ship: {
    generic: [50, 70],
    specific: [
      // 80-100 cards per box, 2 boxes, divided by the number of tier 1 drone types
      160 / TIER_1_SHIPS.length,
      200 / TIER_1_SHIPS.length,
    ],
  },

  // You can't buy these
  stone: null,
};

export const COINS_PER_BOX = {
  drone: [2_000, 3_000],
  ship: [2_000, 3_000],

  // You can't buy these
  stone: null,
};

export const COST_PER_BOX = {
  drone: 160,
  ship: 280,

  // You can't buy these
  stone: null,
};
