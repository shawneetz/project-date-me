// src/components/SectionDots.jsx
// Fixed navigation dots on the right side (desktop) or hidden on mobile.
// Clicking a dot scrolls you to that section.
// The active dot highlights when you're in that section.

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "hobbies", label: "Hobbies" },
  { id: "looking", label: "Looking For" },
  { id: "brings", label: "What I Bring" },
  { id: "dealbreakers", label: "Deal Breakers" },
];

export default function SectionDots() {
  const [active, setActive] = useState("about");

  // Watch which section is visible and update the active dot
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // Hidden on mobile (sm:flex), fixed to the right side on desktop
    <div className="hidden sm:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-50">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={label}
          className="group flex items-center gap-2 justify-end"
        >
          {/* Label tooltip — shows on hover */}
          <span
            className="text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: "var(--faded)" }}
          >
            {label}
          </span>
          {/* The dot */}
          <div
            className="rounded-full transition-all duration-300"
            style={
              active === id
                ? {
                    width: "0.5rem",
                    height: "0.5rem",
                    backgroundColor: "var(--sun)",
                  }
                : {
                    width: "0.375rem",
                    height: "0.375rem",
                    backgroundColor: "var(--faded)",
                  }
            }
          />
        </button>
      ))}
    </div>
  );
}
