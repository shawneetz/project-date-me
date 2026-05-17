import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function LookingForCard({ lookingFor }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.section
      id="looking"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="section"
    >
      <div className="section-label">Looking for</div>

      <div className="looking-card">
        <h3>{lookingFor.headline}</h3>
        <p>{lookingFor.body}</p>
      </div>
    </motion.section>
  );
}
