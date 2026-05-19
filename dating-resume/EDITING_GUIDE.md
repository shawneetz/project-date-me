# ✏️ Developer's Editing Guide — Dating Resume Project

> **Target Audience:** Developers extending, maintaining, or customizing this codebase.
>
> This guide explains how to modify the project, add features, style components, and understand the data flow.

## 📋 Frontend Pipeline & Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│ STAGE 1: DATA INITIALIZATION                                        │
│ - shawn.js exports shawnProfile object                              │
│ - personalTakesCategories.js exports category data                  │
└──────────────────────────┬──────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────────┐
│ STAGE 2: ROUTING (App.jsx)                                          │
│ - BrowserRouter enables client-side routing                         │
│ - Route "/" → Landing page                                          │
│ - Route "/:username" → Profile page (resolves to shawnProfile)      │
│ - Route "/edit" → Edit page (future feature)                        │
└──────────────────────────┬──────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────────┐
│ STAGE 3: PROFILE PAGE ORCHESTRATION (pages/Profile.jsx)            │
│ - Fetches profile data by route parameter (:username)               │
│ - Passes entire profile object to sections as props                 │
│ - Section components are mounted in specific order                  │
└──────────────────────────┬──────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────────┐
│ STAGE 4: SECTION RENDERING                                          │
│ Each section receives relevant slices of profile data:               │
│ - HeroSection          → profile.name, profile.photoUrl, etc.      │
│ - QualitiesSection     → profile.qualities[]                        │
│ - HobbiesSection       → profile.hobbies[]                          │
│ - PersonalTakesSection → profile.personalTakesCategories[]         │
│ - LookingForSection    → profile.lookingFor{}                       │
│ - DealBreakersSection  → profile.dealBreakers[]                     │
│ - WhatYoullGetSection  → profile.whatYoullGet[]                     │
│ - QuoteSection         → profile.quote{}                            │
└──────────────────────────┬──────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────────┐
│ STAGE 5: COMPONENT RENDERING                                        │
│ Sections use reusable components:                                    │
│ - HeroPhoto          (displays image + caption)                     │
│ - HobbyCard          (card with optional image)                     │
│ - CategoryCard       (clickable category grid)                      │
│ - SubcategoryPanel   (nested takes)                                 │
│ - TakesModal         (modal overlay for full text)                  │
│ - SectionDots        (navigation indicator)                         │
│ - PixelWindows       (retro-style card wrapper)                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────────┐
│ STAGE 6: STYLING APPLICATION                                        │
│ CSS processed in layers:                                             │
│ - Tailwind + custom properties (index.css, App.css)                 │
│ - Component-level CSS (HeroPhoto.css, HobbyCard.css, etc.)          │
│ - Section-level CSS (HeroSection.css, QualitiesSection.css, etc.)   │
│ - Shared utilities (section-layout.css)                             │
│ - Vite bundles all CSS together                                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────────┐
│ STAGE 7: CLIENT-SIDE INTERACTIVITY                                  │
│ React hooks handle dynamic behavior:                                 │
│ - useReveal        → Scroll-in animations via Intersection Observer  │
│ - useTakesModal    → Modal open/close state management               │
│ - useState, useRef → Component-level state                           │
│ - Event handlers   → Click, scroll, form inputs                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────────────┐
│ STAGE 8: BROWSER RENDERS TO USER                                    │
│ Final rendered DOM with:                                             │
│ - Semantic HTML elements                                            │
│ - Applied CSS (Tailwind + custom)                                   │
│ - Event listeners attached                                          │
│ - Animations triggered on scroll/interaction                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📂 File Organization (Detailed)

### NEW Folder Structure with Developer Notes

