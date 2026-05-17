import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function QuoteSection({ quote }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.section
      id="quote"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="section"
    >
      <div className="section-label">Quote</div>

      <div className="quote-block">
        <blockquote>&ldquo;{quote.text}&rdquo;</blockquote>
        <cite>&mdash; {quote.author.toUpperCase()}</cite>
      </div>
    </motion.section>
  );
}
