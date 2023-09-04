import { Card } from "../components/Card";
import { NumberInput } from "../components/NumberInput";

import { useDeferredValue, useMemo } from "react";
import { CategoryTabs } from "../components/CategoryTabs";
import { Coin } from "../components/Coin";
import { Gem } from "../components/Gem";
import { Input } from "../components/Input";
import { Select, SelectOption } from "../components/Select";
import { TIER_1_DRONES } from "../data/drones";
import { TIER_1_SHIPS } from "../data/ships";
import { TIER_1_STONES } from "../data/stones";
import { useBuyCardsWithGems } from "../hooks/useBuyCardsWithGems";
import { useCategory } from "../hooks/useCategory";
import { getItemStats } from "../hooks/useItemStats";
import { useItems } from "../hooks/useItems";
import useLocalStorage from "../hooks/useLocalStorage";
import { Tiers, useShowTier } from "../hooks/useShowTier";
import { Item, Tier1Item, Tier2Item, isTier1Item, isTier2Item } from "../types";
import { assert } from "../utils/assert";
import { ItemUpgradePlanner } from "./ItemUpgradePlanner";
import styles from "./index.module.css";

type SortBy = "level" | "level-reverse" | "name";

export function Calculator() {
  const [numCoins, setNumCoins] = useLocalStorage<number>("num-coins", 0);
  const [numGems, setNumGems] = useLocalStorage<number>("num-gems", 0);

  const [numGenericDroneCards, setNumGenericDroneCards] =
    useLocalStorage<number>("num-generic-drone-cards", 0);
  const [numGenericShipCards, setNumGenericShipCards] = useLocalStorage<number>(
    "num-generic-ship-cards",
    0
  );
  const [numGenericStoneCards, setNumGenericStoneCards] =
    useLocalStorage<number>("num-generic-stone-cards", 0);

  const [buyCardsWithGems, setBuyCardsWithGems] = useBuyCardsWithGems();

  const [category] = useCategory();

  const [filterByText, setFilterByText] = useLocalStorage<string>(
    "calculator-filter-by-text",
    ""
  );
  const deferredFilterByText = useDeferredValue(filterByText.toLowerCase());

  const [sortBy, setSortBy] = useLocalStorage<SortBy>(
    "calculator-sort-by",
    "name"
  );

  const [showTier, setShowTier] = useShowTier();

  const unfilteredItems = useItems();
  const items = useMemo(() => {
    let items: Item[] = [...unfilteredItems];

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
  }, [deferredFilterByText, sortBy, unfilteredItems]);

  return (
    <div className={styles.Page}>
      <div className={styles.ItemsRow}>
        <CategoryTabs />
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
          <Input<string>
            onChange={setFilterByText}
            placeholder="Filter by name..."
            type="text"
            value={filterByText}
          />
          <Select<SortBy>
            onChange={setSortBy}
            options={SORT_BY_OPTIONS}
            value={sortBy}
          />
          <Select<Tiers>
            onChange={setShowTier}
            options={TIERS_OPTIONS}
            value={showTier}
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
                maxValue={999_999_999}
                minValue={0}
                onChange={setNumGenericDroneCards}
                value={numGenericDroneCards}
              />
            </label>
          )}
          {category === "stone" && (
            <label className={styles.InputLabel}>
              <Card type="generic" category="stone" />
              <NumberInput
                className={styles.Input}
                data-type="cards"
                maxValue={999_999_999}
                minValue={0}
                onChange={setNumGenericStoneCards}
                value={numGenericStoneCards}
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

const SORT_BY_OPTIONS: SelectOption<SortBy>[] = [
  { label: "Sort by name", value: "name" },
  { label: "Sort by level", value: "level" },
  { label: "Sort by level (descending)", value: "level-reverse" },
];

const TIERS_OPTIONS: SelectOption<Tiers>[] = [
  { label: "Tier 1", value: "tier-1" },
  { label: "Tier 2", value: "tier-2" },
];
