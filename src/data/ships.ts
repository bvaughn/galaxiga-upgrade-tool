import { Tier1Ship, Tier2Ship } from "../types";

// T1 and T2 names and descriptions
// https://galaxiga.fandom.com/wiki/Starships

// T2 to T3
// https://youtu.be/1SVg6GJFqqQ

export const TIER_1_SHIPS: Tier1Ship[] = [
  {
    id: "captain_g",
    imageName: "tier_1_captain_g.jpeg",
    name: "Captain G",
    unlockedBy: "Special event",
  },
  { id: "falcon", imageName: "tier_1_falcon.jpeg", name: "Falcon" },
  {
    id: "fierce_piercer",
    imageName: "tier_1_fierce_piercer.jpeg",
    name: "Fierce Piercer",
    unlockedBy: "350 gems",
  },
  {
    id: "gladiator",
    name: "Gladiator",
    imageName: "tier_1_gladiator.png",
    unlockedBy: "2,000 gems",
  },
  {
    id: "greataxe",
    name: "Greataxe",
    imageName: "tier_1_greateaxe.png",
    unlockedBy: "Watch 80 ads",
    description: `Signature weapon: Target Seeking Missiles. Fires a series of self targeting missiles. As the ship evolves, more homing missiles fire at once, increases add more missiles to the total fired (+4, then +6, last increase adds +8 to previous 2 increases).`,
  },
  {
    id: "hades",
    imageName: "tier_1_hades.jpeg",
    name: "Hades",
    unlockedBy: "Special event",
  },
  {
    id: "helixion",
    imageName: "tier_1_helixion.jpeg",
    name: "Helixion",
    previousName: "Sky Wraith",
    description: `Signature weapon: Fire Explosive Bullet (s). Fire 1, 2, or 3 explosive rounds toward enemy. Further evolutions of ship unlock up to three explosive rounds fired in series.`,
    unlockedBy: "100 gems",
  },
  {
    id: "hydra",
    imageName: "tier_1_hydra.jpeg",
    name: "Hydra",
    unlockedBy: "20 gems",
  },
  {
    id: "new_moon",
    name: "New Moon",
    imageName: "tier_1_new_moon.png",
    unlockedBy: "100 gems",
  },
  {
    id: "phantom",
    imageName: "tier_1_phantom.jpeg",
    name: "Phantom",
    unlockedBy: "Special event",
  },
  {
    id: "poseidon",
    imageName: "tier_1_poseidon.jpeg",
    name: "Poseidon",
    unlockedBy: "Special event",
  },
  {
    id: "ranger_x",
    imageName: "tier_1_ranger_x.jpeg",
    name: "Ranger X",
    unlockedBy: "1,000 gems",
  },
  {
    id: "ss_lightning",
    imageName: "tier_1_ss_lightning.jpeg",
    name: "SS Lightning",
    unlockedBy: "500 gems",
  },
  {
    id: "santa_007",
    imageName: "tier_1_santa_007.jpeg",
    name: "Santa 007",
    unlockedBy: "Special event",
  },
  {
    id: "sirius",
    imageName: "tier_1_sirius.jpeg",
    name: "Sirius",
    unlockedBy: "Watch 20 ads",
  },
  { id: "spector", imageName: "tier_1_spector.jpeg", name: "Spector" },
  {
    id: "steel_sky",
    imageName: "tier_1_steel_sky.jpeg",
    name: "Steel Sky",
    previousName: "Sky Wraith",
    description: `Signature weapon: Fire Explosive Bullet (s). Fire 1, 2, or 3 explosive rounds toward enemy. Further evolutions of ship unlock up to three explosive rounds fired in series.`,
    unlockedBy: "100 gems",
  },
  {
    id: "storm_slayer",
    imageName: "tier_1_storm_slayer.jpeg",
    name: "Storm Slayer",
    previousName: "Fury of Ares",
    description: `The second ship acquired in completing the first three stages as part of the training sequence. The sSignature weapon is Dead Bullet: Rapidly fire forward multiple waves of bullets in a short duration.`,
    unlockedBy: "Training sequence",
  },
  {
    id: "typhoon",
    name: "Typhoon",
    imageName: "tier_1_typhoon.png",
    unlockedBy: "2,000 gems",
  },
  {
    id: "valkyrie",
    imageName: "tier_1_valkyrie.jpeg",
    name: "Valkyrie",
    unlockedBy: "350 gems",
  },
  {
    id: "warlock",
    name: "Warlock",
    imageName: "tier_1_warlock.png",
    unlockedBy: "1,000 gems",
  },
  {
    id: "winter_star",
    imageName: "tier_1_winter_star.jpeg",
    name: "Winter Star",
    unlockedBy: "Special event",
  },
];

export const TIER_2_SHIPS: Tier2Ship[] = [
  {
    id: "breath_of_glacian",
    imageName: "tier_2_breath_of_glacian.jpeg",
    name: "Breath of Glacian",
    createdByMerging: ["new_moon", "santa_007"],
  },
  {
    id: "dragon_star",
    imageName: "tier_2_dragon_star.jpeg",
    name: "Dragon Star",
    createdByMerging: ["greataxe", "warlock"],
  },
  {
    id: "grim_reapor",
    imageName: "tier_2_grim_reaper.jpeg",
    name: "Grim Reapor",
    createdByMerging: ["phantom", "spector"],
  },
  {
    id: "heimdall",
    imageName: "tier_2_heimdall.jpeg",
    name: "Heimdall",
    createdByMerging: ["gladiator", "sirius"],
  },
  {
    id: "liberator",
    imageName: "tier_2_liberator.jpeg",
    name: "Liberator",
    createdByMerging: ["ranger_x", "steel_sky"],
    description: `Special power: Pillar of Light - Kick into overdrive and unleash a cluster of laser beams.`,
  },
  {
    id: "orion",
    imageName: "tier_2_orion.jpeg",
    name: "Orion",
    createdByMerging: ["helixion", "winter_star"],
    description: `Special power: Night of the Storm, Burst out six freezing gales and six powerful lasers, gyrating around the ship.`,
  },
  {
    id: "rising_phoenix",
    imageName: "tier_2_rising_phoenix.jpeg",
    name: "Rising Phoenix",
    createdByMerging: ["captain_g", "valkyrie"],
    description: `Special power: Burning Sky - Unleash a legion of blazing phoenix to swipe through the battlefield.`,
  },
  {
    id: "ss_andromeda",
    imageName: "tier_2_ss_andromeda.jpeg",
    name: "SS Andromeda",
    createdByMerging: ["fierce_piercer", "ss_lightning"],
    description: `Special power: Thunder sphere, Construct an energy sphere and fire flashes of lightning.`,
  },
  {
    id: "storm_falcon",
    imageName: "tier_2_storm_falcon.jpeg",
    name: "Storm Falcon",
    createdByMerging: ["storm_slayer", "falcon"],
  },
  {
    id: "terragon",
    imageName: "tier_2_tarragon.jpeg",
    name: "Terragon",
    createdByMerging: ["hydra", "typhoon"],
  },
  {
    id: "zeus",
    imageName: "tier_2_zeus.jpeg",
    name: "Zeus",
    createdByMerging: ["hades", "poseidon"],
  },
];
