import { useState } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemImage } from "../../components/ItemImage";
import { Item, ItemStats, Tier2Item } from "../../types";
import { assert } from "../../utils/assert";
import { getItems } from "../../utils/items";
import {
  Action,
  CreateTier2Item,
  PendingCreateTier2Item,
  PendingCreateTier3Item,
  isPendingCreateTier2Item,
  isPendingCreateTier3Item,
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
  pendingAction: PendingCreateTier2Item | PendingCreateTier3Item;
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
  } else {
    throw Error("Unsupported data");
  }
  assert(items);

  const [secondaryItemStats, setSecondaryItemStats] = useState<ItemStats[]>(
    pendingAction.secondaryItemStats ?? []
  );

  return (
    <>
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
              category={category}
              className={styles.ItemStatsSelector}
              itemStats={secondaryItemStats[index]}
              onChange={(itemStats) => {
                const newSecondaryItemStats = [...secondaryItemStats];
                newSecondaryItemStats[index] = itemStats;
                setSecondaryItemStats(newSecondaryItemStats);
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
              secondaryItemStats,
            } as CreateTier2Item);
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
