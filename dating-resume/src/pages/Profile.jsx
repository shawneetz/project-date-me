// src/pages/Profile.jsx
// The public, shareable profile page at /:username
// It reads the username from the URL, finds the matching profile, and renders it.
// For now it only has Shawn's data — Supabase can be added later to load any user.

import { useParams } from "react-router-dom";
import { shawnProfile } from "../data/shawn";

import HeroSection from "../components/HeroSection";
import CardSection from "../components/CardSection";
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-neutral-500 text-sm">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SectionDots />

      {/* Content column — centered, max width 640px, padded sides */}
      <div className="max-w-160 mx-auto px-5 pb-16">
        <HeroSection profile={profile} />
        <CardSection id="about" label="About me" items={profile.about} />
        <CardSection id="hobbies" label="Hobbies" items={profile.hobbies} />
        <LookingForCard lookingFor={profile.lookingFor} />
        <BringList brings={profile.brings} />
        <DealBreakers dealBreakers={profile.dealBreakers} />
        <QuoteBlock quote={profile.quote} />
      </div>
    </div>
  );
}
