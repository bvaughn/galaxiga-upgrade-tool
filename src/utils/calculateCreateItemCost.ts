import {
  CreateItem,
  isCreateTier2Item,
  isCreateTier3Item,
  isCreateTier4Item,
  isCreateTier5Item,
} from "../Wizard/types";
import { Category, Item, Tier } from "../types";
import { calculateCreateCost } from "./calculateCreateCost";

export function calculateCreateItemCost(action: CreateItem) {
  const { itemStats } = action;

  let category: Category;
  let item: Item;
  let tier: Tier;

  if (isCreateTier2Item(action)) {
    item = action.primaryItem;
    category = item.category;
    tier = 2;
  } else if (isCreateTier3Item(action)) {
    item = action.secondaryItems[0];
    category = item.category;
    tier = 3;
  } else if (isCreateTier4Item(action)) {
    item = action.primaryItem;
    category = item.category;
    tier = 4;
  } else if (isCreateTier5Item(action)) {
    item = action.primaryItem;
    category = item.category;
    tier = 5;
  } else {
    throw Error("Unsupported data");
  }

  return calculateCreateCost({
    category,
    itemStatsArray: Array.isArray(itemStats) ? itemStats : [itemStats],
    tier,
  });
}
