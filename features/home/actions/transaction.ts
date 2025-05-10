import { expenseCategories, incomeCategories } from "../utils/data";

export function getCategoryIcon(categoryValue: string, type: string) {
  const categories =
    type === "expense" ? expenseCategories : incomeCategories;
  const category = categories.find((item) => item.value === categoryValue);
  return category?.icon || null;
}
