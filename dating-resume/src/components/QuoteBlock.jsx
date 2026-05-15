// src/components/QuoteBlock.jsx
// The closing quote — centered, serif, subtle.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function QuoteBlock({ quote }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center pt-6 pb-10 border-t border-neutral-800 mt-2"
    >
      <blockquote className="font-serif italic text-[1.05rem] text-neutral-300 leading-relaxed mb-3 max-w-sm mx-auto">
        "{quote.text}"
      </blockquote>
      <cite className="text-[11.5px] text-neutral-600 tracking-wide not-italic">
        — {quote.author}
      </cite>
    </motion.div>
  );
}
