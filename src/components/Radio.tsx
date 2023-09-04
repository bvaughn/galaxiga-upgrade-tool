import { ChangeEvent, ReactNode } from "react";

import styles from "./Radio.module.css";

export function Radio<Value extends number | string>({
  inputClassName = "",
  label,
  labelClassName = "",
  name,
  onChange: onChangeProp,
  selected,
  value,
}: {
  inputClassName?: string;
  onChange: (value: Value) => void;
  label: ReactNode;
  labelClassName?: string;
  name: string;
  selected: boolean;
  value: Value;
}) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeProp(event.target.value as unknown as Value);
  };

  return (
    <label
      className={`${labelClassName} ${styles.Label}`}
      data-selected={selected || undefined}
    >
      <input
        className={`${inputClassName} ${styles.Input}`}
        defaultChecked={selected}
        name={name}
        onChange={onChange}
        type="radio"
        value={value}
      />
      {label}
    </label>
  );
}
