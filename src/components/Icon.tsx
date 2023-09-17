import { CSSProperties, HTMLAttributes, ReactNode } from "react";

import styles from "./Icon.module.css";

export type IconType =
  | "add"
  | "delete"
  | "edit"
  | "info"
  | "menu"
  | "next"
  | "previous"
  | "subtract"
  | "warn";

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
        "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z";
      break;
    case "delete":
      path =
        "M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z";
      break;
    case "edit":
      path =
        "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z";
      break;
    case "info":
      path = (
        <>
          <path
            d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-6h2v6zm0-8h-2V7h2v2z"
            opacity=".3"
          ></path>
          <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
        </>
      );
      break;
    case "menu":
      path = "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
      break;
    case "next":
      path =
        "m7.58 16.89 5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z";
      break;
    case "previous":
      path =
        "M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82 5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z";
      break;
    case "subtract":
      path =
        "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z";
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
