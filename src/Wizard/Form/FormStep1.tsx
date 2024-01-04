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
    <div className={styles.Form}>
      <div className={styles.Prompt}>What would you like to do?</div>
      <div className={styles.SubPrompt}>Upgrade an item...</div>
      <div className={styles.OptionColumn}>
        {[1, 2, 3, 4, 5].map((tier) => (
          <button
            className={styles.OptionButton}
            data-tier={tier}
            disabled={tier === 5}
            key={tier}
            onClick={() =>
              goToNextStep({
                ...pendingAction,
                type: `upgrade-tier-${tier}` as any,
              })
            }
          >
            {tier <= 3 ? `Tier ${tier}` : `Elite ${tier - 3}`}
          </button>
        ))}
      </div>
      <div className={styles.SubPrompt}>Create an item...</div>
      <div className={styles.OptionColumn}>
        {[1, 2, 3, 4, 5].map((tier) => (
          <button
            className={styles.OptionButton}
            disabled={tier === 1}
            data-tier={tier}
            key={tier}
            onClick={() =>
              goToNextStep({
                ...pendingAction,
                type: `create-tier-${tier}` as any,
              })
            }
          >
            {tier <= 3 ? `Tier ${tier}` : `Elite ${tier - 3}`}
          </button>
        ))}
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
    </div>
  );
}
