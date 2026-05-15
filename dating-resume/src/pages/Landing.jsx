// src/pages/Landing.jsx
// The homepage at /
// Shows a short pitch and links to the demo profile.

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-sm"
      >
        <p className="text-[11px] tracking-[0.2em] uppercase text-pink-500 mb-4">
          Dating Resume
        </p>
        <h1 className="font-serif text-4xl font-bold text-white leading-tight mb-4">
          A better way to introduce yourself.
        </h1>
        <p className="text-neutral-500 text-[14px] leading-relaxed mb-8">
          Not a bio. Not a list of hobbies. A real, layered, expandable profile
          that actually sounds like you.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/shawn"
            className="bg-white text-black font-medium text-sm py-3 px-6 rounded-xl hover:bg-neutral-200 transition-colors"
          >
            See a demo profile →
          </Link>
          <Link
            to="/edit"
            className="border border-neutral-800 text-neutral-400 text-sm py-3 px-6 rounded-xl hover:border-neutral-600 hover:text-white transition-colors"
          >
            Create yours
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
