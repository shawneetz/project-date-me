/**
 * SubcategoryPanel
 * Purpose: Render single subcategory section within modal with list of takes
 */
import { motion } from "framer-motion";
import "./SubcategoryPanel.css";

export default function SubcategoryPanel({ subcategory, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="takes-subcategory"
    >
      <h4 className="takes-subcategory__title">{subcategory.title}</h4>
      <ul className="takes-subcategory__list">
        {subcategory.takes?.map((take, i) => (
          <li key={i} className="takes-subcategory__take">
            {take}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
