import { useState } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemStats } from "../../types";
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
  const {
    category,
    itemStatsFrom: defaultItemStatsFrom,
    itemStatsTo: defaultItemStatsTo,
    primaryItem: item,
  } = pendingAction;

  assert(category);
  assert(defaultItemStatsFrom);
  assert(defaultItemStatsTo);
  assert(item);

  const [itemStatsFrom, setItemStatsFrom] =
    useState<ItemStats>(defaultItemStatsFrom);
  const [itemStatsTo, setItemStatsTo] = useState<ItemStats>(defaultItemStatsTo);

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
