import { Category } from "../types";
import styles from "./Card.module.css";

export function Card({
  category,
  type,
}: {
  category: Category;
  type: "generic" | "specific";
}) {
  let source = "";
  let title = "";

  switch (category) {
    case "drone": {
      switch (type) {
        case "generic": {
          source = "/images/drones/generic-card.jpeg";
          title = "Generic drone card";
          break;
        }
        case "specific": {
          source = "/images/drones/specific-card.jpeg";
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
    case "stone": {
      switch (type) {
        case "generic": {
          source = "/images/stones/generic-card.jpeg";
          title = "Generic ship card";
          break;
        }
        case "specific": {
          source = "/images/stones/specific-card.png";
          title = "Ship card";
          break;
        }
      }
      break;
    }
  }

  return <img alt={title} className={styles.Image} src={source} />;
}
