import { MAX_LEVEL_NUMBER, MAX_SUB_LEVEL_NUMBER } from "../data/upgrade-costs";
import { Item } from "../types";
import useLocalStorage, { localStorageGetItem } from "./useLocalStorage";

export type ItemStats = {
  cards: number;
  level: number;
  subLevel: number;
};

export const MAX_STATS: ItemStats = {
  cards: 0,
  level: MAX_LEVEL_NUMBER,
  subLevel: MAX_SUB_LEVEL_NUMBER,
};

export const DEFAULT_ITEM_STATS: ItemStats = {
  cards: 0,
  level: 0,
  subLevel: 0,
};

export function getItemStatsKey(item: Item, key?: string): string {
  return `${key ? key + ":" : ""}tier-${item.tier}-stats:${item.id}`;
}

export function useItemStats(
  item: Item,
  key?: string
): [stats: ItemStats, setStats: (value: ItemStats) => void] {
  const [stats, setStats] = useLocalStorage<ItemStats>(
    getItemStatsKey(item, key),
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

export function getItemStats(item: Item, key?: string): ItemStats {
  let stats;

  const string = localStorageGetItem(getItemStatsKey(item, key));
  try {
    if (string) {
      stats = JSON.parse(string);
    }
  } catch (error) {}

  return { ...DEFAULT_ITEM_STATS, ...stats };
}
