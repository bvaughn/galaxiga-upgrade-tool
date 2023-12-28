import {
  Tier1Item,
  Tier2Item,
  Tier3Item,
  Tier4Item,
  Tier5Item,
} from "../types";

// T1 and T2 names and descriptions
// https://galaxiga.fandom.com/wiki/Starships

// T2 to T3
// https://youtu.be/1SVg6GJFqqQ

export const TIER_1_DRONES: Tier1Item[] = [
  {
    id: "auto_gunner",
    name: "Auto Gunner",
  },
  {
    id: "gunner",
    name: "Gunner",
  },
  {
    id: "bouncer",
    name: "Bouncer",
  },
  {
    id: "flash",
    name: "Flash",
  },
  {
    id: "chakram",
    name: "Chakram",
  },
  {
    id: "vega",
    name: "Vega",
  },
  {
    id: "cyclop",
    name: "Cyclop",
  },
  {
    id: "night_wing",
    name: "Night Wing",
  },
  {
    id: "cavalier",
    name: "Cavalier",
  },
  {
    id: "twin_sun",
    name: "Twin Sun",
  },
  {
    id: "frost_flower",
    name: "Frost Flower",
  },
  {
    id: "peppermint",
    name: "Peppermint",
  },
  {
    id: "hammerhead",
    name: "Hammerhead",
  },
  {
    id: "whipslash",
    name: "Whipslash",
  },
  {
    id: "god_of_thunder",
    name: "God of Thunder",
  },
  {
    id: "reaper",
    name: "Reaper",
  },
  {
    id: "northern_bear",
    name: "Northern Bear",
  },
  {
    id: "rocketeer",
    name: "Rocketeer",
  },
  {
    id: "nighturge",
    name: "Nighturge",
  },
  {
    id: "terigon",
    name: "Terigon",
  },
  {
    id: "black_widow",
    name: "Black Widow",
  },
  {
    id: "opilion",
    name: "Opilion",
  },
  {
    id: "deep_blue",
    name: "Deep Blue",
  },
  {
    id: "trine",
    name: "Trine",
  },
  {
    id: "altair",
    name: "Altair",
  },
  {
    id: "triple_spike",
    name: "Triple Spike",
  },
  {
    id: "crustitia",
    name: "Crustitia",
  },
  {
    id: "meduzian",
    name: "Meduzian",
  },
  {
    id: "protoss",
    name: "Protoss",
  },
  {
    id: "twister",
    name: "Twister",
  },
  {
    id: "chelonian",
    name: "Chelonian",
  },
  {
    id: "polaris",
    name: "Polaris",
  },
].map((item) => ({ ...item, category: "drone", tier: 1 }));

export const TIER_2_DRONES: Tier2Item[] = [
  {
    id: "buster",
    name: "Buster",
    createdByMerging: ["auto_gunner", "gunner"],
  },
  {
    id: "buzzsaw",
    name: "Buzzsaw",
    createdByMerging: ["bouncer", "flash"],
  },
  {
    id: "chalikar",
    name: "Chalikar",
    createdByMerging: ["chakram", "vega"],
  },
  {
    id: "dead_eye",
    name: "Dead Eye",
    createdByMerging: ["cyclop", "night_wing"],
  },
  {
    id: "excalibur",
    name: "Excalibur",
    createdByMerging: ["cavalier", "twin_sun"],
  },
  {
    id: "lumen_flower",
    name: "Lumen Flower",
    createdByMerging: ["frost_flower", "peppermint"],
  },
  {
    id: "megalodon",
    name: "Megalodon",
    createdByMerging: ["hammerhead", "whipslash"],
  },
  {
    id: "mine_spray",
    name: "Mine Spray",
    createdByMerging: ["god_of_thunder", "reaper"],
  },
  {
    id: "northern_rebel",
    name: "Northern Rebel",
    createdByMerging: ["northern_bear", "rocketeer"],
  },
  {
    id: "salamander",
    name: "Salamander",
    createdByMerging: ["nighturge", "terigon"],
  },
  {
    id: "spider_queen",
    name: "Spider Queen",
    createdByMerging: ["black_widow", "opilion"],
  },
  {
    id: "trinity",
    name: "Trinity",
    createdByMerging: ["deep_blue", "trine"],
  },
  {
    id: "twin_spear",
    name: "Twin Spear",
    createdByMerging: ["altair", "triple_spike"],
  },
  {
    id: "voltaic_claw",
    name: "Voltaic Claw",
    createdByMerging: ["crustitia", "meduzian"],
  },
  {
    id: "whirlwind",
    name: "Whirlwind",
    createdByMerging: ["protoss", "twister"],
  },
  {
    id: "wyvern",
    name: "Wyvern",
    createdByMerging: ["chelonian", "polaris"],
  },
].map((item) => ({ ...item, category: "drone", tier: 2 }));

export const TIER_3_DRONES = TIER_2_DRONES.map((item) => ({
  ...item,
  name: `Super ${item.name}`,
  tier: 3,
})) satisfies Tier3Item[];

export const TIER_4_DRONES = TIER_2_DRONES.map((item) => ({
  ...item,
  name: `${item.name} Elite 1`,
  tier: 4,
})) satisfies Tier4Item[];

export const TIER_5_DRONES = TIER_2_DRONES.map((item) => ({
  ...item,
  name: `${item.name} Elite 2`,
  tier: 5,
})) satisfies Tier5Item[];
