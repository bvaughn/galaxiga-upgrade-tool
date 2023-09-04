import { Category } from "../types";
import useLocalStorage from "./useLocalStorage";

export function useCategory() {
  return useLocalStorage<Category>("calculator-category", "ship");
}
