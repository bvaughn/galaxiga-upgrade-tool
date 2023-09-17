import { Icon, IconType } from "./Icon";
import styles from "./IconButton.module.css";

export function IconButton({
  buttonClassName = "",
  disabled,
  iconClassName = "",
  iconType,
  onClick,
}: {
  buttonClassName?: string;
  disabled?: boolean;
  iconClassName?: string;
  iconType: IconType;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${buttonClassName} ${styles.Button}`}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className={`${iconClassName} ${styles.Icon}`} type={iconType} />
    </button>
  );
}
