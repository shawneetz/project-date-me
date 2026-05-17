import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ExpandableCard from "../components/ExpandableCard";
import { getIcon } from "../components/iconMap";

export default function QualitiesSection({ items }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <motion.section
      id="qualities"
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="section"
    >
      <div className="section-label">Qualities</div>

      {items.map((item, index) => (
        <ExpandableCard
          key={item.id}
          icon={getIcon(item.iconKey)}
          title={item.title}
          preview={item.preview}
          body={item.body}
          isOpen={openId === item.id}
          onToggle={() => handleToggle(item.id)}
          accentIndex={index}
        />
      ))}
    </motion.section>
  );
}
