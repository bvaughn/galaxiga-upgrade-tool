import { TIER_2_SHIPS } from "../data/ships";
import { Card } from "./Card";
import { NumberInput } from "./NumberInput";
import { Tier2Upgrade } from "./Tier2Upgrade";

import useLocalStorage from "../hooks/useLocalStorage";
import styles from "./index.module.css";

export function Calculator() {
  const [numGenericCards, setNumGenericCards] = useLocalStorage<number>(
    "num-generic-cards",
    0
  );

  const [buyCardsWithGems, setByCardsWithGems] = useLocalStorage<boolean>(
    "buy-cards-with-gems",
    false
  );

  return (
    <div className={styles.Page}>
      <div className={styles.OptionsRow}>
        <label className={styles.CardInputLabel}>
          <Card type="generic" />
          <NumberInput
            className={styles.CardInput}
            maxValue={9999}
            minValue={0}
            onChange={setNumGenericCards}
            value={numGenericCards}
          />
        </label>
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

      {TIER_2_SHIPS.map((ship) => (
        <Tier2Upgrade key={ship.id} tier2Ship={ship} />
      ))}
    </div>
  );
}
