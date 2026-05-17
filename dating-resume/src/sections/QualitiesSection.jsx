import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ExpandableCard from "../components/ExpandableCard";
import { getIcon } from "../components/iconMap";

export default function QualitiesSection({ items }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.section
      id="qualities"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="section"
    >
      <div className="section-label">Qualities</div>

      {items.map((item) => (
        <ExpandableCard
          key={item.id}
          icon={getIcon(item.iconKey)}
          title={item.title}
          preview={item.preview}
          body={item.body}
        />
      ))}
    </motion.section>
  );
}
