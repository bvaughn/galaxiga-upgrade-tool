import { useMemo } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemCosts } from "../../components/ItemCosts";
import { ItemImage } from "../../components/ItemImage";
import { Category, Item } from "../../types";
import { calculateCreateItemCost } from "../../utils/calculateCreateItemCost";
import {
  CreateItem,
  isCreateTier2Item,
  isCreateTier3Item,
  isCreateTier4Item,
  isCreateTier5Item,
} from "../types";
import styles from "./shared.module.css";

export function CreateAction({
  action,
  deleteAction,
  editAction,
}: {
  action: CreateItem;
  deleteAction: () => void;
  editAction: () => void;
}) {
  const { id } = action;

  let category: Category;
  let item: Item;
  let name: string;

  if (isCreateTier2Item(action)) {
    item = action.primaryItem;
    category = item.category;
    name = item.name;
  } else if (isCreateTier3Item(action)) {
    item = action.secondaryItems[0];
    category = item.category;
    name = `Super ${item.name}`;
  } else if (isCreateTier4Item(action)) {
    item = action.primaryItem;
    category = item.category;
    name = item.name;
  } else if (isCreateTier5Item(action)) {
    item = action.primaryItem;
    category = item.category;
    name = item.name;
  } else {
    throw Error("Unsupported data");
  }

  const cost = useMemo(() => calculateCreateItemCost(action), [action]);

  return (
    <div className={styles.Action} data-separator key={id}>
      <div className={styles.Row}>
        <ItemImage className={styles.ItemImage} item={item} />
        <div className={styles.MiddleColumn}>
          <div className={styles.ActionPrimaryLabel}>
            <div className={styles.Row} data-compact>
              <span className={styles.SmallText}>Create</span> {name}
            </div>
          </div>
          <ItemCosts
            buyCards={false}
            cardsNeeded={cost.boxes.without.cardsNeededForLevels}
            category={category}
            coinsNeeded={cost.boxes.without.coinsNeededForLevels}
            gemsNeeded={
              cost.boxes.without.gemsNeededForLevels + cost.gemsNeededToMerge
            }
          />
          {cost.boxes.without.cardsNeededForLevels > 0 && (
            <small className={styles.Row}>
              <ItemCosts
                buyCards={true}
                cardsNeeded={cost.boxes.with.cardsNeededForLevels}
                category={category}
                coinsNeeded={cost.boxes.with.coinsNeededForLevels}
                gemsNeeded={
                  cost.boxes.with.gemsNeededForLevels + cost.gemsNeededToMerge
                }
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
