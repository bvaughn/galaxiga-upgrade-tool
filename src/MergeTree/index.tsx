import { Fragment } from "react";
import { CategoryTabs } from "../components/CategoryTabs";
import { Icon } from "../components/Icon";
import { ItemImage } from "../components/ItemImage";
import { useItems } from "../hooks/useItems";
import { Tier2Item } from "../types";

import styles from "./index.module.css";

export function MergeTree() {
  const tier2Items = useItems({
    showTier: "tier-2",
  }) as Tier2Item[];

  const tier1Items = useItems({
    showTier: "tier-1",
  });

  return (
    <div className={styles.Page}>
      <div className={styles.TopRow}>
        <CategoryTabs />
        <button className={styles.MenuButton} title="Open menu">
          <Icon className={styles.MenuIcon} type="menu" />
        </button>
      </div>
      <div className={styles.Content}>
        {tier2Items.map((tier2Item) => (
          <div className={styles.Item} key={tier2Item.id}>
            <div className={styles.ItemImageAndName}>
              <ItemImage className={styles.ItemImage} item={tier2Item} />
              {tier2Item.name}
            </div>
            <div className={styles.CreatedByMergingItems}>
              {tier2Item.createdByMerging
                .map(
                  (id) => tier1Items.find((tier1Item) => tier1Item.id === id)!
                )
                .map((tier1Item) => (
                  <div className={styles.ItemImageAndName} key={tier1Item.id}>
                    <ItemImage className={styles.ItemImage} item={tier1Item} />
                    {tier1Item.name}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
