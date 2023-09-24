import { IconButton } from "../../components/IconButton";
import { PendingAction } from "../types";
import styles from "./shared.module.css";

export function FormStep1({
  goToNextStep,
  onDismiss,
  pendingAction,
}: {
  goToNextStep: (value?: PendingAction) => void;
  onDismiss: () => void;
  pendingAction: PendingAction;
}) {
  return (
    <>
      <div className={styles.Prompt}>What would you like to do?</div>
      <div className={styles.OptionColumn}>
        <button
          className={styles.OptionButton}
          onClick={() =>
            goToNextStep({
              ...pendingAction,
              type: "upgrade-tier-1",
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
              ...pendingAction,
              type: "upgrade-tier-2",
            })
          }
        >
          <div className={styles.OptionHeader}>Upgrade</div>
          <div className={styles.OptionSubText}>tier 2</div>
        </button>
        <button
          className={styles.OptionButton}
          onClick={() =>
            goToNextStep({
              ...pendingAction,
              type: "upgrade-tier-3",
            })
          }
        >
          <div className={styles.OptionHeader}>Upgrade</div>
          <div className={styles.OptionSubText}>tier 3</div>
        </button>
      </div>
      <div className={styles.OptionColumn}>
        <button
          className={styles.OptionButton}
          onClick={() =>
            goToNextStep({
              ...pendingAction,
              type: "create-tier-2",
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
              ...pendingAction,
              type: "create-tier-3",
            })
          }
        >
          <div className={styles.OptionHeader}>Create</div>
          <div className={styles.OptionSubText}>tier 3</div>
        </button>
      </div>

      <div className={styles.Spacer} />

      <div className={styles.OptionColumn}>
        <IconButton disabled iconType="previous" />
        <button className={styles.CancelButton} onClick={onDismiss}>
          Cancel
        </button>
        <IconButton
          disabled={!pendingAction.type}
          iconType="next"
          onClick={() => goToNextStep()}
        />
      </div>
    </>
  );
}
