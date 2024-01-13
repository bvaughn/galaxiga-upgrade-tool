import { IconButton } from "../../components/IconButton";
import { ItemImage } from "../../components/ItemImage";
import { DEFAULT_ITEM_STATS, Item } from "../../types";
import { PendingUpgradeItem } from "../types";
import styles from "./shared.module.css";

export function FormStep3Upgrade({
  goToNextStep,
  goToPreviousStep,
  items,
  onDismiss,
  pendingAction,
}: {
  goToNextStep: (value?: PendingUpgradeItem) => void;
  goToPreviousStep: () => void;
  items: Item[];
  onDismiss: () => void;
  pendingAction: PendingUpgradeItem;
}) {
  const { category } = pendingAction;

  return (
    <div className={styles.Form}>
      <div className={styles.Prompt}>
        Which {category} would you like to upgrade?
      </div>
      <div className={styles.OptionList}>
        {items.map((item) => (
          <button
            className={styles.OptionsItemButton}
            key={item.id}
            onClick={() =>
              goToNextStep({
                ...pendingAction,
                primaryItem: item,
                itemStatsFrom: DEFAULT_ITEM_STATS,
                itemStatsTo: DEFAULT_ITEM_STATS,
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
        <button className={styles.CancelButton} onClick={onDismiss}>
          Cancel
        </button>
        <IconButton
          disabled={!pendingAction.primaryItem}
          iconType="next"
          onClick={() => goToNextStep()}
        />
      </div>
    </div>
  );
}
