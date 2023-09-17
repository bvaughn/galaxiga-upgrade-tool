import { IconButton } from "../components/IconButton";
import { PendingWizardData } from "./types";

import styles from "./WizardStep.module.css";

export function WizardStep2({
  cancel,
  goToNextStep,
  goToPreviousStep,
  pendingWizardData,
}: {
  cancel: () => void;
  goToNextStep: (value?: PendingWizardData) => void;
  goToPreviousStep: () => void;
  pendingWizardData: PendingWizardData;
}) {
  const actionLabel =
    pendingWizardData.action === "create-tier-2" ? "create" : "upgrade";

  return (
    <>
      <div className={styles.Prompt}>What would you like to {actionLabel}?</div>
      <div className={styles.OptionColumn}>
        <button
          className={styles.OptionButton}
          onClick={() =>
            goToNextStep({
              ...pendingWizardData,
              category: "ship",
            })
          }
        >
          <div className={styles.OptionHeader}>Ship</div>
        </button>
        <button
          className={styles.OptionButton}
          onClick={() =>
            goToNextStep({
              ...pendingWizardData,
              category: "drone",
            })
          }
        >
          <div className={styles.OptionHeader}>Drone</div>
        </button>
        <button
          className={styles.OptionButton}
          onClick={() =>
            goToNextStep({
              ...pendingWizardData,
              category: "stone",
            })
          }
        >
          <div className={styles.OptionHeader}>Stone</div>
        </button>
      </div>

      <div className={styles.Spacer} />

      <div className={styles.OptionColumn}>
        <IconButton iconType="previous" onClick={goToPreviousStep} />
        <button className={styles.CancelButton} onClick={cancel}>
          Cancel
        </button>
        <IconButton
          disabled={!pendingWizardData.category}
          iconType="next"
          onClick={() => goToNextStep()}
        />
      </div>
    </>
  );
}
