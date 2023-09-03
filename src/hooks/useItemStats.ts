import { Item } from "../types";
import useLocalStorage, { localStorageGetItem } from "./useLocalStorage";

export type ItemStats = {
  cards: number;
  level: number;
  subLevel: number;
};

export const DEFAULT_ITEM_STATS: ItemStats = {
  cards: 0,
  level: 0,
  subLevel: 0,
};

export function getItemStatsKey(item: Item): string {
  return `tier-${item.tier}-stats:${item.id}`;
}

export function useItemStats(
  item: Item
): [stats: ItemStats, setStats: (value: ItemStats) => void] {
  const [stats, setStats] = useLocalStorage<ItemStats>(
    getItemStatsKey(item),
    {} as any
  );

  return [
    {
      ...DEFAULT_ITEM_STATS,
      ...stats,
    },
    setStats,
  ];
}

export function getItemStats(item: Item): ItemStats {
  let stats;

  const string = localStorageGetItem(getItemStatsKey(item));
  try {
    if (string) {
      stats = JSON.parse(string);
    }
  } catch (error) {}

  return { ...DEFAULT_ITEM_STATS, ...stats };
}
