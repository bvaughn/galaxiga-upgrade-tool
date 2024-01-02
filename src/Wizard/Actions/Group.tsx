import { ErrorBoundary } from "react-error-boundary";
import { IconButton } from "../../components/IconButton";
import { CreateAction } from "../Actions/CreateAction";
import { DeleteCorruptedAction } from "../Actions/DeleteCorruptedAction";
import { UpgradeAction } from "../Actions/UpgradeAction";
import {
  Action,
  isCreateTier2Item,
  isCreateTier3Item,
  isCreateTier4Item,
  isCreateTier5Item,
  isUpgradeItem,
} from "../types";

import { useMemo } from "react";
import { ItemCosts } from "../../components/ItemCosts";
import { calculateCreateItemCost } from "../../utils/calculateCreateItemCost";
import { calculateUpgradeItemCost } from "../../utils/calculateUpgradeItemCost";
import styles from "./shared.module.css";

export function Group({
  actions,
  addAction,
  deleteAction,
  editAction,
}: {
  actions: Action[];
  addAction: () => void;
  deleteAction: (action: Action) => void;
  editAction: (action: Action) => void;
}) {
  const category = actions[0]?.category ?? "ship";

  const totalCost = useMemo(
    () =>
      actions.reduce(
        (totalCost, action) => {
          let { cardsNeeded, coinsNeeded, gemsNeeded } = totalCost;

          if (isUpgradeItem(action)) {
            const cost = calculateUpgradeItemCost(action);

            cardsNeeded += cost.boxes.without.cardsNeededForLevels;
            coinsNeeded += cost.boxes.without.coinsNeededForLevels;
            gemsNeeded += cost.boxes.without.gemsNeededForLevels;
          } else {
            const cost = calculateCreateItemCost(action);

            cardsNeeded += cost.boxes.without.cardsNeededForLevels;
            coinsNeeded += cost.boxes.without.coinsNeededForLevels;
            gemsNeeded += cost.gemsNeededToMerge;
          }

          return {
            cardsNeeded,
            coinsNeeded,
            gemsNeeded,
          };
        },
        {
          cardsNeeded: 0,
          coinsNeeded: 0,
          gemsNeeded: 0,
        }
      ),
    [actions]
  );

  return (
    <div className={styles.Group}>
      {actions.length > 1 && (
        <div className={styles.GroupCostRow}>
          <ItemCosts
            buyCards={false}
            category={category}
            cardsNeeded={totalCost.cardsNeeded}
            centerAlign
            coinsNeeded={totalCost.coinsNeeded}
            gemsNeeded={totalCost.gemsNeeded}
          />
        </div>
      )}
      {actions.map((action) => {
        if (
          isCreateTier2Item(action) ||
          isCreateTier3Item(action) ||
          isCreateTier4Item(action) ||
          isCreateTier5Item(action)
        ) {
          return (
            <ErrorBoundary
              key={action.id}
              fallback={<DeleteCorruptedAction action={action} />}
            >
              <CreateAction
                action={action}
                deleteAction={() => deleteAction(action)}
                editAction={() => editAction(action)}
              />
            </ErrorBoundary>
          );
        } else if (isUpgradeItem(action)) {
          return (
            <ErrorBoundary
              key={action.id}
              fallback={<DeleteCorruptedAction action={action} />}
            >
              <UpgradeAction
                action={action}
                deleteAction={() => deleteAction(action)}
                editAction={() => editAction(action)}
              />
            </ErrorBoundary>
          );
        } else {
          throw Error("Unsupported action");
        }
      })}
      <IconButton
        buttonClassName={styles.AddActionButton}
        iconClassName={styles.AddActionIcon}
        iconType="add"
        label="Add action"
        onClick={addAction}
      />
    </div>
  );
}
