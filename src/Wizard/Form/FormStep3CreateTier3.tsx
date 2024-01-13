import { useState } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemImage } from "../../components/ItemImage";
import { DEFAULT_ITEM_STATS, Item } from "../../types";
import { getItems } from "../../utils/items";
import { PendingCreateTier3Item } from "../types";
import styles from "./shared.module.css";

export function FormStep3CreateTier3({
  goToNextStep,
  goToPreviousStep,
  onDismiss,
  pendingAction,
}: {
  goToNextStep: (value?: PendingCreateTier3Item) => void;
  goToPreviousStep: () => void;
  onDismiss: () => void;
  pendingAction: PendingCreateTier3Item;
}) {
  const { category } = pendingAction;

  const [item1, setItem1] = useState<Item | null>(null);
  const [item2, setItem2] = useState<Item | null>(null);

  const items = getItems(category!, 2);

  const saveDisabled = item1 == null || item2 == null;
  const save = () => {
    if (item1 && item2) {
      goToNextStep({
        ...pendingAction,
        itemStats: [DEFAULT_ITEM_STATS, DEFAULT_ITEM_STATS],
        secondaryItems: [item1, item2],
      });
    }
  };

  return (
    <div className={styles.Form}>
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
        <button className={styles.CancelButton} onClick={onDismiss}>
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
    </div>
  );
}
