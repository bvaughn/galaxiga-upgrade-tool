import { Ship } from "../types";
import styles from "./ShipImage.module.css";

export function ShipImage({
  className = "",
  ship,
}: {
  className?: string;
  ship: Ship;
}) {
  return (
    <div className={`${styles.Crop} ${className}`}>
      <div className={styles.Rotator}>
        <img
          alt={ship.name}
          className={styles.Image}
          src={`/images/ships/${ship.imageName}`}
        />
      </div>
    </div>
  );
}
