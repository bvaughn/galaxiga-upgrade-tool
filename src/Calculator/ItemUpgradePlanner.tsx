import { useEffect, useState } from "react";
import { ItemImage } from "../components/ItemImage";
import { Item } from "../types";

import { GradientContainer } from "../components/GradientContainer";
import { ItemCosts } from "../components/ItemCosts";
import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";
import {
  getItemStats,
  getItemStatsKey,
  useItemStats,
} from "../hooks/useItemStats";

import { Card } from "../components/Card";
import { ItemLevels } from "../components/ItemLevels";
import { NumberInput } from "../components/NumberInput";
import styles from "./ItemUpgradePlanner.module.css";

export function ItemUpgradePlanner({
  componentItems = [],
  isNested = false,
  item,
}: {
  componentItems?: Item[];
  isNested?: boolean;
  item: Item;
}) {
  const [componentItemStats, setComponentItemStats] = useState(
    componentItems.map((item) => getItemStats(item))
  );

  const [itemStats, setItemStats] = useItemStats(item);

  useEffect(() => {
    const keys = componentItems.map((item) => getItemStatsKey(item));

    const onStorage = (event: StorageEvent) => {
      if (event.key && keys.includes(event.key)) {
        setComponentItemStats(componentItems.map((item) => getItemStats(item)));
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [componentItems]);

  const isComplete =
    itemStats.level === MAX_LEVEL_NUMBER &&
    itemStats.subLevel === MAX_SUB_LEVEL_NUMBER;

  const isUnlocked = componentItemStats.every(
    (itemStats) =>
      itemStats.level === MAX_LEVEL_NUMBER &&
      itemStats.subLevel === MAX_SUB_LEVEL_NUMBER
  );

  const content = (
    <>
      <div className={styles.Container} data-is-nested={isNested || undefined}>
        <div className={styles.LeftColumn}>
          <ItemImage
            className={isNested ? styles.NestedImage : styles.Image}
            item={item}
          />
          <div>
            <div className={styles.Name}>{item.name}</div>
            <ItemLevels item={item} />
          </div>
        </div>
        <div className={styles.RightColumn}>
          {isUnlocked && !isComplete && (
            <label className={styles.CardInputLabel}>
              <Card type="specific" category={item.category} />
              <NumberInput
                className={styles.CardInput}
                maxValue={9999}
                minValue={0}
                onChange={(cards: number) => {
                  setItemStats({
                    ...itemStats,
                    cards,
                  });
                }}
                value={itemStats.cards}
              />
            </label>
          )}
          <ItemCosts
            deductGenericCards={!isNested}
            includeCostToMerge={componentItems.length > 0 /* TODO */}
            items={isUnlocked ? [item] : componentItems}
          />
        </div>
        {componentItems.length > 0 && (
          <div
            className={styles.ComponentItemsContainer}
            data-is-complete={isUnlocked || undefined}
          >
            {componentItems.map((componentItem) => (
              <ItemUpgradePlanner
                isNested={true}
                item={componentItem}
                key={componentItem.id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );

  return isNested ? content : <GradientContainer>{content}</GradientContainer>;
}
