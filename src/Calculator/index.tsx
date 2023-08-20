import { Card } from "../components/Card";
import { NumberInput } from "../components/NumberInput";
import { TIER_2_SHIPS } from "../data/ships";
import { Tier2ItemUpgrade } from "./Tier2ItemUpgrade";

import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import useLocalStorage from "../hooks/useLocalStorage";
import styles from "./index.module.css";
import { TIER_2_DRONES } from "../data/drones";

export function Calculator() {
  const [numCoins, setNumCoins] = useLocalStorage<number>("num-coins", 0);
  const [numGems, setNumGems] = useLocalStorage<number>("num-gems", 0);
  const [numGenericDroneCards, setNumGenericDroneCards] =
    useLocalStorage<number>("num-generic-drone-cards", 0);
  const [numGenericShipCards, setNumGenericShipCards] = useLocalStorage<number>(
    "num-generic-ship-cards",
    0
  );

  const [buyCardsWithGems, setByCardsWithGems] = useLocalStorage<boolean>(
    "buy-cards-with-gems",
    false
  );

  return (
    <div className={styles.Page}>
      <div className={styles.OptionsRow}>
        <div className={styles.OptionsColumn}>
          <label className={styles.BuyCardsToggle}>
            <input
              checked={buyCardsWithGems}
              className={styles.Checkbox}
              onChange={({ target }) => setByCardsWithGems(target.checked)}
              type="checkbox"
            />
            Buy cards from Ship boxes
          </label>
        </div>
        <div className={styles.OptionsColumn}>
          <label className={styles.InputLabel}>
            <Card type="generic" category="ship" />
            <NumberInput
              className={styles.Input}
              data-type="cards"
              maxValue={9999}
              minValue={0}
              onChange={setNumGenericShipCards}
              value={numGenericShipCards}
            />
          </label>
          <label className={styles.InputLabel}>
            <Card type="generic" category="drone" />
            <NumberInput
              className={styles.Input}
              data-type="cards"
              maxValue={9999}
              minValue={0}
              onChange={setNumGenericDroneCards}
              value={numGenericDroneCards}
            />
          </label>
          <label className={styles.InputLabel}>
            <Coin />
            <NumberInput
              className={styles.Input}
              data-type="coins"
              maxValue={999_999_999}
              minValue={0}
              onChange={setNumCoins}
              value={numCoins}
            />
          </label>
          <label className={styles.InputLabel}>
            <Gem />
            <NumberInput
              className={styles.Input}
              data-type="gems"
              maxValue={999_999_999}
              minValue={0}
              onChange={setNumGems}
              value={numGems}
            />
          </label>
        </div>
      </div>

      <div className={styles.ItemsRow}>
        <div className={styles.ItemsColumn}>
          {TIER_2_SHIPS.map((ship) => (
            <Tier2ItemUpgrade category="ship" key={ship.id} tier2Item={ship} />
          ))}
        </div>
        <div className={styles.ItemsColumn}>
          {TIER_2_DRONES.map((drone) => (
            <Tier2ItemUpgrade
              category="drone"
              key={drone.id}
              tier2Item={drone}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
