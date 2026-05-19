/** Per-card accent colors from the existing palette (index.css --accent-*). */
export const HOBBY_ACCENT_COLORS = [
  "var(--accent-1)",
  "var(--accent-2)",
  "var(--accent-3)",
  "var(--accent-4)",
  "var(--accent-5)",
  "var(--accent-6)",
];

export function getHobbyAccent(realIndex) {
  return HOBBY_ACCENT_COLORS[realIndex % HOBBY_ACCENT_COLORS.length];
}

export function getRealIndex(trackIndex, itemCount) {
  if (itemCount <= 1) return 0;
  if (trackIndex === 0) return itemCount - 1;
  if (trackIndex === itemCount + 1) return 0;
  return trackIndex - 1;
}

export function buildTrackSlides(items) {
  const slides = items.map((item, index) => ({
    item,
    realIndex: index,
    accent: getHobbyAccent(index),
    key: item.id ?? `hobby-${index}`,
    isClone: false,
  }));

  if (items.length <= 1) return slides;

  const last = slides[slides.length - 1];
  const first = slides[0];

  return [
    { ...last, key: `${last.key}-clone-start`, isClone: true },
    ...slides,
    { ...first, key: `${first.key}-clone-end`, isClone: true },
  ];
}

export function getInitialTrackIndex(itemCount) {
  return itemCount <= 1 ? 0 : 1;
}
