import { Icon } from "../components/Icon";
import { NumberInput } from "../components/NumberInput";
import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";
import styles from "./LevelSelector.module.css";

export function LevelSelector({
  onChange,
  type,
  value = 0,
}: {
  onChange: (value: number) => void;
  type: "level" | "subLevel";
  value?: number;
}) {
  const minValue = 0;
  const maxValue = type === "level" ? MAX_LEVEL_NUMBER : MAX_SUB_LEVEL_NUMBER;

  const decrease = () => {
    onChange(Math.max(minValue, value - 1));
  };

  const increase = () => {
    onChange(Math.min(maxValue, value + 1));
  };

  return (
    <label className={styles.Container}>
      <div className={styles.Marker} data-type={type} data-value={value}>
        {value}
      </div>
      <NumberInput
        maxValue={maxValue}
        minValue={minValue}
        onChange={onChange}
        value={value}
      />
      <div className={styles.InputsGroup}>
        <button
          className={styles.IconButton}
          disabled={value <= 0}
          onClick={decrease}
        >
          <Icon type="subtract" />
        </button>
        <button
          className={styles.IconButton}
          disabled={value >= MAX_LEVEL_NUMBER}
          onClick={increase}
        >
          <Icon type="add" />
        </button>
      </div>
    </label>
  );
}
