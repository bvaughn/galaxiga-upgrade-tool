import { Card } from "../components/Card";
import { NumberInput } from "../components/NumberInput";
import { TIER_2_SHIPS } from "../data/ships";
import { Tier2ItemUpgrade } from "./Tier2ItemUpgrade";

import { useDeferredValue } from "react";
import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { TIER_2_DRONES } from "../data/drones";
import { TIER_2_STONES } from "../data/stones";
import useLocalStorage from "../hooks/useLocalStorage";
import { Category, Tier2Item } from "../types";
import styles from "./index.module.css";

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

  const [category, setCategory] = useLocalStorage<Category>(
    "calculator-category",
    "ship"
  );

  const [filterByText, setFilterByText] = useLocalStorage<string>(
    "calculator-filter-by-text",
    ""
  );
  const deferredFilterByText = useDeferredValue(filterByText.toLowerCase());

  let tier2Items: Tier2Item[];
  switch (category) {
    case "drone":
      tier2Items = TIER_2_DRONES;
      break;
    case "ship":
      tier2Items = TIER_2_SHIPS;
      break;
    case "stone":
      tier2Items = TIER_2_STONES;
      break;
  }

  const filteredTier2Items = deferredFilterByText
    ? tier2Items.filter((item) =>
        item.name.toLowerCase().includes(deferredFilterByText)
      )
    : tier2Items;

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
        <label
          className={styles.LabelRadioGroup}
          data-selected={category === "stone" || undefined}
        >
          <input
            name="category"
            onChange={({ target }) => setCategory(target.value as any)}
            type="radio"
            value="stone"
          />
          <Card type="generic" category="stone" />
          Stones
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
          {filteredTier2Items.map((item) => (
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
