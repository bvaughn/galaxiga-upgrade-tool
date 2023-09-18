import { useMemo, useState } from "react";
import { ItemCosts } from "../components/ItemCosts";
import { ItemImage } from "../components/ItemImage";
import { calculateCreateCost } from "../utils/calculateCreateCost";
import {
  WizardDataCreateTier2,
  WizardDataCreateTier3,
  isWizardDataCreateTier2,
  isWizardDataCreateTier3,
} from "./types";

import { IconButton } from "../components/IconButton";
import { useDoubleTap } from "../hooks/useDoubleTap";
import { Category, Item, Tier } from "../types";
import { formatNumber } from "../utils/number";
import { DebugInfoRow } from "./DebugInfoRow";
import styles from "./shared.module.css";

export function WizardDataCreate({
  data,
  deleteItem,
  editItem,
}: {
  data: WizardDataCreateTier2 | WizardDataCreateTier3;
  deleteItem: () => void;
  editItem: () => void;
}) {
  const { genericCards, id, secondaryItemStats } = data;

  let category: Category;
  let item: Item;
  let name: string;
  let tier: Tier;
  if (isWizardDataCreateTier2(data)) {
    item = data.primaryItem;
    category = item.category;
    name = item.name;
    tier = 2;
  } else if (isWizardDataCreateTier3(data)) {
    item = data.secondaryItems[0];
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

  const debugCardString = useMemo(() => {
    const totalSpecificCards = secondaryItemStats.reduce(
      (sum, item) => sum + item.cards,
      0
    );

    return `${formatNumber(totalSpecificCards)} specific / ${formatNumber(
      genericCards
    )} generic / ${formatNumber(cost.totalCardsRequired)} total`;
  }, [cost, genericCards, secondaryItemStats]);

  return (
    <>
      <div className={styles.Row} data-separator key={id}>
        <ItemImage className={styles.ItemImage} onClick={onClick} item={item} />
        <div className={styles.Column} data-compact data-grow>
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
        <div className={styles.Row} data-compact>
          <IconButton
            buttonClassName={styles.EditButton}
            iconType="edit"
            onClick={editItem}
          />
          <IconButton
            buttonClassName={styles.DeleteButton}
            iconType="delete"
            onClick={deleteItem}
          />
        </div>
      </div>
      {showDebugRow && <DebugInfoRow>{debugCardString}</DebugInfoRow>}
    </>
  );
}
