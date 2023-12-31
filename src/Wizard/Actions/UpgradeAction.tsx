import { useMemo } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemCosts } from "../../components/ItemCosts";
import { ItemImage } from "../../components/ItemImage";
import { calculateUpgradeItemCost } from "../../utils/calculateUpgradeItemCost";
import { UpgradeItem as WizardDataUpgradeType } from "../types";
import styles from "./shared.module.css";

export function UpgradeAction({
  action,
  deleteAction,
  editAction,
}: {
  action: WizardDataUpgradeType;
  deleteAction: () => void;
  editAction: () => void;
}) {
  const { id, itemStatsTo, primaryItem: item } = action;

  const toString =
    itemStatsTo.subLevel === 0
      ? itemStatsTo.level
      : `${itemStatsTo.level}.${itemStatsTo.subLevel}`;

  const cost = useMemo(() => calculateUpgradeItemCost(action), [action]);

  return (
    <div className={styles.Action} data-separator key={id}>
      <div className={styles.Row}>
        <ItemImage className={styles.ItemImage} item={item} />
        <div className={styles.MiddleColumn}>
          <div className={styles.ActionPrimaryLabel}>
            <div className={styles.Row} data-compact>
              <span className={styles.SmallText}>Upgrade</span> {item.name}{" "}
              <span className={styles.SmallText}>to {toString}</span>
            </div>
          </div>
          <ItemCosts
            buyCards={false}
            cardsNeeded={cost.boxes.without.cardsNeededForLevels}
            category={item.category}
            coinsNeeded={cost.boxes.without.coinsNeededForLevels}
            gemsNeeded={cost.boxes.without.gemsNeededForLevels}
          />
          {cost.boxes.without.cardsNeededForLevels > 0 && (
            <small className={styles.Row}>
              <ItemCosts
                buyCards={true}
                cardsNeeded={cost.boxes.with.cardsNeededForLevels}
                category={item.category}
                coinsNeeded={cost.boxes.with.coinsNeededForLevels}
                gemsNeeded={cost.boxes.with.gemsNeededForLevels}
              />
            </small>
          )}
        </div>
        <div className={styles.ActionsColumn}>
          <IconButton
            buttonClassName={styles.EditButton}
            iconClassName={styles.EditButtonIcon}
            iconType="edit"
            label="Edit"
            onClick={editAction}
          />
          <IconButton
            buttonClassName={styles.DeleteButton}
            iconClassName={styles.DeleteButtonIcon}
            iconType="delete"
            label="Delete"
            onClick={deleteAction}
          />
        </div>
      </div>
    </div>
  );
}
