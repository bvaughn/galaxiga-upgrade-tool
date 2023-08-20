import styles from "./Card.module.css";

export function Card({
  category,
  type,
}: {
  category: "generic" | "specific";
  type: "drone" | "ship";
}) {
  let source = "";
  let title = "";

  switch (type) {
    case "drone": {
      switch (category) {
        case "generic": {
          source = "/images/generic-drone-card.jpeg";
          title = "Generic drone card";
          break;
        }
        case "specific": {
          source = "/images/specific-drone-card.jpeg";
          title = "Drone card";
          break;
        }
      }
      break;
    }
    case "ship": {
      switch (category) {
        case "generic": {
          source = "/images/ships/generic-card.jpeg";
          title = "Generic ship card";
          break;
        }
        case "specific": {
          source = "/images/ships/specific-card.jpeg";
          title = "Ship card";
          break;
        }
      }
      break;
    }
  }

  return <img alt={title} className={styles.Image} src={source} />;
}
