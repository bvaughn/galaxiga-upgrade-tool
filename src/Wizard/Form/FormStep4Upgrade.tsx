import { useState } from "react";
import { IconButton } from "../../components/IconButton";
import { DEFAULT_ITEM_STATS, ItemStats } from "../../types";
import { assert } from "../../utils/assert";
import { Action, PendingUpgradeItem, UpgradeItem } from "../types";
import { ItemStatsSelector } from "./ItemStatsSelector";
import styles from "./shared.module.css";

export function FormStep4Upgrade({
  goToPreviousStep,
  onDismiss,
  onSave,
  pendingAction,
}: {
  goToPreviousStep: () => void;
  onDismiss: () => void;
  onSave: (wizardData: Action) => void;
  pendingAction: PendingUpgradeItem;
}) {
  const { category, primaryItem: item } = pendingAction;
  assert(category);
  assert(item);

  const [itemStatsFrom, setItemStatsFrom] = useState<ItemStats>(
    pendingAction.itemStatsFrom ?? DEFAULT_ITEM_STATS
  );
  const [itemStatsTo, setItemStatsTo] = useState<ItemStats>(
    pendingAction.itemStatsTo ?? DEFAULT_ITEM_STATS
  );

  return (
    <div className={styles.Form}>
      <div className={styles.Prompt}>What level is {item.name} currently?</div>
      <ItemStatsSelector
        className={styles.Levels}
        itemStats={itemStatsFrom}
        onChange={setItemStatsFrom}
      />
      <div className={styles.Prompt}>What level would you like to reach?</div>
      <ItemStatsSelector
        className={styles.Levels}
        itemStats={itemStatsTo}
        onChange={setItemStatsTo}
      />

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
              itemStatsFrom,
              itemStatsTo,
            } as UpgradeItem);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
