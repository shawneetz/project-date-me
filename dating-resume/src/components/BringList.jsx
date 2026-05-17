import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BringList({ brings }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.section
      id="brings"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="section"
    >
      <div className="section-label">What I bring to the table</div>

      <div className="bring-list">
        {brings.map((item, i) => (
          <div key={i} className="bring-item">
            <div className="bring-dot" />
            <div>{item}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
