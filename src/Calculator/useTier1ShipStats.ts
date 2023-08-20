import useLocalStorage from "../hooks/useLocalStorage";
import { Tier1ItemStats } from "./types";

export function useTier1ShipStats(
  shipId: string
): [stats: Tier1ItemStats, setStats: (value: Tier1ItemStats) => void] {
  return useLocalStorage<Tier1ItemStats>(`tier-1-stats:${shipId}`, {
    cards: 0,
    level: 0,
    upgrade: 0,
  });
}
