// src/pages/Landing.jsx
// The homepage at /
// Shows a short pitch and links to the demo profile.

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-sm"
      >
        <p
          className="text-[11px] tracking-[0.2em] uppercase mb-4"
          style={{ color: "var(--sun)" }}
        >
          Dating Resume
        </p>
        <h1
          className="font-serif text-4xl font-bold leading-tight mb-4"
          style={{ color: "var(--ink)" }}
        >
          A better way to introduce yourself.
        </h1>
        <p
          className="text-[14px] leading-relaxed mb-8"
          style={{ color: "var(--faded)" }}
        >
          Not a bio. Not a list of hobbies. A real, layered, expandable profile
          that actually sounds like you.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/shawn"
            className="font-medium text-sm py-3 px-6 rounded-xl transition-colors"
            style={{ backgroundColor: "var(--sun)", color: "var(--bg)" }}
          >
            See a demo profile →
          </Link>
          <Link
            to="/edit"
            className="text-sm py-3 px-6 rounded-xl transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--faded)",
              border: "1px solid",
            }}
          >
            Create yours
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
