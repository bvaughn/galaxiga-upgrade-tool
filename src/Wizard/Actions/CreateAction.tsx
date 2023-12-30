import { useMemo, useState } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemCosts } from "../../components/ItemCosts";
import { ItemImage } from "../../components/ItemImage";
import { useDoubleTap } from "../../hooks/useDoubleTap";
import {
  Category,
  Item,
  ItemStats,
  Tier,
  Tier2Item,
  Tier4Item,
  Tier5Item,
} from "../../types";
import { calculateCreateCost } from "../../utils/calculateCreateCost";
import { getItem } from "../../utils/items";
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
import { DebugInfoRow } from "./DebugInfoRow";
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
  const { genericCards, id, itemStats } = action;

  let category: Category;
  let item: Item;
  let itemA: Item;
  let itemStatsA: ItemStats;
  let itemB: Item;
  let itemStatsB: ItemStats;
  let name: string;
  let tier: Tier;
  if (isCreateTier2Item(action)) {
    item = action.primaryItem;
    category = item.category;
    name = item.name;
    tier = 2;

    const tier2Item = action.primaryItem as Tier2Item;
    itemA = getItem(category, 1, tier2Item.createdByMerging[0]);
    itemStatsA = action.itemStats[0];
    itemB = getItem(category, 1, tier2Item.createdByMerging[1]);
    itemStatsB = action.itemStats[0];
  } else if (isCreateTier3Item(action)) {
    item = action.secondaryItems[0];
    category = item.category;
    name = `Super ${item.name}`;
    tier = 3;

    itemA = action.secondaryItems[0];
    itemStatsA = action.itemStats[0];
    itemB = action.secondaryItems[1];
    itemStatsB = action.itemStats[0];
  } else if (isCreateTier4Item(action)) {
    item = action.primaryItem;
    category = item.category;
    name = item.name;
    tier = 4;

    const tier4Item = action.primaryItem as Tier4Item;
    itemA = getItem(category, 1, tier4Item.createdByMerging[0]);
    itemStatsA = action.itemStats;
    itemB = getItem(category, 1, tier4Item.createdByMerging[1]);
    itemStatsB = action.itemStats;
  } else if (isCreateTier5Item(action)) {
    item = action.primaryItem;
    category = item.category;
    name = item.name;
    tier = 5;

    const tier5Item = action.primaryItem as Tier5Item;
    itemA = getItem(category, 1, tier5Item.createdByMerging[0]);
    itemStatsA = action.itemStats;
    itemB = getItem(category, 1, tier5Item.createdByMerging[1]);
    itemStatsB = action.itemStats;
  } else {
    throw Error("Unsupported data");
  }

  const fromA = `${itemA.name} ${itemStatsA.level}.${itemStatsA.subLevel}`;
  const fromB = `${itemB.name} ${itemStatsB.level}.${itemStatsB.subLevel}`;

  const itemStatsArray = useMemo(
    () => (Array.isArray(itemStats) ? itemStats : [itemStats]),
    [itemStats]
  );

  const [showDebugRow, setShowDebugRow] = useState(false);

  const { onClick } = useDoubleTap(() => setShowDebugRow(!showDebugRow));

  const cost = useMemo(
    () =>
      calculateCreateCost({
        genericCards,
        category,
        itemStatsArray,
        tier,
      }),
    [category, genericCards, itemStatsArray, tier]
  );

  const cardsAvailable = itemStatsArray.reduce(
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
          {tier < 4 && (
            <div className={styles.Row}>
              <div
                className={styles.SmallText}
              >{`from ${fromA} and ${fromB}`}</div>
            </div>
          )}
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
      {showDebugRow && (
        <DebugInfoRow
          className={styles.DebugInfo}
          genericCards={genericCards}
          specificCards={cardsAvailable}
          totalCards={cost.totalCardsRequired}
        />
      )}
    </div>
  );
}
