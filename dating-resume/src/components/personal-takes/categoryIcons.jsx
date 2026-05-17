const iconClass = "w-6 h-6";

export function LearningIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 3L2 8l10 5 10-5-10-5z" />
      <path d="M2 13l10 5 10-5M2 17l10 5 10-5" />
    </svg>
  );
}

export function RelationshipsIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function LifestyleIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function EntertainmentIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="2" y="4" width="20" height="14" rx="2" />
      <path d="M10 9l5 3-5 3V9z" />
    </svg>
  );
}

export function FoodIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <path d="M6 1v3M10 1v3M14 1v3" />
    </svg>
  );
}

export function RandomIcon() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41" />
    </svg>
  );
}

const CATEGORY_ICONS = {
  learning: LearningIcon,
  relationships: RelationshipsIcon,
  lifestyle: LifestyleIcon,
  entertainment: EntertainmentIcon,
  food: FoodIcon,
  random: RandomIcon,
};

export function getCategoryIcon(iconKey) {
  const Icon = CATEGORY_ICONS[iconKey];
  return Icon ? <Icon /> : <RandomIcon />;
}
