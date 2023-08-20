import useLocalStorage from "../hooks/useLocalStorage";
import { Tier1ShipStats } from "./types";

export function useTier1ShipStats(
  shipId: string
): [stats: Tier1ShipStats, setStats: (value: Tier1ShipStats) => void] {
  return useLocalStorage<Tier1ShipStats>(`tier-1-stats:${shipId}`, {
    cards: 0,
    level: 0,
    upgrade: 0,
  });
}