```
src/
├── App.jsx                    # Router setup - read App.css + index.css
├── App.css                    # App-level styles
├── index.css                  # Global styles + Tailwind imports
├── main.jsx                   # React entry point (don't edit)
│
├── components/                # Reusable, low-level UI components
│   ├── HeroPhoto/             # Stage 5: Displays profile photo
│   │   ├── HeroPhoto.jsx      #  - Renders <img> + caption
│   │   ├── HeroPhoto.css      #  - Custom sizing/spacing
│   │   └── index.js
│   │
│   ├── HobbyCard/             # Stage 5: Individual hobby card
│   │   ├── HobbyCard.jsx      #  - Maps hobby object to UI
│   │   ├── HobbyCard.css      #  - Card styling + image
│   │   └── index.js
│   │
│   ├── PixelWindows/          # Stage 5: Retro pixel-art wrapper
│   │   ├── PixelWindows.jsx   #  - Border effect container
│   │   ├── PixelWindows.css   #  - Pixel border animations
│   │   └── index.js
│   │
│   ├── SectionDots/           # Stage 5: Navigation indicators
│   │   ├── SectionDots.jsx    #  - Scroll position dots
│   │   ├── SectionDots.css    #  - Dot styling/animations
│   │   └── index.js
│   │
│   ├── Icons.jsx              # Stage 1: Icon component library
│   │                           #  - SVG/icon definitions
│   │
│   ├── iconMap.jsx            # Stage 1: Icon name → Component mapper
│   │                           #  - Lookup table for icons
│   │
│   └── personal-takes/        # Feature: Personal takes feature
│       ├── index.js           #  - Re-exports all components
│       ├── categoryIcons.jsx  #  - Maps category ID to icon
│       ├── getCategoryIcon.jsx# - Helper to fetch category icon
│       │
│       ├── CategoryCard/       # Stage 5: Category grid item
│       │   ├── CategoryCard.jsx
│       │   ├── CategoryCard.css
│       │   └── index.js
│       │
│       ├── PersonalTakesGrid/ # Stage 5: Grid of all categories
│       │   ├── PersonalTakesGrid.jsx
│       │   ├── PersonalTakesGrid.css
│       │   └── index.js
│       │
│       ├── SubcategoryPanel/  # Stage 5: Nested takes list
│       │   ├── SubcategoryPanel.jsx
│       │   ├── SubcategoryPanel.css
│       │   └── index.js
│       │
│       └── TakesModal/        # Stage 5: Modal for full take text
│           ├── TakesModal.jsx
│           ├── TakesModal.css
│           └── index.js
│
├── sections/                  # Stage 4: Page sections (combine components)
│   ├── HeroSection/           #  - Profile intro + photo
│   │   ├── HeroSection.jsx
│   │   ├── HeroSection.css
│   │   └── index.js
│   │
│   ├── QualitiesSection/      #  - Grid of personal qualities
│   │   ├── QualitiesSection.jsx
│   │   ├── QualitiesSection.css
│   │   └── index.js
│   │
│   ├── HobbiesSection/        #  - Carousel of hobby cards
│   │   ├── HobbiesSection.jsx
│   │   ├── HobbiesSection.css
│   │   └── index.js
│   │
│   ├── PersonalTakesSection/  #  - Interactive takes grid + modal
│   │   ├── PersonalTakesSection.jsx
│   │   ├── PersonalTakesSection.css
│   │   └── index.js
│   │
│   ├── LookingForSection/     #  - "What I'm looking for" text
│   │   ├── LookingForSection.jsx
│   │   ├── LookingForSection.css
│   │   └── index.js
│   │
│   ├── DealBreakersSection/   #  - "Deal breakers" list
│   │   ├── DealBreakersSection.jsx
│   │   ├── DealBreakersSection.css
│   │   └── index.js
│   │
│   ├── WhatYoullGetSection/   #  - Relationship benefits list
│   │   ├── WhatYoullGetSection.jsx
│   │   ├── WhatYoullGetSection.css
│   │   └── index.js
│   │
│   ├── QuoteSection/          #  - Featured quote/motto
│   │   ├── QuoteSection.jsx
│   │   ├── QuoteSection.css
│   │   └── index.js
│   │
│   └── shared/                #  - Shared section utilities
│       └── section-layout.css #  - Common .section, .section-label
│
├── pages/                     # Stage 3: Route handlers
│   ├── Landing.jsx           #  - Homepage / route
│   ├── Profile.jsx           #  - /:username route (main page)
│   ├── Profile.css           #  - Profile page styles
│   └── Edit.jsx              #  - /edit route (future feature)
│
├── data/                      # Stage 1: Application data
│   ├── shawn.js              #  🔴 PRIMARY: Edit here to change profile
│   │                          #  - shawnProfile object
│   │                          #  - Imported by Profile.jsx
│   │
│   └── personalTakesCategories.js  #  - Nested takes data
│                              #  - Referenced in shawn.js
│
├── hooks/                     # Stage 7: Custom React hooks
│   ├── useReveal.js          #  - Intersection Observer for animations
│   │                          #  - Returns { ref, visible }
│   │
│   └── useTakesModal.js      #  - Modal state management
│                              #  - Returns { isOpen, selectedTake, ... }
│
├── store/                     # Stage 7: Global state (Zustand)
│   └── useProfileStore.js    #  - Reserved for future global state
│
├── utils/                     # Helper functions
│   ├── hobbyCard.js          #  - Hobby-related utilities
│   ├── hobbyCarousel.js      #  - Carousel logic for hobbies
│   └── personalTakes.js      #  - Takes filtering/formatting
│
└── assets/                    # Stage 1-2: Static images
    └── shawn-pfp.jpg         #  - Profile photo (referenced in shawn.js)
```

