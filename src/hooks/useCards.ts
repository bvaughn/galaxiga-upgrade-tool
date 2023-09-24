import useLocalStorage from "./useLocalStorage";

export function useCards(type: "generic" | "specific") {
  return useLocalStorage<number>(`${type}-cards`, 0);
}
