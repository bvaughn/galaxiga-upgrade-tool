import { Item } from "../types";
import styles from "./ItemImage.module.css";

export function ItemImage({
  category,
  className = "",
  item,
}: {
  category: "drone" | "ship";
  className?: string;
  item: Item;
}) {
  return (
    <div className={`${styles.Crop} ${className}`}>
      <div className={styles.Rotator}>
        <img
          alt={item.name}
          className={styles.Image}
          data-category={category}
          src={`/images/${category}s/${item.imageName}`}
        />
      </div>
    </div>
  );
}
