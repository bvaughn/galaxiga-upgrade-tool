import { useMemo, useState } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemCosts } from "../../components/ItemCosts";
import { ItemImage } from "../../components/ItemImage";
import { useCards } from "../../hooks/useCards";
import { useDoubleTap } from "../../hooks/useDoubleTap";
import { Category, Item, Tier } from "../../types";
import { calculateCreateCost } from "../../utils/calculateCreateCost";
import { formatNumber } from "../../utils/number";
import {
  WizardDataCreateTier2,
  WizardDataCreateTier3,
  isWizardDataCreateTier2,
  isWizardDataCreateTier3,
} from "../types";
import { DebugInfoRow } from "./DebugInfoRow";
import styles from "./shared.module.css";

export function ItemCreate({
  data,
  deleteItem,
  editItem,
}: {
  data: WizardDataCreateTier2 | WizardDataCreateTier3;
  deleteItem: () => void;
  editItem: () => void;
}) {
  const { id, secondaryItemStats } = data;

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

  const [genericCards] = useCards(category, "generic");

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

    return `${formatNumber(totalSpecificCards)} / ${formatNumber(
      cost.totalCardsRequired
    )} cards`;
  }, [cost, secondaryItemStats]);

  return (
    <div className={styles.Column} data-separator key={id}>
      <div className={styles.Row}>
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
        <div className={styles.Column} data-actions-column>
          <IconButton
            buttonClassName={styles.EditButton}
            iconClassName={styles.EditButtonIcon}
            iconType="edit"
            label="Edit"
            onClick={editItem}
          />
          <IconButton
            buttonClassName={styles.DeleteButton}
            iconClassName={styles.DeleteButtonIcon}
            iconType="delete"
            label="Delete"
            onClick={deleteItem}
          />
        </div>
      </div>
      {showDebugRow && <DebugInfoRow>{debugCardString}</DebugInfoRow>}
    </div>
  );
}
