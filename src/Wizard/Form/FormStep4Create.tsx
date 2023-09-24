import { IconButton } from "../../components/IconButton";
import { ItemImage } from "../../components/ItemImage";
import { getItemStats } from "../../hooks/useItemStats";
import { Item, Tier2Item } from "../../types";
import { getItems } from "../../utils/items";
import {
  PendingCreateTier2Data,
  PendingCreateTier3Data,
  WizardData,
  WizardDataCreateTier2,
  isPendingCreateTier2Data,
  isPendingCreateTier3Data,
} from "../types";
import { ItemStatsSelector } from "./ItemStatsSelector";
import styles from "./shared.module.css";

export function FormStep4Create({
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
