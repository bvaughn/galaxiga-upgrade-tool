import { useMemo } from "react";
import { Icon } from "../../components/Icon";
import { formatNumber } from "../../utils/number";
import styles from "./DebugInfoRow.module.css";

export function DebugInfoRow({
  cardsAvailable,
  cardsTotal,
}: {
  cardsAvailable: number;
  cardsTotal: number;
}) {
  const text = useMemo(() => {
    return `${formatNumber(cardsAvailable)}  / ${formatNumber(
      cardsTotal
    )} cards`;
  }, [cardsAvailable, cardsTotal]);

  return (
    <div className={styles.DebugInfo}>
      <div className={styles.DebugInfoRow}>
        <Icon className={styles.DebugInfoIcon} type="info" />
        <div className={styles.DebugInfoColumn}>{text}</div>
      </div>
    </div>
  );
}
