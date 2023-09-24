import { useCards } from "../hooks/useCards";
import { Category } from "../types";
import { Card } from "./Card";
import styles from "./CardPicker.module.css";
import { NumberInput } from "./NumberInput";

export function CardPicker({
  category,
  type,
}: {
  category: Category;
  type: "generic" | "specific";
}) {
  const [cards, setCards] = useCards(category, type);

  return (
    <div className={styles.CardPicker}>
      <Card category={category} type={type} />
      <NumberInput
        className={styles.CardInput}
        maxValue={99_999}
        minValue={0}
        onChange={setCards}
        value={cards}
      />
    </div>
  );
}
