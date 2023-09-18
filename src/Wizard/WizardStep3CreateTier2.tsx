import { IconButton } from "../components/IconButton";
import { ItemImage } from "../components/ItemImage";
import { Item } from "../types";
import { PendingCreateTier2Data } from "./types";

import styles from "./WizardStep.module.css";

export function WizardStep3CreateTier2({
  cancel,
  goToNextStep,
  goToPreviousStep,
  items,
  pendingWizardData,
}: {
  cancel: () => void;
  goToNextStep: (value?: PendingCreateTier2Data) => void;
  goToPreviousStep: () => void;
  items: Item[];
  pendingWizardData: PendingCreateTier2Data;
}) {
  const { category } = pendingWizardData;

  return (
    <>
      <div className={styles.Prompt}>
        Which {category} would you like to create?
      </div>
      <div className={styles.OptionList}>
        {items.map((item) => (
          <button
            className={styles.OptionsItemButton}
            key={item.id}
            onClick={() =>
              goToNextStep({
                ...pendingWizardData,
                primaryItem: item,
              })
            }
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
        <IconButton
          disabled={!pendingWizardData.primaryItem}
          iconType="next"
          onClick={() => goToNextStep()}
        />
      </div>
    </>
  );
}
