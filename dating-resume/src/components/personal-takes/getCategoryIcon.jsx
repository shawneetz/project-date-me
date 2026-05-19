import {
  EntertainmentIcon,
  FoodIcon,
  LearningIcon,
  LifestyleIcon,
  RandomIcon,
  RelationshipsIcon,
} from "./categoryIcons";

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
