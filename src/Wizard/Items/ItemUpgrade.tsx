import { useMemo, useState } from "react";
import { IconButton } from "../../components/IconButton";
import { ItemCosts } from "../../components/ItemCosts";
import { ItemImage } from "../../components/ItemImage";
import { useCards } from "../../hooks/useCards";
import { useDoubleTap } from "../../hooks/useDoubleTap";
import { calculateUpgradeCost } from "../../utils/calculateUpgradeCost";
import { formatNumber } from "../../utils/number";
import { WizardDataUpgrade as WizardDataUpgradeType } from "../types";
import { DebugInfoRow } from "./DebugInfoRow";
import styles from "./shared.module.css";

export function ItemUpgrade({
  data,
  deleteItem,
  editItem,
}: {
  data: WizardDataUpgradeType;
  deleteItem: () => void;
  editItem: () => void;
}) {
  const { id, itemStatsFrom, itemStatsTo, primaryItem: item } = data;
  const from = `${itemStatsFrom.level}.${itemStatsFrom.subLevel}`;
  const to = `${itemStatsTo.level}.${itemStatsTo.subLevel}`;

  const [genericCards] = useCards(item.category, "generic");

  const [showDebugRow, setShowDebugRow] = useState(false);

  const { onClick } = useDoubleTap(() => setShowDebugRow(!showDebugRow));

  const cost = useMemo(
    () =>
      calculateUpgradeCost(
        genericCards,
        itemStatsFrom,
        itemStatsTo,
        item.category,
        item.tier
      ),
    [genericCards, item, itemStatsFrom, itemStatsTo]
  );

  const debugCardString = useMemo(() => {
    return `${formatNumber(itemStatsFrom.cards)}  / ${formatNumber(
      cost.totalCardsRequired
    )} cards`;
  }, [cost, itemStatsFrom]);

  return (
    <div className={styles.Column} data-separator key={id}>
      <div className={styles.Row}>
        <ItemImage className={styles.ItemImage} onClick={onClick} item={item} />
        <div className={styles.Column} data-compact data-grow>
          <div className={styles.Row} data-compact>
            <span className={styles.SmallText}>Upgrade</span> {item.name}
          </div>
          <div className={styles.Row}>
            <div className={styles.SmallText}>{`from ${from} → to ${to}`}</div>
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
              or{" "}
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
