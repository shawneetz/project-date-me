# Dating Resume

A beautiful, interactive dating profile that actually sounds like you.

## 📋 Project Pipeline

```
Profile Data (src/data/shawn.js)
    ↓
Profile.jsx routes to /:username
    ↓
Sections rendered (8 total):
├── HeroSection → displays name, bio, photo
├── QualitiesSection → retro pixel window cards
├── PersonalTakesSection → modal-driven category grid
├── HobbiesSection → single-card carousel
├── LookingForSection → dark gradient card
├── DealBreakersSection → red-tinted pills
├── WhatYoullGetSection → benefit list
└── QuoteSection → blockquote
    ↓
Each section uses components with co-located CSS
    ↓
Browser renders with Tailwind + custom animations
    ↓
useReveal hook triggers scroll-based animations
    ↓
Result: Beautiful, interactive profile
```

## 📖 Documentation

### **Quick Start**

- **Just want to edit your profile?** → Go to [EDITING_GUIDE.md](EDITING_GUIDE.md)
- **Want the full technical overview?** → Continue reading below

### **Editing Your Profile**

Everything starts in `src/data/shawn.js`:

```javascript
export const shawnProfile = {
  name: "Your Name",
  photoUrl: "src/assets/your-photo.jpg",
  qualities: [...],      // Your qualities (retro cards)
  hobbies: [...],        // Your hobbies (carousel)
  personalTakesCategories: [...],  // Your takes (modal grid)
  // ... more fields
};
```

Change any field and it updates everywhere automatically.

**See [EDITING_GUIDE.md](EDITING_GUIDE.md) for detailed editing instructions.**

---

## 🗂️ Folder Structure — Co-located Styles

The project organizes components and sections with their styles in the same folder:

```
src/
├── components/
│   ├── HeroPhoto/
│   │   ├── HeroPhoto.jsx
│   │   └── HeroPhoto.css
│   ├── HobbyCard/
│   │   ├── HobbyCard.jsx
│   │   └── HobbyCard.css
│   ├── PixelWindows/
│   │   ├── PixelWindows.jsx
│   │   └── PixelWindows.css
│   └── personal-takes/
│       └── CategoryCard/ + TakesModal, etc.
│
├── sections/
│   ├── HeroSection/
│   │   ├── HeroSection.jsx
│   │   └── HeroSection.css
│   ├── QualitiesSection/
│   ├── PersonalTakesSection/
│   ├── HobbiesSection/
│   ├── LookingForSection/
│   ├── DealBreakersSection/
│   ├── WhatYoullGetSection/
│   └── QuoteSection/
│       (each with .jsx and .css)
│
├── data/
│   ├── shawn.js ← **EDIT YOUR PROFILE HERE**
│   └── personalTakesCategories.js
│
├── pages/
│   ├── Landing.jsx
│   ├── Profile.jsx
│   └── Edit.jsx
│
├── styles/
│   ├── index.css (global + Tailwind)
│   ├── component.css (shared utilities)
│   └── sections/
│       ├── layout.css
│       ├── hero.css
│       └── ... (other section styles)
│
├── hooks/
│   ├── useReveal.js (scroll animation)
│   └── useTakesModal.js
│
├── utils/
│   ├── hobbyCard.js
│   └── personalTakes.js
│
└── store/
    └── useProfileStore.js
```

---

## 🧩 Component Overview

### Sections (8 total)

| Section             | Component            | Features                | Data Source                                      |
| ------------------- | -------------------- | ----------------------- | ------------------------------------------------ |
| **Hero**            | HeroSection          | Name, bio, photo, stats | profile.name, photoUrl, mbti, sign, tag, funFact |
| **Qualities**       | QualitiesSection     | Retro pixel windows     | profile.qualities                                |
| **Takes**           | PersonalTakesSection | Modal category grid     | profile.personalTakesCategories                  |
| **Hobbies**         | HobbiesSection       | Single-card carousel    | profile.hobbies                                  |
| **Looking For**     | LookingForSection    | Dark gradient card      | profile.lookingFor                               |
| **Deal Breakers**   | DealBreakersSection  | Red pill badges         | profile.dealBreakers                             |
| **What You'll Get** | WhatYoullGetSection  | Benefit list            | profile.whatYoullGet                             |
| **Quote**           | QuoteSection         | Blockquote              | profile.quote                                    |

### Key Components

- **HeroPhoto.jsx** — Photo frame with caption
- **PixelWindows.jsx** — Retro OS-style cards (used in QualitiesSection)
- **HobbyCard.jsx** — Carousel card with image
- **CategoryCard.jsx** → Personal takes grid entries
- **TakesModal.jsx** → Modal overlay for takes
- **SectionDots.jsx** — Fixed navigation dots (scroll indicator)

---

## 🎯 Common Tasks

| Task                      | File                                  | Instructions                                      |
| ------------------------- | ------------------------------------- | ------------------------------------------------- |
| Edit profile info         | `src/data/shawn.js`                   | Change name, photo, bio, qualities, hobbies, etc. |
| Add a quality             | `src/data/shawn.js`                   | Add object to `qualities` array                   |
| Add a hobby               | `src/data/shawn.js`                   | Add object to `hobbies` array                     |
| Add a personal take       | `src/data/personalTakesCategories.js` | Add string to `takes` array in subcategory        |
| Change section order      | `src/pages/Profile.jsx`               | Reorder section components                        |
| Customize colors          | `src/index.css`                       | Edit CSS variables (--sky-gold, etc.)             |
| Customize component style | `src/components/*/ComponentName.css`  | Edit co-located CSS                               |

**See [EDITING_GUIDE.md](EDITING_GUIDE.md) for detailed steps with code examples.**

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to your host.

---

## 🎨 Customization

### Colors

All colors are CSS variables in [src/index.css](src/index.css):

```css
:root {
  --sky-gold: #f0c060;
  --sky-amber: #e8a44a;
  --sky-teal: #60c8d0;
  --building-mid: #0d2a39;
  --bg: #050a11;
  /* ... more variables */
}
```

Change any variable for instant theme updates.

### Fonts

Uses **VT323** (monospace pixel font) and **Space Mono** (system monospace).

---

Profile.jsx
└─ Receives profile from data.js via username route
├─ HeroSection (receives full profile) → displays name, MBTI, sign, tag, fun fact
│ └─ HeroPhoto → uses photoUrl & name from profile
├─ QualitiesSection (receives items array) → maps with PixelWindow
│ └─ PixelWindow (individual items) → always-open retro OS-style cards
├─ PersonalTakesSection (receives categories array) → modal-based category picker
│ └─ PersonalTakesGrid → category grid + TakesModal
├─ HobbiesSection (receives hobbies array) → carousel of hobby cards
│ └─ HobbyCard (individual items) → image + description
├─ LookingForSection (receives lookingFor object)
├─ DealBreakersSection (receives dealBreakers array) → renders as pills
├─ WhatYoullGetSection (receives items array)
├─ QuoteSection (receives quote object)
└─ SectionDots → independent navigation (IntersectionObserver-based)

---

## 🔄 State Management

- **Zustand store** ([src/store/useProfileStore.js](src/store/useProfileStore.js)) — Optional for future features
- **React hooks** — useReveal (scroll animations), useTakesModal (modal state)

---

## 📱 Responsive Design

- **Mobile-first** approach with Tailwind CSS
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- All sections adapt seamlessly to screen size

---

## 🤝 Contributing

This is a personal project, but feel free to fork and customize!

---

**Ready to customize your profile? Start with [EDITING_GUIDE.md](EDITING_GUIDE.md)! 🎉**
