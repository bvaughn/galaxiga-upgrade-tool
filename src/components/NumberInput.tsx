import { HTMLAttributes } from "react";
import styles from "./NumberInput.module.css";

export function NumberInput({
  className = "",
  maxValue,
  minValue,
  onChange,
  value,
  ...rest
}: {
  className?: string;
  maxValue: number;
  minValue: number;
  onChange: (value: number) => void;
  value: number;
} & Omit<HTMLAttributes<HTMLInputElement>, "onChange">) {
  return (
    <input
      {...rest}
      className={`${styles.NumberInput} ${className}`}
      min={minValue}
      max={maxValue}
      onChange={({ target }) => {
        let value = target.value;
        switch (value.length) {
          case 0:
            value = "0";
            break;
          case 1:
            break;
          default:
            if (value.startsWith("0")) {
              target.value = value = value.substring(1);
            }
            break;
        }

        onChange(Math.max(minValue, Math.min(maxValue, parseInt(value, 10))));
      }}
      type="number"
      value={value}
    />
  );
}
