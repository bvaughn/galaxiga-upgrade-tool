import { TIER_2_SHIPS } from "../data/ships";
import { Tier2Upgrade } from "./Tier2Upgrade";

import styles from "./index.module.css";

export function Calculator() {
  return (
    <div className={styles.Page}>
      {TIER_2_SHIPS.map((ship) => (
        <Tier2Upgrade key={ship.id} tier2Ship={ship} />
      ))}
    </div>
  );
}
