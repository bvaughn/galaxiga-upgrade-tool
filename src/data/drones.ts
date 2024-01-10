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
    id: "altair",
    name: "Altair",
  },
  {
    id: "auto_gunner",
    name: "Auto Gunner",
  },
  {
    id: "bandalore",
    name: "Bandalore",
  },
  {
    id: "black_widow",
    name: "Black Widow",
  },
  {
    id: "boomba",
    name: "Boomba",
  },
  {
    id: "bouncer",
    name: "Bouncer",
  },
  {
    id: "cavalier",
    name: "Cavalier",
  },
  {
    id: "cephalos",
    name: "Cephalos",
  },
  {
    id: "chakram",
    name: "Chakram",
  },
  {
    id: "chelonian",
    name: "Chelonian",
  },
  {
    id: "crustitia",
    name: "Crustitia",
  },
  {
    id: "cyclop",
    name: "Cyclop",
  },
  {
    id: "deep_blue",
    name: "Deep Blue",
  },
  {
    id: "drumpa",
    name: "Drumpa",
  },
  {
    id: "flash",
    name: "Flash",
  },
  {
    id: "fluita",
    name: "Fluita",
  },
  {
    id: "frost_flower",
    name: "Frost Flower",
  },
  {
    id: "gleamer",
    name: "Gleamer",
  },
  {
    id: "god_of_thunder",
    name: "God of Thunder",
  },
  {
    id: "gunner",
    name: "Gunner",
  },
  {
    id: "hammerhead",
    name: "Hammerhead",
  },
  {
    id: "ice_vapor",
    name: "Ice Vapor",
  },
  {
    id: "javelin",
    name: "Javelin",
  },
  {
    id: "lyra",
    name: "Lyra",
  },
  {
    id: "meduzian",
    name: "Meduzian",
  },
  {
    id: "mobius",
    name: "Mobius",
  },
  {
    id: "night_wing",
    name: "Night Wing",
  },
  {
    id: "nighturge",
    name: "Nighturge",
  },
  {
    id: "northern_bear",
    name: "Northern Bear",
  },
  {
    id: "opilion",
    name: "Opilion",
  },
  {
    id: "peppermint",
    name: "Peppermint",
  },
  {
    id: "polaris",
    name: "Polaris",
  },
  {
    id: "protoss",
    name: "Protoss",
  },
  {
    id: "reaper",
    name: "Reaper",
  },
  {
    id: "rocketeer",
    name: "Rocketeer",
  },
  {
    id: "ronin",
    name: "Ronin",
  },
  {
    id: "samurai",
    name: "Samurai",
  },
  {
    id: "snow_drop",
    name: "Snow Drop",
  },
  {
    id: "stella",
    name: "Stella",
  },
  {
    id: "terigon",
    name: "Terigon",
  },
  {
    id: "trine",
    name: "Trine",
  },
  {
    id: "triple_spike",
    name: "Triple Spike",
  },
  {
    id: "twin_sun",
    name: "Twin Sun",
  },
  {
    id: "twinkler",
    name: "Twinkler",
  },
  {
    id: "twister",
    name: "Twister",
  },
  {
    id: "vega",
    name: "Vega",
  },
  {
    id: "vesica",
    name: "Vesica",
  },
  {
    id: "whipslash",
    name: "Whipslash",
  },
].map((item) => ({ ...item, category: "drone", tier: 1 }));

export const TIER_2_DRONES: Tier2Item[] = [
  {
    id: "bandalorian",
    name: "Bandalorian",
    createdByMerging: ["bandalore", "javelin"],
  },
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
    id: "haripie",
    name: "Haripie",
    createdByMerging: ["mobius", "vesica"],
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
    id: "micropie",
    name: "Micropie",
    createdByMerging: ["fluita", "boomba"],
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
    id: "octavia",
    name: "Octavia",
    createdByMerging: ["stella", "cephalos"],
  },
  {
    id: "quadtrica",
    name: "Quadtrica",
    createdByMerging: ["mobius", "vesica"],
  },
  {
    id: "salamander",
    name: "Salamander",
    createdByMerging: ["nighturge", "terigon"],
  },
  {
    id: "shogun",
    name: "Shogun",
    createdByMerging: ["samurai", "ronin"],
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
