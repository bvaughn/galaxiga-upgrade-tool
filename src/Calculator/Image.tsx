import styles from "./Image.module.css";

export function Image({
  className = "",
  imageName,
}: {
  className?: string;
  imageName: string;
}) {
  return (
    <div className={`${styles.Crop} ${className}`}>
      <div className={styles.Rotator}>
        <img className={styles.Image} src={`/images/ships/${imageName}`} />
      </div>
    </div>
  );
}
