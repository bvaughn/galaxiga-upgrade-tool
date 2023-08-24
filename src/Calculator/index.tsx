import { Card } from "../components/Card";
import { NumberInput } from "../components/NumberInput";
import { TIER_2_SHIPS } from "../data/ships";
import { Tier2ItemUpgrade } from "./Tier2ItemUpgrade";

import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { TIER_2_DRONES } from "../data/drones";
import useLocalStorage from "../hooks/useLocalStorage";
import styles from "./index.module.css";
import { useDeferredValue } from "react";

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

  const [category, setCategory] = useLocalStorage<"drone" | "ship">(
    "calculator-category",
    "ship"
  );

  const [filterByText, setFilterByText] = useLocalStorage<string>(
    "calculator-filter-by-text",
    ""
  );
  const deferredFilterByText = useDeferredValue(filterByText.toLowerCase());

  const items = category === "ship" ? TIER_2_SHIPS : TIER_2_DRONES;
  const filteredItems = deferredFilterByText
    ? items.filter((item) =>
        item.name.toLowerCase().includes(deferredFilterByText)
      )
    : items;

  return (
    <div className={styles.Page}>
      <div className={styles.TabRow}>
        <label
          className={styles.LabelRadioGroup}
          data-selected={category === "ship" || undefined}
        >
          <input
            defaultChecked={true}
            name="category"
            onChange={({ target }) => setCategory(target.value as any)}
            type="radio"
            value="ship"
          />
          <Card type="generic" category="ship" />
          Ships
        </label>
        <label
          className={styles.LabelRadioGroup}
          data-selected={category === "drone" || undefined}
        >
          <input
            name="category"
            onChange={({ target }) => setCategory(target.value as any)}
            type="radio"
            value="drone"
          />
          <Card type="generic" category="drone" />
          Drones
        </label>
      </div>
      <div className={styles.OptionsRow}>
        <div className={styles.OptionsLeftColumn}>
          <label className={styles.BuyCardsToggle}>
            <input
              checked={buyCardsWithGems}
              className={styles.Checkbox}
              onChange={({ target }) => setByCardsWithGems(target.checked)}
              type="checkbox"
            />
            Buy cards from treasure boxes
          </label>
        </div>
        <div className={styles.OptionsMiddleColumn}>
          <input
            className={styles.FilterInput}
            onChange={({ target }) => setFilterByText(target.value)}
            placeholder="Filter by name..."
            type="text"
            value={filterByText}
          />
        </div>
        <div className={styles.OptionsRightColumn}>
          {category === "ship" && (
            <label className={styles.InputLabel}>
              <Card type="generic" category="ship" />
              <NumberInput
                className={styles.Input}
                data-type="cards"
                maxValue={99_999}
                minValue={0}
                onChange={setNumGenericShipCards}
                value={numGenericShipCards}
              />
            </label>
          )}
          {category === "drone" && (
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
          )}
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
          {filteredItems.map((item) => (
            <Tier2ItemUpgrade
              category={category}
              key={item.id}
              tier2Item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
