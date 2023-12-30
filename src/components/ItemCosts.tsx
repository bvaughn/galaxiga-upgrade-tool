import { Category } from "../types";
import { Card } from "./Card";
import { Coin } from "./Coin";
import { Gem } from "./Gem";

import { formatNumber } from "../utils/number";
import styles from "./ItemCosts.module.css";
import { ReactNode } from "react";

export function ItemCosts({
  buyCards,
  category,
  cardsNeeded,
  coinsNeeded,
  gemsNeeded,
}: {
  buyCards: boolean;
  category: Category;
  cardsNeeded: number;
  coinsNeeded: number;
  gemsNeeded: number;
}) {
  let boxOrCardUI: ReactNode = null;
  if (buyCards) {
    switch (category) {
      case "drone":
        boxOrCardUI = (
          <img
            className={styles.DroneBoxImage}
            src="/images/drone-box.png"
            alt="blank"
          />
        );
        break;
      case "ship":
        boxOrCardUI = (
          <img
            className={styles.ShipBoxImage}
            src="/images/ship-box.png"
            alt="blank"
          />
        );
        break;
      case "stone":
        boxOrCardUI = (
          <img
            className={styles.BatteryImage}
            src="/images/battery.svg"
            alt="blank"
          />
        );
        break;
    }
  } else {
    boxOrCardUI = (
      <div
        className={styles.Cost}
        data-disabled={cardsNeeded === 0 ? "" : undefined}
        title={`${formatNumber(cardsNeeded, "long")} cards`}
      >
        <Card type="specific" category={category} /> {formatNumber(cardsNeeded)}
      </div>
    );
  }

  return (
    <div className={styles.Costs}>
      {boxOrCardUI}
      <div
        className={styles.Cost}
        data-disabled={gemsNeeded === 0 ? "" : undefined}
        title={`${formatNumber(gemsNeeded, "long")} gems`}
      >
        <Gem /> {formatNumber(gemsNeeded)}
      </div>
      <div
        className={styles.Cost}
        data-disabled={coinsNeeded === 0 ? "" : undefined}
        title={`${formatNumber(coinsNeeded, "long")} coins`}
      >
        <Coin /> {formatNumber(coinsNeeded)}
      </div>
    </div>
  );
}
