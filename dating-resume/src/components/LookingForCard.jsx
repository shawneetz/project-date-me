// src/components/LookingForCard.jsx
// The "Looking For" section — a solid dark card, not expandable.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function LookingForCard({ lookingFor }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.section
      id="looking"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] tracking-widest uppercase text-pink-500 font-medium">
          Looking for
        </span>
        <div className="flex-1 h-px bg-neutral-800" />
      </div>

      {/* Solid card with white text — stands out visually */}
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl px-5 py-5">
        <h3 className="font-serif text-[1.15rem] text-white leading-snug mb-2">
          {lookingFor.headline}
        </h3>
        <p className="text-[13.5px] text-neutral-400 leading-relaxed">
          {lookingFor.body}
        </p>
      </div>
    </motion.section>
  );
}
