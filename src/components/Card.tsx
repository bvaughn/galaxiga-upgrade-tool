import styles from "./Card.module.css";

export function Card({
  category,
  type,
}: {
  category: "drone" | "ship";
  type: "generic" | "specific";
}) {
  let source = "";
  let title = "";

  switch (category) {
    case "drone": {
      switch (type) {
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
      switch (type) {
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
