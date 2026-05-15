// src/components/ExpandableCard.jsx
// Each hobby or trait card. Clicking it reveals the full description.
// AnimatePresence handles the smooth open/close animation.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExpandableCard({
  icon,
  title,
  preview,
  body,
  isOpen,
  onToggle,
}) {
  return (
    <div className="border border-neutral-800 rounded-xl overflow-hidden mb-2 bg-neutral-900 transition-colors duration-200 hover:border-neutral-700">
      {/* Clickable header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left gap-3 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          {/* Icon box */}
          <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-base shrink-0">
            {icon}
          </div>
          <div>
            <div className="text-[14.5px] font-medium text-white">{title}</div>
            <div className="text-[12px] text-neutral-500 mt-0.5">{preview}</div>
          </div>
        </div>

        {/* Chevron rotates when open */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-neutral-500 text-lg shrink-0"
        >
          ⌄
        </motion.span>
      </button>

      {/* Animated body — slides open smoothly */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4 pt-0 border-t border-neutral-800">
              <p className="text-[13.5px] text-neutral-400 leading-relaxed pt-3">
                {body}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
