import { Category, Item } from "../types";
import styles from "./ItemImage.module.css";
import { isTier1Item } from "../types";
import { useRef } from "react";

export function ItemImage({
  category,
  className = "",
  item,
}: {
  category: Category;
  className?: string;
  item: Item;
}) {
  const didErrorRef = useRef(false);

  return (
    <img
      alt={item.name}
      className={`${className} ${styles.Image}`}
      data-category={category}
      onError={({ target }) => {
        if (!didErrorRef.current) {
          didErrorRef.current = true;
          (target as HTMLImageElement).src = getUrl(category, item, "png");
        } else {
          (target as HTMLImageElement).src = "/images/fallback.png";
          (target as HTMLImageElement).setAttribute("data-not-found", "");
        }
      }}
      src={getUrl(category, item, "jpeg")}
    />
  );
}

function getUrl(category: Category, item: Item, fileExtension: string) {
  return `/images/${category}s/tier_${isTier1Item(item) ? 1 : 2}_${
    item.id
  }.jpeg`;
}
