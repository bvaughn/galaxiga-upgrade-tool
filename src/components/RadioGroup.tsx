import { ReactNode } from "react";
import { Radio } from "./Radio";

export type RadioOption<Value extends number | string> = {
  label: ReactNode;
  value: Value;
};

export function RadioGroup<Value extends number | string>({
  name,
  onChange,
  options,
  value,
}: {
  name: string;
  onChange: (value: Value) => void;
  options: RadioOption<Value>[];
  value: Value;
}) {
  return options.map((option) => (
    <Radio<Value>
      key={option.value}
      label={option.label}
      name={name}
      onChange={onChange}
      selected={option.value === value}
      value={option.value}
    />
  ));
}
