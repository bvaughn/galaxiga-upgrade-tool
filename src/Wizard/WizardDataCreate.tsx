import { useMemo, useState } from "react";
import { ItemCosts } from "../components/ItemCosts";
import { ItemImage } from "../components/ItemImage";
import { calculateCreateCost } from "../utils/calculateCreateCost";
import { WizardDataCreate as WizardDataCreateType } from "./types";

import { IconButton } from "../components/IconButton";
import { useDoubleTap } from "../hooks/useDoubleTap";
import { formatNumber } from "../utils/number";
import { DebugInfoRow } from "./DebugInfoRow";
import styles from "./shared.module.css";

export function WizardDataCreate({
  data,
  deleteItem,
  editItem,
}: {
  data: WizardDataCreateType;
  deleteItem: () => void;
  editItem: () => void;
}) {
  const { genericCards, id, primaryItem: item, secondaryItemStats } = data;

  const [showDebugRow, setShowDebugRow] = useState(false);

  const { onClick } = useDoubleTap(() => setShowDebugRow(!showDebugRow));

  const cost = useMemo(
    () =>
      calculateCreateCost({
        genericCards,
        category: item.category,
        itemStatsArray: secondaryItemStats,
        tier: item.tier,
      }),
    [genericCards, item, secondaryItemStats]
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
      <div className={styles.Row} key={id}>
        <ItemImage className={styles.ItemImage} onClick={onClick} item={item} />
        <div className={styles.Column} data-compact data-grow>
          <div className={styles.Row} data-compact>
            <span className={styles.SmallText}>Create</span> {item.name}
          </div>
          <ItemCosts
            buyCards={false}
            cardsNeeded={cost.boxes.without.cardsNeededForLevels}
            category={item.category}
            coinsNeeded={cost.boxes.without.coinsNeededForLevels}
            gemsNeeded={
              cost.boxes.without.gemsNeededForLevels + cost.gemsNeededToMerge
            }
          />
          <small className={styles.Row}>
            or{" "}
            <ItemCosts
              buyCards={true}
              cardsNeeded={cost.boxes.with.cardsNeededForLevels}
              category={item.category}
              coinsNeeded={cost.boxes.with.coinsNeededForLevels}
              gemsNeeded={
                cost.boxes.with.gemsNeededForLevels + cost.gemsNeededToMerge
              }
            />
          </small>
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
