import { ChangeEvent, ReactNode } from "react";

import styles from "./Select.module.css";

export type SelectOption<Value extends number | string> = {
  label: ReactNode;
  value: Value;
};

export function Select<Value extends number | string>({
  className = "",
  onChange: onChangeProp,
  options,
  value,
}: {
  className?: string;
  onChange: (value: Value) => void;
  options: SelectOption<Value>[];
  value: Value;
}) {
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeProp(event.target.value as unknown as Value);
  };

  return (
    <select
      className={`${className} ${styles.Select}`}
      onChange={onChange}
      value={value}
    >
      {options.map(({ label, value }) => (
        <option children={label} key={value} value={value} />
      ))}
    </select>
  );
}
