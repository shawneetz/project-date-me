export const TAKE_CHAR_LIMIT = 140;

export function countCategoryTakes(category) {
  return category.subcategories.reduce(
    (sum, sub) => sum + (sub.takes?.length ?? 0),
    0,
  );
}

export function clampTake(text) {
  if (!text || text.length <= TAKE_CHAR_LIMIT) return text ?? "";
  return `${text.slice(0, TAKE_CHAR_LIMIT - 1)}…`;
}
