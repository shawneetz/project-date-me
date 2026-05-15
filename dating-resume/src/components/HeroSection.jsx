// src/components/HeroSection.jsx
// The top of the profile — name, tags, and fun fact.
// Animates in on load (not scroll — it's always visible first).

import { motion } from "framer-motion";

export default function HeroSection({ profile }) {
  const { name, mbti, sign, tag, funFact } = profile;

  // Split name into two lines for the big display text
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="pt-10 pb-8 border-b border-neutral-800 mb-8"
    >
      {/* Small label at top */}
      <p className="text-[11px] tracking-[0.15em] uppercase text-neutral-500 mb-3">
        Dating Resume · 2025
      </p>

      {/* Big name — two lines, editorial style */}
      <h1 className="font-serif text-[clamp(2.4rem,9vw,4rem)] font-bold leading-[1.05] text-white mb-1">
        {firstName}
        <br />
        <span className="text-neutral-400">{lastName}</span>
      </h1>

      {/* Metadata tags */}
      <p className="text-[12.5px] text-neutral-500 tracking-wide mt-3">
        {mbti}
        <span className="mx-2 opacity-40">|</span>
        {sign}
        <span className="mx-2 opacity-40">|</span>
        {tag}
      </p>

      {/* Fun fact highlight box */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-5 px-4 py-3 bg-neutral-900 border-l-2 border-pink-500 rounded-r-lg"
      >
        <p className="text-[13px] text-neutral-300 italic leading-relaxed">
          🛠 {funFact}
        </p>
      </motion.div>
    </motion.div>
  );
}
