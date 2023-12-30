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
          source = "/images/drones/generic-card.svg";
          title = "Generic drone card";
          break;
        }
        case "specific": {
          source = "/images/drones/specific-card.svg";
          title = "Drone card";
          break;
        }
      }
      break;
    }
    case "ship": {
      switch (type) {
        case "generic": {
          source = "/images/ships/generic-card.svg";
          title = "Generic ship card";
          break;
        }
        case "specific": {
          source = "/images/ships/specific-card.svg";
          title = "Ship card";
          break;
        }
      }
      break;
    }
    case "stone": {
      switch (type) {
        case "generic": {
          source = "/images/stones/generic-card.svg";
          title = "Generic ship card";
          break;
        }
        case "specific": {
          source = "/images/stones/specific-card.svg";
          title = "Ship card";
          break;
        }
      }
      break;
    }
  }

  return <img alt={title} className={styles.Image} src={source} />;
}
