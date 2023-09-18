import { useState } from "react";
import { Card } from "../components/Card";
import { ItemImage } from "../components/ItemImage";
import { NumberInput } from "../components/NumberInput";
import { getItemStats } from "../hooks/useItemStats";
import { Item, Tier2Item } from "../types";
import {
  PendingCreateTier2Data,
  PendingCreateTier3Data,
  WizardData,
  WizardDataCreateTier2,
  isPendingCreateTier2Data,
  isPendingCreateTier3Data,
} from "./types";

import { IconButton } from "../components/IconButton";
import { getItems } from "../utils/items";
import { ItemStatsSelector } from "./ItemStatsSelector";
import styles from "./WizardStep.module.css";

export function WizardStep4Create({
  cancel,
  goToPreviousStep,
  pendingWizardData,
  save,
}: {
  cancel: () => void;
  goToPreviousStep: () => void;
  pendingWizardData: PendingCreateTier2Data | PendingCreateTier3Data;
  save: (wizardData: WizardData) => void;
}) {
  const category = pendingWizardData.category!;

  const [genericCards, setGenericCards] = useState(0);

  let items: Item[];
  if (isPendingCreateTier2Data(pendingWizardData)) {
    const allItems = getItems(category, 1);
    items = (pendingWizardData.primaryItem as Tier2Item).createdByMerging.map(
      (itemId) => allItems.find((item) => item.id === itemId)!
    );
  } else if (isPendingCreateTier3Data(pendingWizardData)) {
    items = pendingWizardData.secondaryItems!;
  } else {
    throw Error("Unsupported data");
  }

  return (
    <>
      <div className={styles.Prompt}>
        What level are your {pendingWizardData.category}s currently?
      </div>
      {items.map((item) => {
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
              item={item}
              persistenceKey={`${pendingWizardData.id}:${item.id}`}
            />
          </div>
        );
      })}
      <div className={styles.GenericCardsRow}>
        <label className={styles.CardInputLabel}>
          <div className={styles.LabelText}>Generic {category} cards</div>
          <Card type="generic" category={category} />
          <NumberInput
            className={styles.CardInput}
            maxValue={9999}
            minValue={0}
            onChange={setGenericCards}
            value={genericCards}
          />
        </label>
      </div>

      <div className={styles.Spacer} />

      <div className={styles.OptionColumn}>
        <IconButton iconType="previous" onClick={goToPreviousStep} />
        <button className={styles.CancelButton} onClick={cancel}>
          Cancel
        </button>
        <button
          className={styles.SaveButton}
          onClick={() => {
            save({
              ...pendingWizardData,
              genericCards,
              secondaryItemStats: items.map((item) =>
                getItemStats(item, `${pendingWizardData.id}:${item.id}`)
              ),
            } as WizardDataCreateTier2);
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
