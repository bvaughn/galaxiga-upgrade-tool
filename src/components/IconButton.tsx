import { ReactNode } from "react";
import { Icon, IconType } from "./Icon";
import styles from "./IconButton.module.css";

export function IconButton({
  buttonClassName = "",
  disabled,
  iconClassName = "",
  iconType,
  label = null,
  onClick,
}: {
  buttonClassName?: string;
  disabled?: boolean;
  iconClassName?: string;
  iconType: IconType;
  label?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${buttonClassName} ${styles.Button}`}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className={`${iconClassName} ${styles.Icon}`} type={iconType} />
      {label}
    </button>
  );
}
