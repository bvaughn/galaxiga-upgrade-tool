import { Category } from "../types";
import { Card } from "./Card";
import styles from "./CardPicker.module.css";
import { NumberInput } from "./NumberInput";

export function CardPicker({
  cards,
  category,
  onSave,
  type,
}: {
  cards: number;
  category: Category;
  onSave: (cards: number) => void;
  type: "generic" | "specific";
}) {
  return (
    <div className={styles.CardPicker}>
      <Card category={category} type={type} />
      <NumberInput
        className={styles.CardInput}
        maxValue={99_999}
        minValue={0}
        onChange={onSave}
        value={cards}
      />
    </div>
  );
}
