import { Category } from "../types";
import useLocalStorage from "./useLocalStorage";

export function useCards(category: Category, type: "generic" | "specific") {
  return useLocalStorage<number>(`${category}-${type}-cards`, 0);
}
