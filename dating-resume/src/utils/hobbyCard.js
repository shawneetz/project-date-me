/** Max description length for hobby carousel cards (3:5 card, ~42% body area). */
export const HOBBY_DESCRIPTION_MAX_LENGTH = 260;

export function truncateHobbyDescription(
  text,
  maxLength = HOBBY_DESCRIPTION_MAX_LENGTH,
) {
  if (!text || text.length <= maxLength) return text ?? "";
  const trimmed = text.slice(0, maxLength).trimEnd();
  const lastSpace = trimmed.lastIndexOf(" ");
  const cut = lastSpace > maxLength * 0.6 ? trimmed.slice(0, lastSpace) : trimmed;
  return `${cut}…`;
}
