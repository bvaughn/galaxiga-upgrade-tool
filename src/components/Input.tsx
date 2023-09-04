import { ChangeEvent } from "react";

import styles from "./Input.module.css";

export function Input<Value extends number | string>({
  className = "",
  onChange: onChangeProp,
  placeholder,
  type = "text",
  value,
}: {
  className?: string;
  onChange: (value: Value) => void;
  placeholder?: string;
  type?: "number" | "text";
  value: Value;
}) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeProp(event.target.value as unknown as Value);
  };

  return (
    <input
      className={`${className} ${styles.Input}`}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
}
