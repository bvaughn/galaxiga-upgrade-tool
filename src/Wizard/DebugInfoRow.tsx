import { PropsWithChildren } from "react";
import styles from "./DebugInfoRow.module.css";
import { Icon } from "../components/Icon";

export function DebugInfoRow({ children }: PropsWithChildren) {
  return (
    <div className={styles.DebugInfo}>
      <div className={styles.DebugInfoRow}>
        <Icon className={styles.DebugInfoIcon} type="info" />
        <div className={styles.DebugInfoColumn}>{children}</div>
      </div>
    </div>
  );
}