---

## 🎯 Common Developer Tasks

└── main.jsx

````

---

## 🎯 Common Editing Tasks

### 1. **Modify Profile Data** (Most Common - Stage 1)

**File:** [src/data/shawn.js](src/data/shawn.js)

Everything starts here. The profile object flows through the pipeline and updates all sections automatically via React's prop system.

```javascript
export const shawnProfile = {
  // Hero section fields
  name: "Shawn Alfred Padilla",
  username: "shawn",
  heroGreeting: "Hello, I'm Shawn!",
  mbti: "INTP",
  sign: "Capricorn",
  tag: "CS Student",

  // Profile photo (Stage 1 → HeroPhoto.jsx)
  photoUrl: "src/assets/shawn-pfp.jpg",
  photoCaption: "Out in nature",
  funFact: "I love exploring new places",

  // Qualities array (→ QualitiesSection.jsx)
  qualities: [ /* array of quality objects */ ],

  // Hobbies array (→ HobbiesSection.jsx)
  hobbies: [ /* array of hobby objects */ ],

  // Personal takes (→ PersonalTakesSection.jsx)
  personalTakesCategories, // imported from separate file

  // Looking for text (→ LookingForSection.jsx)
  lookingFor: { headline: "...", body: "..." },

  // Optional: deal breakers (→ DealBreakersSection.jsx)
  dealBreakers: ["Smoking", "No emotional availability"],

  // What you'll get (→ WhatYoullGetSection.jsx)
  whatYoullGet: [ /* array of benefit objects */ ],

  // Quote (→ QuoteSection.jsx)
  quote: { text: "...", author: "..." },
};
````

**How Changes Propagate:**

1. Edit `shawn.js`
2. Vite detects file change (HMR)
3. React re-renders Profile.jsx
4. Props flow to sections with new data
5. Components re-render with updated content

---

### 2. **Add a New Quality** (Stage 1 + 4)

**File:** [src/data/shawn.js](src/data/shawn.js)

Add to `qualities` array:

```javascript
{
  id: "curious",              // Unique identifier
  iconKey: "learning",        // Maps to Icons.jsx → iconMap.jsx
  title: "Curious",           // Displayed as card title
  preview: "Always asking why", // Short teaser
  body: "I love exploring ideas and learning new things daily.",
}
```

**Pipeline:** Data → QualitiesSection.jsx (Stage 4) → Renders each quality using PixelWindows component (Stage 5)

---

### 3. **Add a New Hobby** (Stage 1 + 4)

**File:** [src/data/shawn.js](src/data/shawn.js)

Add to `hobbies` array:

```javascript
{
  id: "hiking",               // Unique ID
  title: "Hiking",            // Card title
  description: "Exploring trails and nature...", // Auto-truncated to ~260 chars
  imageUrl: "https://images.unsplash.com/...", // External URL or null
  imageAlt: "Mountain trail",  // Accessibility
}
```

**Pipeline:** Data → HobbiesSection.jsx (renders carousel) → HobbyCard.jsx (Stage 5 component)

---

### 4. **Add a Personal Take** (Stage 1 + 4)

**File:** [src/data/personalTakesCategories.js](src/data/personalTakesCategories.js)

Navigate to category → subcategory → add to `takes` array:

```javascript
{
  id: "relationships",
  title: "Relationships",
  iconKey: "relationships",
  subcategories: [
    {
      id: "communication",
      title: "Communication",
      takes: [
        "Existing take here",
        "New take (keep under 140 characters)", // ← Add here
      ],
    },
  ],
}
```

**Pipeline:** Data → PersonalTakesSection → PersonalTakesGrid → CategoryCard (clickable) → TakesModal (on click)

---

### 5. **Style a Component** (Stage 6)

Each component has a co-located CSS file. Example:

**File:** [src/components/HobbyCard/HobbyCard.jsx](src/components/HobbyCard/HobbyCard.jsx)

```jsx
export function HobbyCard({ hobby }) {
  return <div className="hobby-card">...</div>;
}
```

**File:** [src/components/HobbyCard/HobbyCard.css](src/components/HobbyCard/HobbyCard.css)

```css
.hobby-card {
  border: 2px solid #222;
  border-radius: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #fff 0%, #f9f9f9 100%);
}

