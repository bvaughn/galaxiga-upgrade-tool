import { useMemo, useState } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemCosts } from "../../components/ItemCosts";
import { ItemImage } from "../../components/ItemImage";
import { useDoubleTap } from "../../hooks/useDoubleTap";
import { Category, Item, Tier } from "../../types";
import { calculateCreateCost } from "../../utils/calculateCreateCost";
import {
  CreateTier2Item,
  CreateTier3Item,
  isCreateTier2Item,
  isCreateTier3Item,
} from "../types";
import { DebugInfoRow } from "./DebugInfoRow";
import styles from "./shared.module.css";

export function CreateAction({
  action,
  deleteAction,
  editAction,
  genericCards,
}: {
  action: CreateTier2Item | CreateTier3Item;
  deleteAction: () => void;
  editAction: () => void;
  genericCards: number;
}) {
  const { id, secondaryItemStats } = action;

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
  } else {
    throw Error("Unsupported data");
  }

  const [showDebugRow, setShowDebugRow] = useState(false);

  const { onClick } = useDoubleTap(() => setShowDebugRow(!showDebugRow));

  const cost = useMemo(
    () =>
      calculateCreateCost({
        genericCards,
        category,
        itemStatsArray: secondaryItemStats,
        tier,
      }),
    [category, genericCards, secondaryItemStats, tier]
  );

  const cardsAvailable = secondaryItemStats.reduce(
    (sum, item) => sum + item.cards,
    0
  );

  return (
    <div className={styles.Action} data-separator key={id}>
      <div className={styles.Row}>
        <ItemImage className={styles.ItemImage} onClick={onClick} item={item} />
        <div className={styles.MiddleColumn}>
          <div className={styles.Row} data-compact>
            <span className={styles.SmallText}>Create</span> {name}
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
              or{" "}
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
      {showDebugRow && (
        <DebugInfoRow
          cardsAvailable={cardsAvailable}
          cardsTotal={cost.totalCardsRequired}
        />
      )}
    </div>
  );
}
