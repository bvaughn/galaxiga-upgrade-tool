import { ReactNode } from "react";
import { Radio } from "./Radio";

export type RadioOption<Value extends number | string> = {
  label: ReactNode;
  value: Value;
};

export function RadioGroup<Value extends number | string>({
  inputClassName,
  labelClassName,
  name,
  onChange,
  options,
  value,
}: {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  name: string;
  onChange: (value: Value) => void;
  options: RadioOption<Value>[];
  value: Value;
}) {
  return options.map((option) => (
    <Radio<Value>
      inputClassName={inputClassName}
      key={option.value}
      label={option.label}
      labelClassName={labelClassName}
      name={name}
      onChange={onChange}
      selected={option.value === value}
      value={option.value}
    />
  ));
}