.hobby-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}
```

**Important:** Vite automatically loads CSS imports; no manual linking required.

---

### 6. **Reorder Sections** (Stage 3-4)

**File:** [src/pages/Profile.jsx](src/pages/Profile.jsx)

Sections render in the order they appear:

```jsx
return (
  <>
    <HeroSection profile={profile} />
    <QualitiesSection items={profile.qualities} />
    <HobbiesSection items={profile.hobbies} /> {/* Move here */}
    <PersonalTakesSection categories={profile.personalTakesCategories} />
    <LookingForSection lookingFor={profile.lookingFor} />
    <DealBreakersSection dealBreakers={profile.dealBreakers} />
    <WhatYoullGetSection items={profile.whatYoullGet} />
    <QuoteSection quote={profile.quote} />
  </>
);
```

---

### 7. **Add a New Section** (Stage 4-5)

**Steps:**

1. Create new section folder: `src/sections/MySection/`
2. Create `MySection.jsx` and `MySection.css`
3. Import the section data in `shawn.js` (Stage 1)
4. Import section component in `Profile.jsx` (Stage 3)
5. Render in Profile.jsx with data prop

---

### 8. **Modify Global Styles** (Stage 6)

**File:** [src/index.css](src/index.css)

Global CSS + Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: "Segoe UI", sans-serif;
  line-height: 1.6;
}
```

---

### 9. **Add Scroll-In Animations** (Stage 7)

Use the `useReveal` hook in any component:

```jsx
import { useReveal } from "../hooks/useReveal";

export function MyComponent() {
  const { ref, visible } = useReveal(200); // 200ms delay

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease-out",
      }}
    >
      Content here
    </div>
  );
}
```

**How it works:**

- Intersection Observer detects when element enters viewport
- Sets `visible` to true
- CSS transition animates the element

---

### 10. **Handle Modal Interactions** (Stage 7)

Use the `useTakesModal` hook:

```jsx
import { useTakesModal } from "../hooks/useTakesModal";

export function MyFeature() {
  const { isOpen, selectedTake, openModal, closeModal } = useTakesModal();

  return (
    <>
      <button onClick={() => openModal("My take")}>Click me</button>
      {isOpen && <TakesModal take={selectedTake} onClose={closeModal} />}
    </>
  );
}
```

**CSS Variables** (defined in `index.css`):

- Colors: `--sky-gold`, `--sky-amber`, `--sky-teal`, `--building-mid`, etc.
- Fonts: `--text-mono` (monospace), `--text-sans` (sans-serif)

Change variables globally for instant theme updates.

---

## 🎨 Color & Theme Customization

All colors are CSS variables in [src/index.css](../index.css):

```css
:root {
  /* Sky palette */
  --sky-gold: #f0c060;
  --sky-amber: #e8a44a;
  --sky-teal: #60c8d0;
  --sky-dusk: #8ba9b8;

  /* Building palette */
  --building-mid: #0d2a39;
  --building-dark: #0a1520;

  /* Background */
  --bg: #050a11;

  /* ... more variables */
}
```

Change any variable to instantly update the theme everywhere.

---

## 🔧 Development Workflow

### Start the dev server:

```bash
npm run dev
```

### Build for production:

```bash
npm run build
```

### Preview production build:

```bash
npm run preview
```

---

## ✅ Before Deploying

1. ✏️ Update [src/data/shawn.js](../data/shawn.js) with your actual profile
2. 📸 Add your photo to [src/assets/](../assets/) and update `photoUrl`
3. 🎨 Customize colors in [src/index.css](../index.css) if desired
4. 🧪 Test all sections on mobile and desktop
5. 📝 Proofread all text for typos and accuracy
6. 🚀 Run `npm run build` and deploy the `dist/` folder

---

## 📊 File Dependency Map

```
shawn.js (YOUR DATA)
    ↓
Profile.jsx (routes & renders)
    ↓
├── HeroSection.jsx
│   └── HeroPhoto.jsx
├── QualitiesSection.jsx
│   └── PixelWindows.jsx
├── PersonalTakesSection.jsx
│   └── PersonalTakesGrid.jsx
│       └── CategoryCard.jsx + TakesModal.jsx
├── HobbiesSection.jsx
│   └── HobbyCard.jsx (carousel)
├── LookingForSection.jsx
├── DealBreakersSection.jsx
├── WhatYoullGetSection.jsx
└── QuoteSection.jsx
```

---

## 🐛 Troubleshooting

**Q: I edited shawn.js but the page didn't update**

- A: The dev server should auto-refresh. If not, restart with `npm run dev`.

**Q: My styles aren't applying**

- A: Make sure you're editing the correct CSS file (check the co-located file path).
- A: Clear your browser cache (Ctrl+Shift+Del) and refresh.

**Q: Images aren't showing in hobbies**

- A: Verify the `imageUrl` is a valid HTTPS URL or a local path like `src/assets/image.jpg`.

**Q: Personal takes aren't appearing**

- A: Check [src/data/personalTakesCategories.js](../data/personalTakesCategories.js) — ensure the `takes` array isn't empty.

---

**Happy editing! 🎉**
