import useLocalStorage, { localStorageGetItem } from "./useLocalStorage";
import { Item } from "../types";

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
  return useLocalStorage<ItemStats>(getItemStatsKey(item), {
    ...DEFAULT_ITEM_STATS,
  });
}

export function getItemStats(item: Item): ItemStats {
  const string = localStorageGetItem(getItemStatsKey(item));
  try {
    if (string) {
      return JSON.parse(string);
    }
  } catch (error) {}

  return { ...DEFAULT_ITEM_STATS };
}
