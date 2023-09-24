import { IconButton } from "../../components/IconButton";
import { PendingAction } from "../types";
import styles from "./shared.module.css";

export function FormStep2({
  goToNextStep,
  goToPreviousStep,
  onDismiss,
  pendingAction,
}: {
  goToNextStep: (value?: PendingAction) => void;
  goToPreviousStep: () => void;
  onDismiss: () => void;
  pendingAction: PendingAction;
}) {
  const actionLabel =
    pendingAction.type === "create-tier-2" ? "create" : "upgrade";

  return (
    <div className={styles.Form}>
      <div className={styles.Prompt}>What would you like to {actionLabel}?</div>
      <div className={styles.OptionColumn}>
        <button
          className={styles.OptionButton}
          onClick={() =>
            goToNextStep({
              ...pendingAction,
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
              ...pendingAction,
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
              ...pendingAction,
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
        <button className={styles.CancelButton} onClick={onDismiss}>
          Cancel
        </button>
        <IconButton
          disabled={!pendingAction.category}
          iconType="next"
          onClick={() => goToNextStep()}
        />
      </div>
    </div>
  );
}
