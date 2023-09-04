import useLocalStorage from "./useLocalStorage";

export function useBuyCardsWithGems(): [
  buyCardsWithGems: boolean,
  setBuyCardsWithGems: (value: boolean) => void
] {
  return useLocalStorage<boolean>("buy-cards-with-gems", false);
}
