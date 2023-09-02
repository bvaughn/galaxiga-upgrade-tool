import useLocalStorage, { localStorageGetItem } from "../hooks/useLocalStorage";

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

export function useItemStats(
  itemId: string
): [stats: ItemStats, setStats: (value: ItemStats) => void] {
  return useLocalStorage<ItemStats>(`tier-1-stats:${itemId}`, {
    ...DEFAULT_ITEM_STATS,
  });
}

export function getItemStats(itemId: string): ItemStats {
  const string = localStorageGetItem(`tier-1-stats:${itemId}`);
  try {
    if (string) {
      return JSON.parse(string);
    }
  } catch (error) {}

  return { ...DEFAULT_ITEM_STATS };
}
