import useLocalStorage from "./useLocalStorage";

export type Tiers = "tier-1" | "tier-2";

export function useShowTier() {
  return useLocalStorage<Tiers>("show-tier", "tier-1");
}
