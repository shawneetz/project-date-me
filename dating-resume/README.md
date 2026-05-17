Profile.jsx
└─ Receives profile from data.js via username route
├─ HeroSection (receives full profile) → displays name, MBTI, sign, tag, fun fact
│ └─ HeroPhoto → uses photoUrl & name from profile
├─ CardSection (receives items array) → maps with getIcon()
│ └─ ExpandableCard (individual items) → local expand/collapse state
├─ LookingForCard (receives lookingFor object)
├─ BringList (receives brings array) → maps to bulleted items
├─ DealBreakers (receives dealBreakers array) → renders as pills
├─ QuoteBlock (receives quote object)
└─ SectionDots → independent navigation (IntersectionObserver-based)
