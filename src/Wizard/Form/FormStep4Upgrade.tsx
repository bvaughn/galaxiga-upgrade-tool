import { useState } from "react";
import { Card } from "../../components/Card";
import { IconButton } from "../../components/IconButton";
import { NumberInput } from "../../components/NumberInput";
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

  const [cards, setCards] = useState(itemStatsFrom?.cards ?? 0);
  const [genericCards, setGenericCards] = useState<number>(
    pendingAction.genericCards ?? 0
  );

  return (
    <div className={styles.Form}>
      <div className={styles.Prompt}>What level is {item.name} currently?</div>
      <ItemStatsSelector
        category={category}
        className={styles.Levels}
        hideCardsInput={true}
        itemStats={itemStatsFrom}
        onChange={setItemStatsFrom}
      />
      <div className={styles.Prompt}>What level would you like to reach?</div>
      <ItemStatsSelector
        category={category}
        className={styles.Levels}
        hideCardsInput={true}
        itemStats={itemStatsTo}
        onChange={setItemStatsTo}
      />
      <div className={styles.Prompt}>How many cards do you have?</div>
      <div className={styles.CardsColumn}>
        <div className={styles.CardsRow}>
          <label className={styles.CardInputLabel}>
            <div className={styles.LabelText}>{item.name} cards</div>
            <Card type="specific" category={item.category} />
            <NumberInput
              className={styles.CardInput}
              maxValue={99999}
              minValue={0}
              onChange={setCards}
              value={cards}
            />
          </label>
        </div>
      </div>
      <div className={styles.CardsColumn}>
        <div className={styles.CardsRow}>
          <label className={styles.CardInputLabel}>
            <div className={styles.LabelText}>
              Generic {item.category} cards
            </div>
            <Card type="generic" category={item.category} />
            <NumberInput
              className={styles.CardInput}
              maxValue={99999}
              minValue={0}
              onChange={setGenericCards}
              value={genericCards}
            />
          </label>
        </div>
      </div>

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
              genericCards,
              itemStatsFrom: {
                ...itemStatsFrom,
                cards,
              },
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
