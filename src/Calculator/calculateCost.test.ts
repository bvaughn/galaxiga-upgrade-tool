import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";
import { calculateCost } from "./calculateCost";

describe("calculateCost", () => {
  it("should properly identify a ship that is not yet owned", () => {
    expect(
      calculateCost(
        {
          cards: 0,
          level: 0,
          subLevel: 0,
        },
        "ship"
      )
    ).toMatchInlineSnapshot(`
Object {
  "boxesNeeded": 0,
  "cardsNeeded": 0,
  "coinsNeeded": 0,
  "gemsNeeded": Object {
    "forCards": 0,
    "forLevels": 0,
    "forMerge": 0,
  },
}
`);
  });

  it("should properly calculate the cost of a full ship upgrade", () => {
    expect(
      calculateCost(
        {
          cards: 0,
          level: 1,
          subLevel: 0,
        },
        "ship"
      )
    ).toMatchInlineSnapshot(`
Object {
  "boxesNeeded": 38,
  "cardsNeeded": 1900,
  "coinsNeeded": 1321800,
  "gemsNeeded": Object {
    "forCards": 10640,
    "forLevels": 720,
    "forMerge": 500,
  },
}
`);
  });

  it("should properly calculate the cost of a ship that has been partially upgraded", () => {
    expect(
      calculateCost(
        {
          cards: 0,
          level: 7,
          subLevel: 3,
        },
        "ship"
      )
    ).toMatchInlineSnapshot(`
Object {
  "boxesNeeded": 20,
  "cardsNeeded": 1000,
  "coinsNeeded": 925275,
  "gemsNeeded": Object {
    "forCards": 5600,
    "forLevels": 300,
    "forMerge": 500,
  },
}
`);
  });

  it("should properly calculate the coins cost of a ship that is at the last level but not fully upgraded", () => {
    expect(
      calculateCost(
        {
          cards: 0,
          level: MAX_LEVEL_NUMBER,
          subLevel: 5,
        },
        "ship"
      )
    ).toMatchInlineSnapshot(`
Object {
  "boxesNeeded": 0,
  "cardsNeeded": 0,
  "coinsNeeded": 232305,
  "gemsNeeded": Object {
    "forCards": 0,
    "forLevels": 0,
    "forMerge": 500,
  },
}
`);
  });

  it("should properly calculate the cost of a ship that has already been fully upgraded", () => {
    expect(
      calculateCost(
        {
          cards: 0,
          level: MAX_LEVEL_NUMBER,
          subLevel: MAX_SUB_LEVEL_NUMBER,
        },
        "ship"
      )
    ).toMatchInlineSnapshot(`
Object {
  "boxesNeeded": 0,
  "cardsNeeded": 0,
  "coinsNeeded": 0,
  "gemsNeeded": Object {
    "forCards": 0,
    "forLevels": 0,
    "forMerge": 500,
  },
}
`);
  });
});
