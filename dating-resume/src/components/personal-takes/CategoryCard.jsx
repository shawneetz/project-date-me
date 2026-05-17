import { motion } from "framer-motion";
import { getCategoryIcon } from "./categoryIcons";
import { countCategoryTakes } from "../../utils/personalTakes";

export default function CategoryCard({ category, onOpen, index }) {
  const takeCount = countCategoryTakes(category);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(category)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileTap={{ scale: 0.98 }}
      className="takes-category-card group w-full"
      aria-label={`Open ${category.title}, ${takeCount} takes`}
    >
      <div className="takes-category-card__body">
        <motion.div
          className="takes-category-card__icon"
          whileHover={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 0.4 }}
        >
          {getCategoryIcon(category.iconKey)}
        </motion.div>

        <h3 className="takes-category-card__title">{category.title}</h3>

        <p className="takes-category-card__count">
          {takeCount} {takeCount === 1 ? "take" : "takes"}
        </p>
      </div>

      <span className="takes-category-card__cta" aria-hidden>
        View all →
      </span>
    </motion.button>
  );
}
