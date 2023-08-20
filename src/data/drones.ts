import { Tier1Item, Tier2Item } from "../types";

// T1 and T2 names and descriptions
// https://galaxiga.fandom.com/wiki/Starships

// T2 to T3
// https://youtu.be/1SVg6GJFqqQ

export const TIER_1_DRONES: Tier1Item[] = [
  {
    id: "auto_gunner",
    imageName: "tier_1_auto_gunner.jpeg",
    name: "Auto Gunner",
  },
  {
    id: "gunner",
    imageName: "tier_1_gunner.jpeg",
    name: "Gunner",
  },
  {
    id: "bouncer",
    imageName: "tier_1_bouncer.jpeg",
    name: "Bouncer",
  },
  {
    id: "flash",
    imageName: "tier_1_flash.jpeg",
    name: "Flash",
  },
];

export const TIER_2_DRONES: Tier2Item[] = [
  {
    id: "buster",
    imageName: "tier_2_buster.jpeg",
    name: "Buster",
    createdByMerging: ["auto_gunner", "gunner"],
  },
  {
    id: "buzzsaw",
    imageName: "tier_2_buzzsaw.jpeg",
    name: "Buzzsaw",
    createdByMerging: ["bouncer", "flash"],
  },
];
