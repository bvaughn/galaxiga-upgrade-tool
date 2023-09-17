import { useState } from "react";
import { Card } from "../components/Card";
import { ItemImage } from "../components/ItemImage";
import { NumberInput } from "../components/NumberInput";
import { TIER_1_DRONES } from "../data/drones";
import { TIER_1_SHIPS } from "../data/ships";
import { TIER_1_STONES } from "../data/stones";
import { getItemStats } from "../hooks/useItemStats";
import { Tier1Item, Tier2Item } from "../types";
import { assert } from "../utils/assert";
import { PendingWizardData, WizardData, WizardDataCreate } from "./types";

import { IconButton } from "../components/IconButton";
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
  pendingWizardData: PendingWizardData;
  save: (wizardData: WizardData) => void;
}) {
  const { primaryItem: item } = pendingWizardData;
  assert(item);

  const [genericCards, setGenericCards] = useState(0);

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

  const items = (
    pendingWizardData.primaryItem as Tier2Item
  ).createdByMerging.map(
    (itemId) => tier1Items.find((item) => item.id === itemId)!
  );

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
          <div className={styles.LabelText}>Generic {item.category} cards</div>
          <Card type="generic" category={item.category} />
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
            } as WizardDataCreate);
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
