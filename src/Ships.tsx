import styles from "./Ships.module.css";
import { TIER_1_SHIPS, TIER_2_SHIPS } from "./data/ships";
import { Ship, isTier1Ship, isTier2Ship } from "./types";

const tier1Ships: Ship[] = Array.from(Object.values(TIER_1_SHIPS));
const tier2Ships: Ship[] = Array.from(Object.values(TIER_2_SHIPS));

export function Ships() {
  return (
    <>
      <h1>Tier 1 ships</h1>
      <div className={styles.Cards}>
        {tier1Ships.map((ship) => (
          <ShipCard key={ship.name} ship={ship} />
        ))}
      </div>
      <h1>Tier 2 ships</h1>
      <div className={styles.Cards}>
        {tier2Ships.map((ship) => (
          <ShipCard key={ship.name} ship={ship} />
        ))}
      </div>
    </>
  );
}

function ShipCard({ ship }: { ship: Ship }) {
  return (
    <div className={styles.Card}>
      {ship.imageName && (
        <div className={styles.ImageCrop}>
          <img
            className={styles.Image}
            src={`/images/ships/${ship.imageName}`}
          />
        </div>
      )}
      <div className={styles.Name}>
        {ship.name}{" "}
        {ship.previousName && <small>(previously {ship.previousName})</small>}
      </div>
      {isTier1Ship(ship) && ship.unlockedBy && (
        <small>
          <label className={styles.UnlockedByLabel}>Unlocked by:</label>{" "}
          {ship.unlockedBy}
        </small>
      )}{" "}
      {isTier2Ship(ship) && (
        <small>
          <label className={styles.UnlockedByLabel}>Created by merging:</label>{" "}
          {ship.createdByMerging.map((ship) => ship.name).join(" + ")}
        </small>
      )}
      {ship.description && (
        <div className={styles.Description}>{ship.description}</div>
      )}
    </div>
  );
}
