// src/pages/Profile.jsx
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
import { useReveal } from "../hooks/useReveal";

export default function Profile() {
  const { username } = useParams();
  const profile = username === "shawn" ? shawnProfile : null;

  const hero = useReveal(0);
  const qualities = useReveal(60);
  const personalTakes = useReveal(100);
  const hobbies = useReveal(140);
  const looking = useReveal(180);
  const dealBreakers = useReveal(220);
  const whatYoullGet = useReveal(260);
  const quote = useReveal(300);

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

  return (
    <div className="profile-page" style={{ backgroundColor: "var(--bg)" }}>
      <SectionDots />

      <div className="app">
        <div
          ref={hero.ref}
          className={`profile-panel reveal ${hero.visible ? "visible" : ""}`}
        >
          <HeroSection profile={profile} />
        </div>

        <div
          ref={qualities.ref}
          className={`profile-panel reveal ${qualities.visible ? "visible" : ""}`}
        >
          <QualitiesSection items={profile.qualities} />
        </div>

        <div
          ref={personalTakes.ref}
          className={`profile-panel reveal ${personalTakes.visible ? "visible" : ""}`}
        >
          <PersonalTakesSection categories={profile.personalTakesCategories} />
        </div>

        <div
          ref={hobbies.ref}
          className={`profile-panel reveal ${hobbies.visible ? "visible" : ""}`}
        >
          <HobbiesSection items={profile.hobbies} />
        </div>

        <div
          ref={looking.ref}
          className={`profile-panel reveal ${looking.visible ? "visible" : ""}`}
        >
          <LookingForSection lookingFor={profile.lookingFor} />
        </div>

        <div
          ref={dealBreakers.ref}
          className={`profile-panel reveal ${dealBreakers.visible ? "visible" : ""}`}
        >
          <DealBreakersSection dealBreakers={profile.dealBreakers} />
        </div>

        <div
          ref={whatYoullGet.ref}
          className={`profile-panel reveal ${whatYoullGet.visible ? "visible" : ""}`}
        >
          <WhatYoullGetSection items={profile.whatYoullGet} />
        </div>

        <div
          ref={quote.ref}
          className={`profile-panel reveal ${quote.visible ? "visible" : ""}`}
        >
          <QuoteSection quote={profile.quote} />
        </div>
      </div>
    </div>
  );
}
