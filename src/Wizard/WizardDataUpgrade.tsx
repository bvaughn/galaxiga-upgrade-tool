import { useMemo, useState } from "react";
import { ItemCosts } from "../components/ItemCosts";
import { ItemImage } from "../components/ItemImage";
import { calculateUpgradeCost } from "../utils/calculateUpgradeCost";
import { WizardDataUpgrade as WizardDataUpgradeType } from "./types";

import { IconButton } from "../components/IconButton";
import { useDoubleTap } from "../hooks/useDoubleTap";
import { formatNumber } from "../utils/number";
import { DebugInfoRow } from "./DebugInfoRow";
import styles from "./shared.module.css";

export function WizardDataUpgrade({
  data,
  deleteItem,
  editItem,
}: {
  data: WizardDataUpgradeType;
  deleteItem: () => void;
  editItem: () => void;
}) {
  const {
    genericCards,
    id,
    itemStatsFrom,
    itemStatsTo,
    primaryItem: item,
  } = data;
  const from = `${itemStatsFrom.level}.${itemStatsFrom.subLevel}`;
  const to = `${itemStatsTo.level}.${itemStatsTo.subLevel}`;

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
    return `${formatNumber(itemStatsFrom.cards)} specific / ${formatNumber(
      genericCards
    )} generic / ${formatNumber(cost.totalCardsRequired)} total`;
  }, [cost, genericCards, itemStatsFrom]);

  return (
    <>
      <div className={styles.Row} key={id}>
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
