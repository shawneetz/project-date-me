import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ExpandableCard from "./ExpandableCard";
import { getIcon } from "./iconMap";

export default function CardSection({ label, items, id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="section"
    >
      <div className="section-label">{label}</div>

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
