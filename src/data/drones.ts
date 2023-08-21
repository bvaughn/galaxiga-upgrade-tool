import { Tier1Item, Tier2Item } from "../types";

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
    id: "norther_bear",
    name: "Norther Bear",
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
    id: "tarigon",
    name: "Tarigon",
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
    id: "protos",
    name: "Protos",
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
];

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
    createdByMerging: ["norther_bear", "rocketeer"],
  },
  {
    id: "salamander",
    name: "Salamander",
    createdByMerging: ["nighturge", "tarigon"],
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
    createdByMerging: ["protos", "twister"],
  },
  {
    id: "wyvern",
    name: "Wyvern",
    createdByMerging: ["chelonian", "polaris"],
  },
];
