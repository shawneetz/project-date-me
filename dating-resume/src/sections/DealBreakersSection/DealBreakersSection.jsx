import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./DealBreakersSection.css";

export default function DealBreakersSection({ dealBreakers }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.section
      id="dealbreakers"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="section"
    >
      <div className="section-label">Deal breakers</div>

      <div className="db-grid">
        {dealBreakers.map((item, i) => (
          <div key={i} className="db-pill">
            {item}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
