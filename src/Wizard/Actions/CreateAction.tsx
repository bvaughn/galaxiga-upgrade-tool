import { useMemo } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemCosts } from "../../components/ItemCosts";
import { ItemImage } from "../../components/ItemImage";
import { Category, Item, Tier } from "../../types";
import { calculateCreateCost } from "../../utils/calculateCreateCost";
import {
  CreateTier2Item,
  CreateTier3Item,
  CreateTier4Item,
  CreateTier5Item,
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
  action: CreateTier2Item | CreateTier3Item | CreateTier4Item | CreateTier5Item;
  deleteAction: () => void;
  editAction: () => void;
}) {
  const { id, itemStats } = action;

  let category: Category;
  let item: Item;
  let name: string;
  let tier: Tier;

  if (isCreateTier2Item(action)) {
    item = action.primaryItem;
    category = item.category;
    name = item.name;
    tier = 2;
  } else if (isCreateTier3Item(action)) {
    item = action.secondaryItems[0];
    category = item.category;
    name = `Super ${item.name}`;
    tier = 3;
  } else if (isCreateTier4Item(action)) {
    item = action.primaryItem;
    category = item.category;
    name = item.name;
    tier = 4;
  } else if (isCreateTier5Item(action)) {
    item = action.primaryItem;
    category = item.category;
    name = item.name;
    tier = 5;
  } else {
    throw Error("Unsupported data");
  }

  const itemStatsArray = useMemo(
    () => (Array.isArray(itemStats) ? itemStats : [itemStats]),
    [itemStats]
  );

  const cost = useMemo(
    () =>
      calculateCreateCost({
        category,
        itemStatsArray,
        tier,
      }),
    [category, itemStatsArray, tier]
  );

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
