/**
 * src/sections/HeroSection.jsx
 *
 * PIPELINE STAGE: 4 (Section Rendering)
 *
 * Role: Display profile introduction and hero content
 * - Receives full profile object from Profile.jsx
 * - Extracts: heroGreeting, name, mbti, sign, tag, funFact, photoCaption
 * - Renders welcome message, profile photo, badges, and fun fact
 * - Uses Framer Motion for staggered entrance animations
 * - First section on page, no scroll detection needed (immediate animation)
 *
 * Data Flow:
 * Profile.jsx (profile)
 * → HeroSection props
 * → Extract profile fields
 * → Render with animations (delays create cascade effect)
 * → HeroPhoto component displays actual image
 *
 * Animation Timing (cascade):
 * 1. Hero name: 0ms (start immediately)
 * 2. Welcome message: +200ms
 * 3. Photo column: +250ms
 * 4. Fun fact: +400ms
 */

import { motion } from "framer-motion";
import HeroPhoto from "../../components/HeroPhoto";
import "./HeroSection.css";

export default function HeroSection({ profile }) {
  // ── Extract relevant fields from profile object ──
  const { heroGreeting, mbti, sign, tag, funFact, photoCaption } = profile;

  return (
    <motion.section
      id="hero"
      // ── Start invisible and pushed down ──
      initial={{ opacity: 0, y: 30 }}
      // ── Animate to visible immediately (no scroll detection) ──
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="hero"
    >
      {/* ── Main heading: greeting text ── */}
      <h1 className="hero-name">{heroGreeting}</h1>

      {/* ── Welcome tagline: cascades in after heading ── */}
      <motion.p
        className="hero-welcome"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome to Shawnscapes!
      </motion.p>

      {/* ── Photo column: image, badges, caption ── */}
      <motion.div
        className="hero-photo-col"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        {/* Profile photo or placeholder (Stage 5 component) */}
        <HeroPhoto profile={profile} />

        {/* MBTI, zodiac sign, tagline badges */}
        <p className="hero-sub">
          {mbti.toUpperCase()} <span>|</span> {sign.toUpperCase()}{" "}
          <span>|</span> {tag.toUpperCase()}
        </p>

        {/* Optional caption below photo */}
        {photoCaption && <p className="hero-photo-caption">{photoCaption}</p>}
      </motion.div>

      {/* ── Fun fact: full-width, spans both columns on desktop ── */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="hero-funfact"
      >
        Fun Fact: {funFact}
      </motion.div>
    </motion.section>
  );
}
