import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PersonalTakesGrid } from "../components/personal-takes";

export default function PersonalTakesSection({ categories }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.section
      id="personal-takes"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="section"
    >
      <div className="section-label">Personal takes</div>
      <p className="takes-section-hint">
        Tap a category to read hot takes, opinions, and tiny truths.
      </p>

      <PersonalTakesGrid categories={categories} />
    </motion.section>
  );
}
