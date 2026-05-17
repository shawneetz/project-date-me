import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ExpandableCard from "../components/ExpandableCard";
import { getIcon } from "../components/iconMap";

export default function PersonalTakesSection({ items }) {
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
