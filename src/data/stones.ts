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

export const TIER_1_STONES: Tier1Item[] = [
  {
    id: "apollo_stone",
    name: "Apollo",
  },
  {
    id: "artemis_stone",
    name: "Artemis",
  },
  {
    id: "blast_stone",
    name: "Blast",
  },
  {
    id: "coral_stone",
    name: "Coral",
  },
  {
    id: "cryo_stone",
    name: "Cryo",
  },
  {
    id: "dark_stone",
    name: "Dark",
  },
  {
    id: "deneb_stone",
    name: "Deneb",
  },
  {
    id: "electro_stone",
    name: "Electro",
  },
  {
    id: "frost_stone",
    name: "Frost",
  },
  {
    id: "frozen_stone",
    name: "Frozen",
  },
  {
    id: "gale_stone",
    name: "Gale",
  },
  {
    id: "guard_stone",
    name: "Guard",
  },
  {
    id: "hocus_stone",
    name: "Hocus",
  },
  {
    id: "light_stone",
    name: "Light",
  },
  {
    id: "meteor_stone",
    name: "Meteor",
  },
  {
    id: "mind_stone",
    name: "Mind",
  },
  {
    id: "pocus_stone",
    name: "Pocus",
  },
  {
    id: "power_stone",
    name: "Power",
  },
  {
    id: "quake_stone",
    name: "Quake",
  },
  {
    id: "reality_stone",
    name: "Reality",
  },
  {
    id: "silence_stone",
    name: "Silence",
  },
  {
    id: "sonar_stone",
    name: "Sonar",
  },
  {
    id: "soul_stone",
    name: "Soul",
  },
  {
    id: "space_stone",
    name: "Space",
  },
  {
    id: "time_stone",
    name: "Time",
  },
  {
    id: "wave_stone",
    name: "Wave",
  },
].map((item) => ({ ...item, category: "stone", tier: 1 }));

export const TIER_2_STONES: Tier2Item[] = [
  {
    id: "comet_stone",
    name: "Comet",
    createdByMerging: ["frozen_stone", "meteor_stone"],
  },
  {
    id: "dark_tide_stone",
    name: "Dark Tide",
    createdByMerging: ["coral_stone", "wave_stone"],
  },
  {
    id: "echo_stone",
    name: "Echo",
    createdByMerging: ["sonar_stone", "silence_stone"],
  },
  {
    id: "electrika_stone",
    name: "Electrika",
    createdByMerging: ["guard_stone", "electro_stone"],
  },
  {
    id: "eclipse_stone",
    name: "Eclipse",
    createdByMerging: ["apollo_stone", "artemis_stone"],
  },
  {
    id: "fracture_stone",
    name: "Fracture",
    createdByMerging: ["mind_stone", "reality_stone"],
  },
  {
    id: "hocus_pocus_stone",
    name: "Hocus Pocus",
    createdByMerging: ["hocus_stone", "pocus_stone"],
  },
  {
    id: "lumen_stone",
    name: "Lumen",
    createdByMerging: ["light_stone", "soul_stone"],
  },
  {
    id: "phoenix_stone",
    name: "Phoenix",
    createdByMerging: ["blast_stone", "deneb_stone"],
  },
  {
    id: "spacetime_stone",
    name: "Spacetime",
    createdByMerging: ["space_stone", "time_stone"],
  },
  {
    id: "tsunami_stone",
    name: "Tsunami",
    createdByMerging: ["gale_stone", "quake_stone"],
  },
  {
    id: "umbra_stone",
    name: "Umbra",
    createdByMerging: ["dark_stone", "power_stone"],
  },
].map((item) => ({ ...item, category: "stone", tier: 2 }));

export const TIER_3_STONES = TIER_2_STONES.map((item) => ({
  ...item,
  name: `Super ${item.name}`,
  tier: 3,
})) satisfies Tier3Item[];

export const TIER_4_STONES = TIER_2_STONES.map((item) => ({
  ...item,
  name: `${item.name} Elite 1`,
  tier: 4,
})) satisfies Tier4Item[];

export const TIER_5_STONES = TIER_2_STONES.map((item) => ({
  ...item,
  name: `${item.name} Elite 2`,
  tier: 5,
})) satisfies Tier5Item[];
