import styles from "./Card.module.css";

export function Card({ type }: { type: "generic" | "specific" }) {
  return (
    <img
      className={styles.Image}
      src={
        type === "generic"
          ? "/images/ships/generic-card.jpeg"
          : "/images/ships/specific-card.jpeg"
      }
    />
  );
}
