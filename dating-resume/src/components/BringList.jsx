// src/components/BringList.jsx
// "What I Bring" — a staggered list, each item reveals with a small delay.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BringList({ brings }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.section
      id="brings"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] tracking-widest uppercase text-pink-500 font-medium">
          What I bring to the table
        </span>
        <div className="flex-1 h-px bg-neutral-800" />
      </div>

      <div className="flex flex-col gap-2">
        {brings.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-start gap-3"
          >
            {/* Pink dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.75 shrink-0" />
            <p className="text-[13.5px] text-neutral-400 leading-relaxed">
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
