import { CSSProperties, HTMLAttributes, ReactNode } from "react";

import styles from "./Icon.module.css";

export type IconType = "add" | "menu" | "subtract" | "warn";

export function Icon({
  className = "",
  style,
  type,
  ...rest
}: {
  className?: string;
  type: IconType;
  style?: CSSProperties;
} & HTMLAttributes<SVGElement>) {
  let path: ReactNode = null;

  switch (type) {
    case "add":
      path =
        "M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
      break;
    case "menu":
      path = "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
      break;
    case "subtract":
      path =
        "M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
      break;
    case "warn":
      path =
        "M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M13,13V7H11V13H13M13,17V15H11V17H13Z";
      break;
  }

  if (typeof path === "string") {
    path = <path d={path} />;
  }

  return (
    <svg
      className={`${className} ${styles.DefaultIcon}`}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...rest}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      {path}
    </svg>
  );
}
