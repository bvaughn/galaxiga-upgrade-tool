import { ReactNode } from "react";
import styles from "./TextButton.module.css";

export function TextButton({
  children,
  className = "",
  disabled,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`${className} ${styles.Button}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
