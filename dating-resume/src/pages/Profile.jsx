// src/pages/Profile.jsx
// The public, shareable profile page at /:username
// It reads the username from the URL, finds the matching profile, and renders it.
// For now it only has Shawn's data — Supabase can be added later to load any user.

import { useParams } from "react-router-dom";
import { shawnProfile } from "../data/shawn";

import HeroSection from "../components/HeroSection";
import CardSection from "../components/CardSection";
import HobbyCarousel from "../components/HobbyCarousel";
import LookingForCard from "../components/LookingForCard";
import BringList from "../components/BringList";
import DealBreakers from "../components/DealBreakers";
import QuoteBlock from "../components/QuoteBlock";
import SectionDots from "../components/SectionDots";

export default function Profile() {
  const { username } = useParams();

  // For now: only Shawn's profile exists.
  // Later you'll replace this with a Supabase fetch using the username.
  const profile = username === "shawn" ? shawnProfile : null;

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
    <div
      className="min-h-screen text-black"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <SectionDots />

      <div className="app">
        <HeroSection profile={profile} />
        <CardSection id="about" label="About me" items={profile.about} />
        <HobbyCarousel items={profile.hobbies} />
        <LookingForCard lookingFor={profile.lookingFor} />
        <BringList brings={profile.brings} />
        <DealBreakers dealBreakers={profile.dealBreakers} />
        <QuoteBlock quote={profile.quote} />
      </div>
    </div>
  );
}
