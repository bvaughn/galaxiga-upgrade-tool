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

export const TIER_1_SHIPS: Tier1Item[] = [
  {
    id: "auxo",
    name: "Auxo",
    unlockedBy: "Unknown",
  },
  {
    id: "blizzard",
    name: "Blizzard",
    unlockedBy: "Special event",
  },
  {
    id: "bright_rise",
    name: "Bright Rise",
    unlockedBy: "Unknown",
  },
  {
    id: "captain_g",
    name: "Captain G",
    unlockedBy: "Special event",
  },
  { id: "falcon", name: "Falcon" },
  {
    id: "fierce_piercer",
    name: "Fierce Piercer",
    unlockedBy: "350 gems",
  },
  {
    id: "frostbite",
    name: "Frostbite",
    unlockedBy: "Unknown",
  },
  {
    id: "gladiator",
    name: "Gladiator",
    unlockedBy: "2,000 gems",
  },
  {
    id: "greataxe",
    name: "Greataxe",
    unlockedBy: "Watch 80 ads",
    description: `Signature weapon: Target Seeking Missiles. Fires a series of self targeting missiles. As the ship evolves, more homing missiles fire at once, increases add more missiles to the total fired (+4, then +6, last increase adds +8 to previous 2 increases).`,
  },
  {
    id: "hades",
    name: "Hades",
    unlockedBy: "Special event",
  },
  {
    id: "helixion",
    name: "Helixion",
    previousName: "Sky Wraith",
    description: `Signature weapon: Fire Explosive Bullet (s). Fire 1, 2, or 3 explosive rounds toward enemy. Further evolutions of ship unlock up to three explosive rounds fired in series.`,
    unlockedBy: "100 gems",
  },
  {
    id: "hydra",
    name: "Hydra",
    unlockedBy: "20 gems",
  },
  {
    id: "loreley",
    name: "Loreley",
    unlockedBy: "Unknown",
  },
  {
    id: "melodios",
    name: "Melodios",
    unlockedBy: "Unknown",
  },
  {
    id: "new_moon",
    name: "New Moon",
    unlockedBy: "100 gems",
  },
  {
    id: "night_fall",
    name: "Night Fall",
    unlockedBy: "Unknown",
  },
  {
    id: "phantom",
    name: "Phantom",
    unlockedBy: "Special event",
  },
  {
    id: "poseidon",
    name: "Poseidon",
    unlockedBy: "Special event",
  },
  {
    id: "ranger_x",
    name: "Ranger X",
    unlockedBy: "1,000 gems",
  },
  {
    id: "ss_lightning",
    name: "SS Lightning",
    unlockedBy: "500 gems",
  },
  {
    id: "santa_007",
    name: "Santa 007",
    unlockedBy: "Special event",
  },
  {
    id: "sirius",
    name: "Sirius",
    unlockedBy: "Watch 20 ads",
  },
  { id: "spector", name: "Spector" },
  {
    id: "steel_sky",
    name: "Steel Sky",
    previousName: "Sky Wraith",
    description: `Signature weapon: Fire Explosive Bullet (s). Fire 1, 2, or 3 explosive rounds toward enemy. Further evolutions of ship unlock up to three explosive rounds fired in series.`,
    unlockedBy: "100 gems",
  },
  {
    id: "storm_slayer",
    name: "Storm Slayer",
    previousName: "Fury of Ares",
    description: `The second ship acquired in completing the first three stages as part of the training sequence. The sSignature weapon is Dead Bullet: Rapidly fire forward multiple waves of bullets in a short duration.`,
    unlockedBy: "Training sequence",
  },
  {
    id: "theros",
    name: "Theros",
    unlockedBy: "Unknown",
  },
  {
    id: "typhoon",
    name: "Typhoon",
    unlockedBy: "2,000 gems",
  },
  {
    id: "valkyrie",
    name: "Valkyrie",
    unlockedBy: "350 gems",
  },
  {
    id: "warlock",
    name: "Warlock",
    unlockedBy: "1,000 gems",
  },
  {
    id: "winter_star",
    name: "Winter Star",
    unlockedBy: "Special event",
  },
].map((item) => ({ ...item, category: "ship", tier: 1 }));

export const TIER_2_SHIPS: Tier2Item[] = [
  {
    id: "breath_of_glacian",
    name: "Breath of Glacian",
    createdByMerging: ["new_moon", "santa_007"],
  },
  {
    id: "bright_fall",
    name: "Bright Fall",
    createdByMerging: ["night_fall", "bright_rise"],
  },
  {
    id: "dragon_star",
    name: "Dragon Star",
    createdByMerging: ["greataxe", "warlock"],
  },
  {
    id: "grim_reapor",
    name: "Grim Reapor",
    createdByMerging: ["phantom", "spector"],
  },
  {
    id: "helios",
    name: "Helios",
    createdByMerging: ["auxo", "theros"],
  },
  {
    id: "heimdall",
    name: "Heimdall",
    createdByMerging: ["gladiator", "sirius"],
  },
  {
    id: "liberator",
    name: "Liberator",
    createdByMerging: ["ranger_x", "steel_sky"],
    description: `Special power: Pillar of Light - Kick into overdrive and unleash a cluster of laser beams.`,
  },
  {
    id: "luvan_b33",
    name: "Luvan B33",
    createdByMerging: ["melodios", "loreley"],
  },
  {
    id: "orion",
    name: "Orion",
    createdByMerging: ["helixion", "winter_star"],
    description: `Special power: Night of the Storm, Burst out six freezing gales and six powerful lasers, gyrating around the ship.`,
  },
  {
    id: "rising_phoenix",
    name: "Rising Phoenix",
    createdByMerging: ["captain_g", "valkyrie"],
    description: `Special power: Burning Sky - Unleash a legion of blazing phoenix to swipe through the battlefield.`,
  },
  {
    id: "ss_andromeda",
    name: "SS Andromeda",
    createdByMerging: ["fierce_piercer", "ss_lightning"],
    description: `Special power: Thunder sphere, Construct an energy sphere and fire flashes of lightning.`,
  },
  {
    id: "storm_falcon",
    name: "Storm Falcon",
    createdByMerging: ["storm_slayer", "falcon"],
  },
  {
    id: "tarragon",
    name: "Tarragon",
    createdByMerging: ["hydra", "typhoon"],
  },
  {
    id: "zeus",
    name: "Zeus",
    createdByMerging: ["hades", "poseidon"],
  },
].map((item) => ({ ...item, category: "ship", tier: 2 }));

export const TIER_3_SHIPS = TIER_2_SHIPS.map((item) => ({
  ...item,
  name: `Super ${item.name}`,
  tier: 3,
})) satisfies Tier3Item[];

export const TIER_4_SHIPS = TIER_2_SHIPS.map((item) => ({
  ...item,
  name: `${item.name} Elite 1`,
  tier: 4,
})) satisfies Tier4Item[];

export const TIER_5_SHIPS = TIER_2_SHIPS.map((item) => ({
  ...item,
  name: `${item.name} Elite 2`,
  tier: 5,
})) satisfies Tier5Item[];
