import { MAX_LEVEL, MAX_UPGRADE } from "../data/upgrade-costs";
import { calculateCost } from "./calculateCost";

describe("calculateCost", () => {
  it("should properly calculate the cost of a full ship upgrade", () => {
    expect(
  calculateCost(
    {
      cards: 0,
      level: 0,
      upgrade: 0
    },
    "ship"
  )
).toMatchInlineSnapshot(`
Object {
  "boxesNeeded": 38,
  "cardsNeeded": 1900,
  "gemsNeeded": Object {
    "forCards": 10640,
    "forLevels": 720,
  },
  "goldNeeded": 1315750,
}
`);
  });

  it("should properly calculate the cost of a ship that has been partially upgraded", () => {
    expect(
      calculateCost(
        {
          cards: 0,
          level: 7,
          upgrade: 3,
        },
        "ship"
      )
    ).toMatchInlineSnapshot(`
Object {
  "boxesNeeded": 20,
  "cardsNeeded": 1000,
  "gemsNeeded": Object {
    "forCards": 5600,
    "forLevels": 300,
  },
  "goldNeeded": 669945,
}
`);
  });

  it("should properly calculate the cost of a ship that has already been fully upgraded", () => {
    expect(
      calculateCost(
        {
          cards: 0,
          level: MAX_LEVEL,
          upgrade: MAX_UPGRADE,
        },
        "ship"
      )
    ).toMatchInlineSnapshot(`
Object {
  "boxesNeeded": 0,
  "cardsNeeded": 0,
  "gemsNeeded": Object {
    "forCards": 0,
    "forLevels": 0,
  },
  "goldNeeded": 0,
}
`);
  });
});
