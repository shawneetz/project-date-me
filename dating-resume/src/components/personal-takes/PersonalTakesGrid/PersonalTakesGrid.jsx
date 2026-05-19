/**
 * PersonalTakesGrid
 * Purpose: Main container for personal takes - renders category grid and modal overlay
 */
import { useState } from "react";
import CategoryCard from "../CategoryCard";
import TakesModal from "../TakesModal";
import "./PersonalTakesGrid.css";

export default function PersonalTakesGrid({ categories }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const openCategory = (category) => setActiveCategory(category);
  const closeModal = () => setActiveCategory(null);

  return (
    <>
      <div
        className="takes-grid"
        role="list"
        aria-label="Personal take categories"
      >
        {categories.map((category, index) => (
          <div key={category.id} role="listitem">
            <CategoryCard
              category={category}
              onOpen={openCategory}
              index={index}
            />
          </div>
        ))}
      </div>

      <TakesModal
        category={activeCategory}
        isOpen={Boolean(activeCategory)}
        onClose={closeModal}
      />
    </>
  );
}
