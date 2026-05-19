/**
 * src/sections/QualitiesSection.jsx
 *
 * PIPELINE STAGE: 4 (Section Rendering)
 *
 * Role: Display personal qualities in a grid
 * - Receives items array from Profile.jsx (profile.qualities)
 * - Each quality item has: id, iconKey, title, preview, body
 * - Renders each quality as a PixelWindow component (retro-styled card)
 * - Uses Framer Motion for staggered entrance animations
 * - Scroll detection via useInView hook
 *
 * Data Flow:
 * Profile.jsx (profile.qualities[])
 * → QualitiesSection props
 * → Map over items
 * → Render PixelWindow for each quality
 * → Apply staggered animations on scroll into view
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PixelWindow from "../../components/PixelWindows";
import "./QualitiesSection.css";

export default function QualitiesSection({ items }) {
  // ── Ref for scroll detection (animate when section enters viewport) ──
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <motion.section
      id="qualities"
      ref={ref}
      // ── Initial state: invisible & pushed down ──
      initial={{ opacity: 0, y: 22 }}
      // ── Animate to visible when section enters viewport ──
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="section"
    >
      {/* Section label/title */}
      <div className="section-label">Qualities</div>

      {/* Grid container with staggered animations */}
      <div className="pxw-stack">
        {/* Loop through qualities and render each as a pixel window card */}
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            // ── Each item starts below and transparent ──
            initial={{ opacity: 0, y: 14 }}
            // ── Animate to visible on scroll ──
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            // ── Stagger: each item delays 0.08s more than previous ──
            transition={{
              duration: 0.4,
              delay: 0.08 * index,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* 
              PixelWindow: Reusable card component (Stage 5)
              - title: Quality name
              - body: Full description
              - accentIndex: For color variation
            */}
            <PixelWindow
              title={item.title}
              body={item.body}
              accentIndex={index}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
