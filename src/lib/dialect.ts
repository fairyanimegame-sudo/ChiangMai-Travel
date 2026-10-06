import type { DialectGroupId, DialectWord } from "@/types/dialect";

export function filterDialectWords(words: DialectWord[], groupId?: DialectGroupId): DialectWord[] {
  return groupId ? words.filter((word) => word.groupId === groupId) : words;
}