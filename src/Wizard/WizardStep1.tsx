import { IconButton } from "../components/IconButton";
import { PendingWizardData } from "./types";

import styles from "./WizardStep.module.css";

export function WizardStep1({
  cancel,
  goToNextStep,
  pendingWizardData,
}: {
  cancel: () => void;
  goToNextStep: (value?: PendingWizardData) => void;
  pendingWizardData: PendingWizardData;
}) {
  return (
    <>
      <div className={styles.Prompt}>What would you like to do?</div>
      <div className={styles.OptionColumn}>
        <button
          className={styles.OptionButton}
          onClick={() =>
            goToNextStep({
              ...pendingWizardData,
              action: "upgrade-tier-1",
            })
          }
        >
          <div className={styles.OptionHeader}>Upgrade</div>
          <div className={styles.OptionSubText}>tier 1</div>
        </button>
        <button
          className={styles.OptionButton}
          onClick={() =>
            goToNextStep({
              ...pendingWizardData,
              action: "create-tier-2",
            })
          }
        >
          <div className={styles.OptionHeader}>Create</div>
          <div className={styles.OptionSubText}>tier 2</div>
        </button>
        <button
          className={styles.OptionButton}
          onClick={() =>
            goToNextStep({
              ...pendingWizardData,
              action: "upgrade-tier-2",
            })
          }
        >
          <div className={styles.OptionHeader}>Upgrade</div>
          <div className={styles.OptionSubText}>tier 2</div>
        </button>
      </div>

      <div className={styles.Spacer} />

      <div className={styles.OptionColumn}>
        <IconButton disabled iconType="previous" />
        <button className={styles.CancelButton} onClick={cancel}>
          Cancel
        </button>
        <IconButton
          disabled={!pendingWizardData.action}
          iconType="next"
          onClick={() => goToNextStep()}
        />
      </div>
    </>
  );
}
