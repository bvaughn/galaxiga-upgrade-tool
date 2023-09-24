import { useMemo } from "react";
import { Icon } from "../../components/Icon";
import { formatNumber } from "../../utils/number";
import styles from "./DebugInfoRow.module.css";

export function DebugInfoRow({
  genericCards,
  specificCards,
  totalCards,
}: {
  genericCards: number;
  specificCards: number;
  totalCards: number;
}) {
  const text = useMemo(() => {
    return `${formatNumber(totalCards)} cards needed total`;
  }, [totalCards]);

  return (
    <div className={styles.DebugInfo}>
      <div className={styles.DebugInfoRow}>
        <Icon className={styles.DebugInfoIcon} type="info" />
        <div className={styles.DebugInfoColumn}>{text}</div>
      </div>
    </div>
  );
}
