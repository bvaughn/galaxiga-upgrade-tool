import useLocalStorage from "../hooks/useLocalStorage";

export type Tier1ItemStats = {
  cards: number;
  level: number;
  subLevel: number;
};

export function useTier1ItemStats(
  itemId: string
): [stats: Tier1ItemStats, setStats: (value: Tier1ItemStats) => void] {
  return useLocalStorage<Tier1ItemStats>(`tier-1-stats:${itemId}`, {
    cards: 0,
    level: 0,
    subLevel: 0,
  });
}
