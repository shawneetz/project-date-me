/**
 * TakesModal
 * Purpose: Portal modal displaying category details with subcategories and individual takes
 */
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTakesModal } from "../../../hooks/useTakesModal";
import { getCategoryIcon } from "../getCategoryIcon";
import SubcategoryPanel from "../SubcategoryPanel";
import { countCategoryTakes } from "../../../utils/personalTakes";
import "./TakesModal.css";

/** Per-category accent palette — mirrors CategoryCard.css */
const CATEGORY_ACCENTS = {
  learning: { hex: "#e8a44a", rgb: "232, 164, 74" },
  relationships: { hex: "#e05050", rgb: "224, 80, 80" },
  lifestyle: { hex: "#60c8d0", rgb: "96, 200, 208" },
  entertainment: { hex: "#8b8ff0", rgb: "139, 143, 240" },
  food: { hex: "#88c070", rgb: "136, 192, 112" },
  random: { hex: "#d4835a", rgb: "212, 131, 90" },
};

function getAccent(category) {
  if (!category) return CATEGORY_ACCENTS.learning;
  return CATEGORY_ACCENTS[category.iconKey] ?? CATEGORY_ACCENTS.learning;
}

export default function TakesModal({ category, isOpen, onClose }) {
  const { titleId, closeRef } = useTakesModal(isOpen, onClose);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const focusable = panelRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    const trap = (e) => {
      if (e.key !== "Tab" || !focusable?.length) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    const panel = panelRef.current;
    panel?.addEventListener("keydown", trap);
    return () => panel?.removeEventListener("keydown", trap);
  }, [isOpen]);

  const takeCount = category ? countCategoryTakes(category) : 0;
  const accent = getAccent(category);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && category && (
        <div className="takes-modal-root">
          <motion.button
            type="button"
            className="takes-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-label="Close modal"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="takes-modal-panel"
            /* Inject accent CSS vars so header, body, subcategories all inherit */
            style={{
              "--modal-accent": accent.hex,
              "--modal-accent-rgb": accent.rgb,
            }}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            <header className="takes-modal-header">
              <motion.div
                className="takes-modal-header__icon"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {getCategoryIcon(category.iconKey)}
              </motion.div>
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="takes-modal-header__title">
                  {category.title}
                </h2>
                <p className="takes-modal-header__meta">
                  {takeCount} {takeCount === 1 ? "take" : "takes"} ·{" "}
                  {category.subcategories.length} topics
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="takes-modal-close"
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <div className="takes-modal-body">
              {category.subcategories.map((sub, i) => (
                <SubcategoryPanel key={sub.id} subcategory={sub} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
