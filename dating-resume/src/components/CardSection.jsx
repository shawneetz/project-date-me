// src/components/CardSection.jsx
// Wraps a group of expandable cards under one section label.
// useInView triggers the scroll animation when the section enters the viewport.
// Only one card can be open at a time (accordion behavior).

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ExpandableCard from "./ExpandableCard";

export default function CardSection({ label, items, id }) {
  const ref = useRef(null);
  // isInView becomes true once the element scrolls 15% into view
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  // Tracks which card is currently open. null = all closed.
  const [openId, setOpenId] = useState(null);

  const handleToggle = (cardId) => {
    setOpenId((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mb-8"
    >
      {/* Section label with a line after it */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] tracking-widest uppercase text-pink-500 font-medium">
          {label}
        </span>
        <div className="flex-1 h-px bg-neutral-800" />
      </div>

      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.07, duration: 0.45 }}
        >
          <ExpandableCard
            {...item}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}
