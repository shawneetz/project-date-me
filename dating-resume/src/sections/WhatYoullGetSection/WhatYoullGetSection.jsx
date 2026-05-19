import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./WhatYoullGetSection.css";

export default function WhatYoullGetSection({ items }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.section
      id="what-youll-get"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="section"
    >
      <div className="section-label">What you'll get</div>

      <div className="bring-list">
        {items.map((item, i) => (
          <div key={i} className="bring-item">
            <div className="bring-dot" />
            <div>{item}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
