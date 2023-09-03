import { Card } from "../components/Card";
import { NumberInput } from "../components/NumberInput";
import { TIER_1_SHIPS, TIER_2_SHIPS } from "../data/ships";

import { useDeferredValue, useMemo } from "react";
import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { TIER_1_DRONES, TIER_2_DRONES } from "../data/drones";
import { TIER_1_STONES, TIER_2_STONES } from "../data/stones";
import { getItemStats } from "../hooks/useItemStats";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  Category,
  Item,
  Tier1Item,
  Tier2Item,
  isTier1Item,
  isTier2Item,
} from "../types";
import { assert } from "../utils/assert";
import { ItemUpgradePlanner } from "./ItemUpgradePlanner";
import styles from "./index.module.css";
import { useBuyCardsWithGems } from "./useBuyCardsWithGems";

export function Calculator() {
  const [numCoins, setNumCoins] = useLocalStorage<number>("num-coins", 0);
  const [numGems, setNumGems] = useLocalStorage<number>("num-gems", 0);

  const [numGenericDroneCards, setNumGenericDroneCards] =
    useLocalStorage<number>("num-generic-drone-cards", 0);
  const [numGenericShipCards, setNumGenericShipCards] = useLocalStorage<number>(
    "num-generic-ship-cards",
    0
  );

  const [buyCardsWithGems, setBuyCardsWithGems] = useBuyCardsWithGems();

  const [category, setCategory] = useLocalStorage<Category>(
    "calculator-category",
    "ship"
  );

  const [filterByText, setFilterByText] = useLocalStorage<string>(
    "calculator-filter-by-text",
    ""
  );
  const deferredFilterByText = useDeferredValue(filterByText.toLowerCase());

  const [sortBy, setSortBy] = useLocalStorage<
    "level" | "level-reverse" | "name"
  >("calculator-sort-by", "name");

  // TODO This seems to be double triggered when changing to tier 2???
  const [showTier, setShowTier] = useLocalStorage<"tier-1" | "tier-2">(
    "show-tier",
    "tier-1"
  );

  const items = useMemo(() => {
    let items: Item[];

    switch (showTier) {
      case "tier-1": {
        switch (category) {
          case "drone":
            items = TIER_1_DRONES;
            break;
          case "ship":
            items = TIER_1_SHIPS;
            break;
          case "stone":
            items = TIER_1_STONES;
            break;
        }
        break;
      }
      case "tier-2": {
        switch (category) {
          case "drone":
            items = TIER_2_DRONES;
            break;
          case "ship":
            items = TIER_2_SHIPS;
            break;
          case "stone":
            items = TIER_2_STONES;
            break;
        }
        break;
      }
    }

    assert(items != null);

    if (deferredFilterByText) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(deferredFilterByText)
      );
    }

    switch (sortBy) {
      case "level":
      case "level-reverse":
        items = items.sort((a, b) => {
          const statsA = getItemStats(a);
          const statsB = getItemStats(b);
          if (statsA.level !== statsB.level) {
            return sortBy === "level"
              ? statsA.level - statsB.level
              : statsB.level - statsA.level;
          } else if (statsA.subLevel !== statsB.subLevel) {
            return sortBy === "level"
              ? statsA.subLevel - statsB.subLevel
              : statsB.subLevel - statsA.subLevel;
          } else {
            return a.name.localeCompare(b.name);
          }
        });
        break;
      case "name":
        items = items.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return items;
  }, [category, deferredFilterByText, sortBy, showTier]);

  return (
    <div className={styles.Page}>
      <div className={styles.TabRow}>
        <label
          className={styles.LabelRadioGroup}
          data-selected={category === "ship" || undefined}
        >
          <input
            defaultChecked={category === "ship"}
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
            defaultChecked={category === "drone"}
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
            defaultChecked={category === "stone"}
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
              onChange={({ target }) => setBuyCardsWithGems(target.checked)}
              type="checkbox"
            />
            Buy cards with gems
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
          <select
            className={styles.SortSelect}
            onChange={({ target }) => setSortBy(target.value as any)}
            value={sortBy}
          >
            <option value="name">Sort by name</option>
            <option value="level">Sort by level (ascending)</option>
            <option value="level-reverse">Sort by level (descending)</option>
          </select>
          <select
            className={styles.ShowTierSelect}
            onChange={({ target }) => setShowTier(target.value as any)}
            value={showTier}
          >
            <option value="tier-1">Tier 1</option>
            <option value="tier-2">Tier 2</option>
          </select>
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
          {items.map((item) =>
            isTier1Item(item) ? (
              <Tier1ItemUpgradePlanner item={item} key={item.id} />
            ) : isTier2Item(item) ? (
              <Tier2ItemUpgradePlanner item={item} key={item.id} />
            ) : (
              <div>Unknown item type</div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Tier1ItemUpgradePlanner({ item }: { item: Tier1Item }) {
  return <ItemUpgradePlanner item={item} />;
}

function Tier2ItemUpgradePlanner({ item }: { item: Tier2Item }) {
  const componentItems = useMemo(() => {
    let tier1Items: Tier1Item[];
    switch (item.category) {
      case "drone":
        tier1Items = TIER_1_DRONES;
        break;
      case "ship":
        tier1Items = TIER_1_SHIPS;
        break;
      case "stone":
        tier1Items = TIER_1_STONES;
        break;
    }

    return item.createdByMerging.map(
      (id) => tier1Items.find((tier1Item) => tier1Item.id === id)!
    );
  }, [item]);

  return <ItemUpgradePlanner item={item} componentItems={componentItems} />;
}
