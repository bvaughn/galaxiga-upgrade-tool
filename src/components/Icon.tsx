import { CSSProperties, HTMLAttributes, ReactNode } from "react";

import styles from "./Icon.module.css";

export type IconType = "subtract" | "add";

export function Icon({
  className = styles.DefaultIcon,
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
    case "subtract":
      path =
        "M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
      break;
  }

  if (typeof path === "string") {
    path = <path d={path} />;
  }

  return (
    <svg
      className={className}
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
