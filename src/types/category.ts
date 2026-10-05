export type CategoryId = "culture" | "nature" | "food" | "nightmarket" | "shopping" | "art";

export type CategoryGroup = {
  id: CategoryId;
  emoji: string;
  label: string; // ข้อความบน chip เช่น "วัฒนธรรม"
};