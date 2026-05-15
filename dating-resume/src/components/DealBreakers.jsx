// src/components/DealBreakers.jsx
// A grid of pill-shaped tags — the deal breakers list.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function DealBreakers({ dealBreakers }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.section
      id="dealbreakers"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] tracking-widest uppercase text-pink-500 font-medium">
          Deal breakers
        </span>
        <div className="flex-1 h-px bg-neutral-800" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {dealBreakers.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="bg-neutral-900 border border-neutral-800 rounded-lg py-2.5 px-3 text-[12.5px] text-neutral-500 text-center"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
