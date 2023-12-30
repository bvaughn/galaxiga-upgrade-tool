import { useState } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemImage } from "../../components/ItemImage";
import { DEFAULT_ITEM_STATS, Item, ItemStats, Tier2Item } from "../../types";
import { assert } from "../../utils/assert";
import { getItems } from "../../utils/items";
import {
  Action,
  CreateTier2Item,
  PendingCreateTier2Item,
  PendingCreateTier3Item,
  PendingCreateTier4Item,
  PendingCreateTier5Item,
  isPendingCreateTier2Item,
  isPendingCreateTier3Item,
  isPendingCreateTier4Item,
  isPendingCreateTier5Item,
} from "../types";
import { ItemStatsSelector } from "./ItemStatsSelector";
import styles from "./shared.module.css";

export function FormStep4Create({
  goToPreviousStep,
  onDismiss,
  onSave,
  pendingAction,
}: {
  goToPreviousStep: () => void;
  onDismiss: () => void;
  onSave: (wizardData: Action) => void;
  pendingAction:
    | PendingCreateTier2Item
    | PendingCreateTier3Item
    | PendingCreateTier4Item
    | PendingCreateTier5Item;
}) {
  const { category } = pendingAction;
  assert(category);

  let items: Item[];
  if (isPendingCreateTier2Item(pendingAction)) {
    const allItems = getItems(category, 1);
    items = (pendingAction.primaryItem as Tier2Item).createdByMerging.map(
      (itemId) => allItems.find((item) => item.id === itemId)!
    );
  } else if (isPendingCreateTier3Item(pendingAction)) {
    items = pendingAction.secondaryItems!;
  } else if (isPendingCreateTier4Item(pendingAction)) {
    const allItems = getItems(category, 3);
    items = [allItems.find(({ id }) => pendingAction.primaryItem!.id === id)!];
  } else if (isPendingCreateTier5Item(pendingAction)) {
    const allItems = getItems(category, 4);
    items = [allItems.find(({ id }) => pendingAction.primaryItem!.id === id)!];
  } else {
    throw Error("Unsupported data");
  }
  assert(items);

  const [itemStats, setItemStats] = useState<ItemStats[]>(
    Array.isArray(pendingAction.itemStats)
      ? pendingAction.itemStats
      : pendingAction.itemStats
      ? [pendingAction.itemStats]
      : []
  );

  return (
    <div className={styles.Form}>
      <div className={styles.Prompt}>
        What level are your {pendingAction.category}s currently?
      </div>
      {items.map((item, index) => {
        return (
          <div className={styles.TierImageAndLevels} key={item.id}>
            <div className={styles.ItemImageAndNameColumn}>
              <ItemImage
                className={styles.OptionsItemButtonImage}
                item={item}
              />
              <div className={styles.ItemName}>{item.name}</div>
            </div>
            <ItemStatsSelector
              className={styles.ItemStatsSelector}
              itemStats={itemStats[index] ?? DEFAULT_ITEM_STATS}
              onChange={(newItemStats) => {
                const newSecondaryItemStats = [...itemStats];
                newSecondaryItemStats[index] = newItemStats;
                setItemStats(newSecondaryItemStats);
              }}
            />
          </div>
        );
      })}

      <div className={styles.Spacer} />

      <div className={styles.OptionColumn}>
        <IconButton iconType="previous" onClick={goToPreviousStep} />
        <button className={styles.CancelButton} onClick={onDismiss}>
          Cancel
        </button>
        <button
          className={styles.SaveButton}
          onClick={() => {
            onSave({
              ...pendingAction,
              itemStats,
            } as CreateTier2Item);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
