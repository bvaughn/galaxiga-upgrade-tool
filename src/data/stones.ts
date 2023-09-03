import { Tier1Item, Tier2Item } from "../types";

// T1 and T2 names and descriptions
// https://galaxiga.fandom.com/wiki/Starships

// T2 to T3
// https://youtu.be/1SVg6GJFqqQ

export const TIER_1_STONES: Tier1Item[] = [
  {
    id: "frozen_stone",
    name: "Frozen Stone",
  },
  {
    id: "meteor_stone",
    name: "Meteor Stone",
  },
  {
    id: "coral_stone",
    name: "Coral Stone",
  },
  {
    id: "wave_stone",
    name: "Wave Stone",
  },
  {
    id: "apollo_stone",
    name: "Apollo Stone",
  },
  {
    id: "artemis_stone",
    name: "Artemis Stone",
  },
  {
    id: "mind_stone",
    name: "Mind Stone",
  },
  {
    id: "reality_stone",
    name: "Reality Stone",
  },
  {
    id: "hocus_stone",
    name: "Hocus Stone",
  },
  {
    id: "pocus_stone",
    name: "Pocus Stone",
  },
  {
    id: "light_stone",
    name: "Light Stone",
  },
  {
    id: "soul_stone",
    name: "Soul Stone",
  },
  {
    id: "blast_stone",
    name: "Blast Stone",
  },
  {
    id: "denab_stone",
    name: "Denab Stone",
  },
  {
    id: "space_stone",
    name: "Space Stone",
  },
  {
    id: "time_stone",
    name: "Time Stone",
  },
  {
    id: "dark_stone",
    name: "Dark Stone",
  },
  {
    id: "power_stone",
    name: "Power Stone",
  },
].map((item) => ({ ...item, category: "stone", tier: 1 }));

export const TIER_2_STONES: Tier2Item[] = [
  {
    id: "comet_stone",
    name: "Comet Stone",
    createdByMerging: ["frozen_stone", "meteor_stone"],
  },
  {
    id: "dark_tide_stone",
    name: "Dark Tide Stone",
    createdByMerging: ["coral_stone", "wave_stone"],
  },
  {
    id: "eclipse_stone",
    name: "Eclipse Stone",
    createdByMerging: ["apollo_stone", "artemis_stone"],
  },
  {
    id: "fracture_stone",
    name: "Fracture Stone",
    createdByMerging: ["mind_stone", "reality_stone"],
  },
  {
    id: "hocus_pocus_stone",
    name: "Hocus Pocus Stone",
    createdByMerging: ["hocus_stone", "pocus_stone"],
  },
  {
    id: "lumen_stone",
    name: "Lumen Stone",
    createdByMerging: ["light_stone", "soul_stone"],
  },
  {
    id: "phoenix_stone",
    name: "Phoenix Stone",
    createdByMerging: ["blast_stone", "denab_stone"],
  },
  {
    id: "spacetime_stone",
    name: "Spacetime Stone",
    createdByMerging: ["space_stone", "time_stone"],
  },
  {
    id: "umbra_stone",
    name: "Umbra Stone",
    createdByMerging: ["dark_stone", "power_stone"],
  },
].map((item) => ({ ...item, category: "stone", tier: 2 }));
