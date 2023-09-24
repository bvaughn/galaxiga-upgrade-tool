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
          genericCards: 0,
          itemStatsArray: [
            {
              cards: 0,
              level: 0,
              subLevel: 0,
            },
            {
              cards: 0,
              level: 0,
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
      "coinsNeededForLevels": 2,503,600,
      "gemsNeededForLevels": 17,120,
    },
    "without": Object {
      "cardsNeededForLevels": 3,800,
      "coinsNeededForLevels": 2,643,600,
      "gemsNeededForLevels": 1,440,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": false,
  "totalCardsRequired": 3,800,
}
`);
    });

    it("should calculate the cost to create a tier 2 ship from a on fully upgraded tier 1 ships", () => {
      expect(
        calculateCreateCost({
          category: "ship",
          genericCards: 0,
          itemStatsArray: [
            {
              cards: 0,
              level: 0,
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
      "coinsNeededForLevels": 1,251,800,
      "gemsNeededForLevels": 8,560,
    },
    "without": Object {
      "cardsNeededForLevels": 1,900,
      "coinsNeededForLevels": 1,321,800,
      "gemsNeededForLevels": 720,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": false,
  "totalCardsRequired": 1,900,
}
`);
    });

    it("should the number of generic and specific cards into the calculation", () => {
      expect(
        calculateCreateCost({
          category: "ship",
          genericCards: 1_500,
          itemStatsArray: [
            {
              cards: 500,
              level: 5,
              subLevel: 0,
            },
            {
              cards: 250,
              level: 5,
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
      "coinsNeededForLevels": 2,443,960,
      "gemsNeededForLevels": 4,120,
    },
    "without": Object {
      "cardsNeededForLevels": 750,
      "coinsNeededForLevels": 2,471,460,
      "gemsNeededForLevels": 1,040,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": true,
  "totalCardsRequired": 3,000,
}
`);
    });
  });

  describe("stones", () => {
    // TODO
  });
});
