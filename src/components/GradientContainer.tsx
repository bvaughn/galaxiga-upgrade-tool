import { PropsWithChildren } from "react";
import styles from "./GradientContainer.module.css";

export function GradientContainer({
  children,
  isComplete = false,
}: PropsWithChildren & {
  isComplete?: boolean;
}) {
  return (
    <div
      className={styles.Container}
      data-is-complete={isComplete ? "" : undefined}
    >
      {children}
    </div>
  );
}
