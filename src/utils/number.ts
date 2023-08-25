const formatter = new Intl.NumberFormat();

export function formatNumber(
  value: number,
  format: "short" | "long" = "short"
): string {
  if (format === "long") {
    return formatter.format(value);
  } else {
    if (value > 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    } else if (value > 1_000) {
      return `${(value / 1_000).toFixed(1)}k`;
    } else {
      return `${value}`;
    }
  }
}
