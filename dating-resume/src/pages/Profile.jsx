/**
 * src/pages/Profile.jsx
 *
 * PIPELINE STAGE: 3 (Profile Page Orchestration)
 *
 * Role: Main profile page component
 * - Receives :username from router (e.g., /shawn)
 * - Looks up profile data from src/data/shawn.js
 * - Orchestrates rendering of all sections in order
 * - Wraps each section in RevealPanel for staggered animations
 *
 * Data Flow:
 * Route /:username → useParams() → shawnProfile lookup
 * → Pass profile object as props to sections
 * → Each section receives relevant slice of data
 * → Browser renders full profile page
 */

// src/pages/Profile.jsx
import "./Profile.css";
import { useParams } from "react-router-dom";
import { shawnProfile } from "../data/shawn";

import HeroSection from "../sections/HeroSection";
import QualitiesSection from "../sections/QualitiesSection";
import PersonalTakesSection from "../sections/PersonalTakesSection";
import HobbiesSection from "../sections/HobbiesSection";
import LookingForSection from "../sections/LookingForSection";
import DealBreakersSection from "../sections/DealBreakersSection";
import WhatYoullGetSection from "../sections/WhatYoullGetSection";
import QuoteSection from "../sections/QuoteSection";
import SectionDots from "../components/SectionDots";
import RevealPanel from "../components/RevealPanel";

export default function Profile() {
  // ── Extract username from URL parameter (e.g., /shawn) ──
  const { username } = useParams();

  // ── Look up profile data. Currently only "shawn" exists ──
  const profile = username === "shawn" ? shawnProfile : null;

  // ── Handle case where profile doesn't exist ──
  if (!profile) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <p className="text-sm" style={{ color: "var(--faded)" }}>
          Profile not found.
        </p>
      </div>
    );
  }

  // ── Main page render: sections staggered with reveal animations ──
  return (
    <div className="profile-page" style={{ backgroundColor: "var(--bg)" }}>
      {/* Navigation dots showing current section position */}
      <SectionDots />

      <div className="app">
        {/* Hero: Greeting + name + photo (no delay for immediate impact) */}
        <RevealPanel delay={0}>
          <HeroSection profile={profile} />
        </RevealPanel>

        {/* Qualities: Personal traits displayed as pixel windows */}
        <RevealPanel delay={60}>
          <QualitiesSection items={profile.qualities} />
        </RevealPanel>

        {/* Personal Takes: Interactive category grid with modal */}
        <RevealPanel delay={100}>
          <PersonalTakesSection categories={profile.personalTakesCategories} />
        </RevealPanel>

        {/* Hobbies: Carousel of hobby cards with images */}
        <RevealPanel delay={140}>
          <HobbiesSection items={profile.hobbies} />
        </RevealPanel>

        {/* Looking For: What you're seeking in a relationship */}
        <RevealPanel delay={180}>
          <LookingForSection lookingFor={profile.lookingFor} />
        </RevealPanel>

        {/* Deal Breakers: List of non-negotiables */}
        <RevealPanel delay={220}>
          <DealBreakersSection dealBreakers={profile.dealBreakers} />
        </RevealPanel>

        {/* What You'll Get: Benefits of dating you */}
        <RevealPanel delay={260}>
          <WhatYoullGetSection items={profile.whatYoullGet} />
        </RevealPanel>

        {/* Quote: Closing featured quote or motto */}
        <RevealPanel delay={300}>
          <QuoteSection quote={profile.quote} />
        </RevealPanel>
      </div>
    </div>
  );
}
