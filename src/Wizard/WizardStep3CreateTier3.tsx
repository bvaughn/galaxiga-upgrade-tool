import { useState } from "react";
import { IconButton } from "../components/IconButton";
import { ItemImage } from "../components/ItemImage";
import { getItems } from "../utils/items";
import { PendingCreateTier3Data } from "./types";

import { Item } from "../types";
import styles from "./WizardStep.module.css";

export function WizardStep3CreateTier3({
  cancel,
  goToNextStep,
  goToPreviousStep,
  pendingWizardData,
}: {
  cancel: () => void;
  goToNextStep: (value?: PendingCreateTier3Data) => void;
  goToPreviousStep: () => void;
  pendingWizardData: PendingCreateTier3Data;
}) {
  const { category } = pendingWizardData;

  const [item1, setItem1] = useState<Item | null>(null);
  const [item2, setItem2] = useState<Item | null>(null);

  const items = getItems(category!, 2);

  const saveDisabled = item1 == null || item2 == null;
  const save = () => {
    if (item1 && item2) {
      goToNextStep({
        ...pendingWizardData,
        secondaryItems: [item1, item2],
      });
    }
  };

  return (
    <>
      <div className={styles.Prompt}>
        Which {category}s do you want to merge?
      </div>
      <div className={styles.OptionList}>
        {items.map((item) => (
          <button
            className={styles.OptionsItemButton}
            data-selected={item === item1 || undefined}
            key={item.id}
            onClick={() => setItem1(item)}
          >
            <ItemImage className={styles.OptionsItemButtonImage} item={item} />
            {item.name}
          </button>
        ))}
      </div>
      <div className={styles.OptionList}>
        {items.map((item) => (
          <button
            className={styles.OptionsItemButton}
            data-selected={item === item2 || undefined}
            key={item.id}
            onClick={() => setItem2(item)}
          >
            <ItemImage className={styles.OptionsItemButtonImage} item={item} />
            {item.name}
          </button>
        ))}
      </div>

      <div className={styles.Spacer} />

      <div className={styles.OptionColumn}>
        <IconButton iconType="previous" onClick={goToPreviousStep} />
        <button className={styles.CancelButton} onClick={cancel}>
          Cancel
        </button>
        <button
          className={styles.SaveButton}
          disabled={saveDisabled}
          onClick={save}
        >
          Save
        </button>
        <IconButton disabled={saveDisabled} iconType="next" onClick={save} />
      </div>
    </>
  );
}
