import { TIER_1_DRONES } from "./drones";
import { TIER_1_SHIPS } from "./ships";
import { TIER_1_STONES } from "./stones";

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

  // You can't obtain stone cards from boxes, but you can buy batteries
  stone: {
    // If you spin a generic spot, it rewards 10-20 cards
    // But only half of the spots are generic spots
    // Technically there's a slot that's 150-200 but I've never hit it in ~80 rolls so I believe it's a lie
    generic: [5, 10],
    specific: [
      // 12-30 cards per slot, half of the slots are specific, divided by the number of tier 1 stone types
      6 / TIER_1_STONES.length,
      15 / TIER_1_STONES.length,
    ],
  },
};

export const COINS_PER_BOX = {
  drone: [2_000, 3_000],
  ship: [2_000, 3_000],

  // You can't obtain stone cards from boxes, but you can buy batteries
  // Unlike boxes though, batteries never reward coins
  stone: [0, 0],
};

export const COST_IN_GEMS_PER_BOX = {
  drone: 160,
  ship: 280,

  // You can't obtain stone cards from boxes, but you can buy batteries
  // Batteries cost 25 gems each or 10 batteries for 200 gems
  stone: 25,
};
