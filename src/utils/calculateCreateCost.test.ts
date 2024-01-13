import { MAX_STATS } from "../types";
import { calculateCreateCost } from "./calculateCreateCost";

expect.addSnapshotSerializer({
  test: (value) => typeof value === "number",
  print: (value) => new Intl.NumberFormat().format(value as number),
});

describe("calculateCreateCost", () => {
  describe("drones", () => {
    // TODO
  });

  describe("ships", () => {
    it("should calculate the cost to create a tier 2 ship from two new tier 1 ships", () => {
      expect(
        calculateCreateCost({
          category: "ship",
          itemStatsArray: [
            {
              level: 1,
              subLevel: 0,
            },
            {
              level: 1,
              subLevel: 0,
            },
          ],

          tier: 2,
        })
      ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 2,498,600,
      "gemsNeededForLevels": 17,680,
    },
    "without": Object {
      "cardsNeededForLevels": 3,800,
      "coinsNeededForLevels": 2,643,600,
      "gemsNeededForLevels": 1,440,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": true,
  "totalCardsRequired": 3,800,
}
`);
    });

    it("should calculate the cost to create a tier 2 ship from a on fully upgraded tier 1 ships", () => {
      expect(
        calculateCreateCost({
          category: "ship",
          itemStatsArray: [
            {
              level: 1,
              subLevel: 0,
            },
            MAX_STATS,
          ],

          tier: 2,
        })
      ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 1,249,300,
      "gemsNeededForLevels": 8,840,
    },
    "without": Object {
      "cardsNeededForLevels": 1,900,
      "coinsNeededForLevels": 1,321,800,
      "gemsNeededForLevels": 720,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": true,
  "totalCardsRequired": 1,900,
}
`);
    });
  });

  describe("stones", () => {
    // TODO
  });
});
