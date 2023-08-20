import styles from "./NumberInput.module.css";

export function NumberInput({
  className = "",
  maxValue,
  minValue,
  onChange,
  value,
}: {
  className?: string;
  maxValue: number;
  minValue: number;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <input
      className={`${styles.NumberInput} ${className}`}
      min={minValue}
      max={maxValue}
      onChange={({ target }) => {
        onChange(
          Math.max(
            minValue,
            Math.min(maxValue, parseInt(target.value || "0", 10))
          )
        );
      }}
      type="number"
      value={value}
    />
  );
}
