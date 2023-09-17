import { Tier1Item, Tier2Item } from "../types";

// T1 and T2 names and descriptions
// https://galaxiga.fandom.com/wiki/Starships

// T2 to T3
// https://youtu.be/1SVg6GJFqqQ

export const TIER_1_STONES: Tier1Item[] = [
  {
    id: "frozen_stone",
    name: "Frozen",
  },
  {
    id: "meteor_stone",
    name: "Meteor",
  },
  {
    id: "coral_stone",
    name: "Coral",
  },
  {
    id: "wave_stone",
    name: "Wave",
  },
  {
    id: "apollo_stone",
    name: "Apollo",
  },
  {
    id: "artemis_stone",
    name: "Artemis",
  },
  {
    id: "mind_stone",
    name: "Mind",
  },
  {
    id: "reality_stone",
    name: "Reality",
  },
  {
    id: "hocus_stone",
    name: "Hocus",
  },
  {
    id: "pocus_stone",
    name: "Pocus",
  },
  {
    id: "light_stone",
    name: "Light",
  },
  {
    id: "soul_stone",
    name: "Soul",
  },
  {
    id: "blast_stone",
    name: "Blast",
  },
  {
    id: "deneb_stone",
    name: "Deneb",
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
    id: "dark_stone",
    name: "Dark",
  },
  {
    id: "power_stone",
    name: "Power",
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
    id: "umbra_stone",
    name: "Umbra",
    createdByMerging: ["dark_stone", "power_stone"],
  },
].map((item) => ({ ...item, category: "stone", tier: 2 }));
