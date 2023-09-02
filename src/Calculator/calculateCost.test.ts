import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";
import { calculateCost } from "./calculateCost";

describe("calculateCost", () => {
  describe("drones", () => {
    // TODO
  });

  describe("ships", () => {
    describe("tier 1", () => {
      it("should properly handle a ship that is not yet owned", () => {
        expect(
          calculateCost(
            {
              cards: 0,
              level: 0,
              subLevel: 0,
            },
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 1251800,
      "gemsNeededForLevels": 8560,
    },
    "without": Object {
      "cardsNeededForLevels": 1900,
      "coinsNeededForLevels": 1321800,
      "gemsNeededForLevels": 720,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": false,
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
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 1251800,
      "gemsNeededForLevels": 8560,
    },
    "without": Object {
      "cardsNeededForLevels": 1900,
      "coinsNeededForLevels": 1321800,
      "gemsNeededForLevels": 720,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": true,
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
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 887775,
      "gemsNeededForLevels": 4500,
    },
    "without": Object {
      "cardsNeededForLevels": 1000,
      "coinsNeededForLevels": 925275,
      "gemsNeededForLevels": 300,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": true,
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
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 232305,
      "gemsNeededForLevels": 0,
    },
    "without": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 232305,
      "gemsNeededForLevels": 0,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": true,
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
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 0,
      "gemsNeededForLevels": 0,
    },
    "without": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 0,
      "gemsNeededForLevels": 0,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": true,
}
`);
      });

      it("should factor existing cards into counts needed", () => {
        expect(
          calculateCost(
            {
              cards: 270,
              level: MAX_LEVEL_NUMBER,
              subLevel: 0,
            },
            "ship",
            1
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 434150,
      "gemsNeededForLevels": 0,
    },
    "without": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 434150,
      "gemsNeededForLevels": 0,
    },
  },
  "gemsNeededToMerge": 500,
  "isEstimateComplete": true,
}
`);
      });
    });

    describe("tier 2", () => {
      it("should properly handle a ship that is not yet owned", () => {
        expect(
          calculateCost(
            {
              cards: 0,
              level: 0,
              subLevel: 0,
            },
            "ship",
            2
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 12068515,
      "gemsNeededForLevels": 47240,
    },
    "without": Object {
      "cardsNeededForLevels": 10400,
      "coinsNeededForLevels": 12451015,
      "gemsNeededForLevels": 4400,
    },
  },
  "gemsNeededToMerge": 1000,
  "isEstimateComplete": false,
}
`);
      });

      // TODO
    });

    describe("tier 3", () => {
      it("should properly handle a ship that is not yet owned", () => {
        expect(
          calculateCost(
            {
              cards: 0,
              level: 0,
              subLevel: 0,
            },
            "ship",
            3
          )
        ).toMatchInlineSnapshot(`
Object {
  "boxes": Object {
    "with": Object {
      "cardsNeededForLevels": 0,
      "coinsNeededForLevels": 39765975,
      "gemsNeededForLevels": 145200,
    },
    "without": Object {
      "cardsNeededForLevels": 30000,
      "coinsNeededForLevels": 40865975,
      "gemsNeededForLevels": 22000,
    },
  },
  "gemsNeededToMerge": null,
  "isEstimateComplete": false,
}
`);
      });

      // TODO
    });
  });

  describe("stones", () => {
    // TODO
  });
});
