# Dating Resume - Developer's File Guide

A React + Vite project that creates a personalized dating profile website. This guide explains the architecture, file organization, and data flow for developers.

**Key Architecture Principle:** Single source of truth (`src/data/shawn.js`) → Edit once, updates everywhere via component props and React's reactivity.

## 🚀 Quick Start for Developers

```bash
npm install        # Install dependencies (React, Vite, Zustand, etc.)
npm run dev        # Start dev server with HMR (http://localhost:5173)
npm run build      # Minify & bundle for production
npm run lint       # ESLint code quality checks
npm run preview    # Locally preview production build
```

**Important Files to Know:**

- **Data:** [src/data/shawn.js](src/data/shawn.js) - Central profile state
- **Router:** [src/App.jsx](src/App.jsx) - Route definitions
- **Main Page:** [src/pages/Profile.jsx](src/pages/Profile.jsx) - Section orchestration
- **Styles:** [src/index.css](src/index.css) - Global + Tailwind imports

---

## 🏗️ Architecture Overview

### Data Flow Pipeline

```
1. PROFILE DATA (src/data/shawn.js)
   ↓
2. APP ROUTER (src/App.jsx)
   ├─ Route: / → Landing.jsx
   └─ Route: /:username → Profile.jsx
   ↓
3. SECTION ORCHESTRATION (src/pages/Profile.jsx)
   └─ Passes profile data as props to sections
   ↓
4. SECTIONS (src/sections/*)
   └─ Render UI components + nested components
   ↓
5. COMPONENTS (src/components/*)
   └─ Low-level UI elements (cards, grids, modals)
   ↓
6. STYLING
   ├─ Tailwind classes (inline, responsive)
   ├─ CSS modules (component + section level)
   └─ Custom CSS variables
   ↓
7. INTERACTION & ANIMATION
   ├─ useReveal hook (scroll-triggered animations)
   ├─ useTakesModal hook (modal state)
   └─ Browser events (click, scroll)
   ↓
8. BROWSER RENDERS
   └─ User sees styled, interactive profile
```

### Component Organization Strategy

**Co-location:** Related files live together

- Component JSX + its CSS file in same folder
- `index.js` exports for clean imports

**Folder Structure:**

```
src/
├── components/      # Reusable, low-level components
│   ├── HeroPhoto/   # Single concern (photo display)
│   ├── HobbyCard/
│   └── personal-takes/  # Feature-specific subfolder
│
├── sections/        # Page sections using multiple components
│   ├── HeroSection/
│   ├── QualitiesSection/
│   └── ...
│
├── pages/           # Route handlers
│   ├── Landing.jsx
│   └── Profile.jsx
│
├── data/            # State & configuration
│   ├── shawn.js     # MAIN DATA SOURCE
│   └── personalTakesCategories.js
│
├── hooks/           # Custom React hooks
│   ├── useReveal.js
│   └── useTakesModal.js
│
├── store/           # Global state (Zustand)
│   └── useProfileStore.js
│
├── utils/           # Helper functions
│   ├── hobbyCard.js
│   └── personalTakes.js
│
└── styles/          # Shared CSS (if needed)
    └── section-layout.css
```

### Root Configuration Files

#### `package.json`

**Purpose:** Project metadata and dependencies
**Edit When:** Installing new packages or changing scripts
**How to Edit:**

- Add new dependencies: `npm install package-name`
- Run scripts via: `npm run [script-name]` (e.g., `npm run dev`)

#### `vite.config.js`

**Purpose:** Vite bundler configuration
**Edit When:** Adding build optimizations or new plugins
**How to Edit:** Modify build settings, server config, or plugin options here

#### `eslint.config.js`

**Purpose:** Code style and quality rules
**Edit When:** Changing linting rules
**How to Edit:** Update ESLint rules for React hooks, imports, etc.

#### `index.html`

**Purpose:** HTML entry point (loads #root div)
**Edit When:** Changing page title, meta tags, or adding external scripts
**How to Edit:**

- Change `<title>` tag
- Add meta tags in `<head>`
- Link external fonts/resources

---

## 🎨 Source Code (`src/`)

### Core Entry Points

#### `main.jsx`

**Purpose:** Entry point - renders React app into #root div
**Edit When:** Never - this is the bootstrap file
**Key Imports:** Imports CSS files and App component

#### `App.jsx`

**Purpose:** Routes setup
**Current Routes:**

- `/` → Landing page
- `/edit` → Edit page (future feature)
- `/:username` → Public profile (e.g., `/shawn`)
  **Edit When:** Adding or changing page routes
  **How to Edit:**

```javascript
<Route path="/new-page" element={<NewPage />} />
```

#### `index.css`

**Purpose:** Global CSS and Tailwind directives
**Edit When:** Adding global styles or CSS variables
**How to Edit:** Add CSS rules or modify Tailwind imports

#### `App.css`

**Purpose:** App-level component styles
**Edit When:** Styling the main layout
**How to Edit:** Add CSS classes used in App.jsx

---

## 💾 Data Layer (`src/data/`)

### `shawn.js` ⭐ **PRIMARY FILE TO EDIT**

**Purpose:** Your entire resume/profile data - edit here and it updates everywhere!

**Structure:**

```javascript
export const shawnProfile = {
  username: "shawn", // URL slug
  name: "Shawn Alfred Padilla", // Full name
  heroGreeting: "Hello, I'm Shawn!", // Landing greeting
  mbti: "INTP", // Personality type
  sign: "Capricorn", // Zodiac sign
  tag: "CS Student", // Tagline
  photoUrl: "src/assets/shawn-pfp.jpg", // Profile photo
  photoCaption: "...", // Caption under photo
  funFact: "...", // Fun fact in hero

  qualities: [
    {
      id: "spontaneous",
      iconKey: "shootingStar", // See Icons.jsx for available keys
      title: "Spontaneous",
      preview: "...", // Short preview
      body: "...", // Full description
    },
    // ... more qualities
  ],

  personalTakesCategories, // Imported from personalTakesCategories.js

  hobbies: [
    {
      id: "manhwa",
      title: "Reading Manhwa / Manga",
      description: "...",
      imageUrl: "...", // Unsplash URLs work great
      imageAlt: "...",
    },
    // ... more hobbies
  ],

  lookingFor: {
    headline: "...",
    body: "...",
  },

  // Add dealBreakers if needed:
  dealBreakers: [
    "...", // String of things you DON'T want
  ],
};
```

**How to Edit:**

1. Update text fields directly (name, greeting, quotes, etc.)
2. Change photo URL: Update `photoUrl` (local or Unsplash)
3. Update icon: Change `iconKey` (see [Icons.jsx](#icons) for available icons)
4. Add/remove qualities, hobbies: Add/remove objects from the array
5. Changes propagate instantly in dev mode!

---

### `personalTakesCategories.js`

**Purpose:** Your personal takes/opinions organized by category

**Structure:**

```javascript
export const personalTakesCategories = [
  {
    id: "learning",
    title: "On Learning",
    iconKey: "learning", // Icon from Icons.jsx
    subcategories: [
      {
        id: "curiosity",
        title: "Curiosity",
        takes: ["Take 1 (max 140 characters)", "Take 2 (max 140 characters)"],
      },
      // ... more subcategories
    ],
  },
  // Categories: learning, relationships, lifestyle, dating, values, fun
];
```

**How to Edit:**

1. **Add a new take:** Add string to the `takes` array
2. **Edit a take:** Keep under 140 characters
3. **Add a subcategory:**
   ```javascript
   {
     id: "new-topic",
     title: "New Topic",
     takes: ["...", "..."],
   }
   ```
4. **Add a category:** Add new object at top level with `id`, `title`, `iconKey`, `subcategories`

---

## ⚙️ Store & State (`src/store/`)

#### `useProfileStore.js`

**Purpose:** Global state management (Zustand)
**Status:** Empty/ready for future use
**Edit When:** Need persistent global state
**How to Edit:**

```javascript
import { create } from "zustand";

export const useProfileStore = create((set) => ({
  // Define state and actions here
}));
```

---

## 🧩 Components (`src/components/`)

### Shared Components

#### `Icons.jsx` 📋 **Reference icon keys here**

**Purpose:** Icon definitions
**Available iconKeys:**

- `shootingStar` - For spontaneous
- `radio` - For listener
- `compass` - For straightforward
- `learning` - For learning takes
- `relationships` - For relationship takes
- And more...
  **Edit When:** Adding new icon sets
  **How to Edit:** Add new icon components and export them

#### `HeroPhoto.jsx`

**Purpose:** Displays profile photo with caption
**Edit When:** Changing photo styling
**Takes props:** `profile.photoUrl`, `profile.photoCaption`

#### `HobbyCard.jsx`

**Purpose:** Hobby card with image
**Edit When:** Changing hobby card design
**Takes props:** Hobby object from `shawn.js`

#### `SectionDots.jsx`

**Purpose:** Navigation dots showing page sections
**Edit When:** Changing dot styling/animation
**Auto-generated from:** Section IDs on page

#### `iconMap.jsx`

**Purpose:** Maps icon names to icon components
**Edit When:** Adding new icons
**How to Edit:** Add new mappings: `iconName: <Icon />`

### Personal Takes Components (`src/components/personal-takes/`)

#### `index.js`

**Purpose:** Re-exports for personal takes components
**Edit When:** Changing component exports

#### `PersonalTakesGrid.jsx`

**Purpose:** Grid of take categories
**Edit When:** Changing layout of categories
**Takes props:** `categories` from profile

#### `CategoryCard.jsx`

**Purpose:** Individual category card
**Edit When:** Styling category cards
**Interactive:** Click to expand subcategories

#### `SubcategoryPanel.jsx`

**Purpose:** Displays takes within a subcategory
**Edit When:** Changing how takes are displayed
**Props:** Takes array

#### `TakesModal.jsx`

**Purpose:** Modal for viewing full take
**Edit When:** Changing modal design
**Props:** `take`, `isOpen`, `onClose`

#### `categoryIcons.jsx`

**Purpose:** Icon mapping for take categories
**Edit When:** Changing category icon mappings

#### `useHobbies.js` (if exists)

**Purpose:** Custom hook for hobby data
**Edit When:** Adding hobby logic

---

## 🎯 Pages (`src/pages/`)

#### `Landing.jsx`

**Purpose:** Homepage - first thing users see
**Edit When:** Changing hero/intro section
**Displays:** Hero section, call-to-action
**How to Edit:** Modify greeting, tagline, or layout here

#### `Profile.jsx`

**Purpose:** User profile page (`:username` route)
**Edit When:** Changing which sections appear
**Displays:** All profile sections in order
**How to Edit:**

1. To add/remove sections: Add/remove `<SectionName />` components
2. To reorder sections: Reorder the `<>` component tags

#### `Edit.jsx`

**Purpose:** Profile editor (currently empty)
**Edit When:** Building edit functionality
**Future:** Will allow editing profile directly in browser

---

## 🎨 Styles (`src/styles/`)

#### `component.css`

**Purpose:** Component-level styles
**Edit When:** Styling shared components
**How to Edit:** Add/modify CSS classes

#### `sections/index.css`

**Purpose:** Imports all section styles
**Edit When:** Importing new section stylesheets

#### Section-specific CSS Files

**Purpose:** Styles for each section component

Files:

- `hero.css` - Hero section styling
- `hobbies.css` - Hobbies section styling
- `personal-takes.css` - Personal takes section styling
- `deal-breakers.css` - Deal breakers section styling
- `looking-for.css` - Looking for section styling
- `what-youll-get.css` - What you'll get section styling
- `quote.css` - Quote section styling
- `layout.css` - Layout utilities

**Edit When:** Changing section-specific styling
**How to Edit:** Update CSS classes, colors, animations

---

## 🪝 Hooks (`src/hooks/`)

#### `useReveal.js`

**Purpose:** Intersection Observer hook for scroll-in animations
**How It Works:**

```javascript
const { ref, visible } = useReveal(delay);
```

- `ref`: Attach to element to animate
- `visible`: Boolean - true when element enters viewport
- `delay`: Optional delay in milliseconds before triggering

**Edit When:** Changing scroll-in animation behavior
**How to Edit:** Modify threshold, rootMargin, or animation timing

#### `useTakesModal.js`

**Purpose:** State management for personal takes modal
**Usage:**

```javascript
const { isOpen, selectedTake, openModal, closeModal } = useTakesModal();
```

**Edit When:** Changing modal behavior

---

## 🗺️ Sections (`src/sections/`)

Each section is a self-contained component displaying part of the profile.

#### `HeroSection.jsx`

**Purpose:** Top section with greeting and photo
**Data from:** `profile.heroGreeting`, `profile.mbti`, `profile.sign`, `profile.tag`, `profile.funFact`
**Edit When:** Changing hero layout/animation
**How to Edit:** Modify text formatting, animation timing

#### `QualitiesSection.jsx`

**Purpose:** Displays personal qualities
**Data from:** `profile.qualities`
**Edit When:** Changing qualities layout
**How to Edit:** Modify styling or card layout

#### `HobbiesSection.jsx`

**Purpose:** Displays hobby cards with images
**Data from:** `profile.hobbies`
**Edit When:** Changing hobby card design
**How to Edit:** Modify grid layout, card styling

#### `PersonalTakesSection.jsx`

**Purpose:** Interactive personal takes grid
**Data from:** `profile.personalTakesCategories`
**Edit When:** Changing takes layout
**How to Edit:** Modify grid structure, styling

#### `LookingForSection.jsx`

**Purpose:** What you're looking for
**Data from:** `profile.lookingFor`
**Edit When:** Changing section layout
**How to Edit:** Modify styling, text formatting

#### `DealBreakersSection.jsx`

**Purpose:** Displays deal breakers (if `profile.dealBreakers` exists)
**Data from:** `profile.dealBreakers`
**Edit When:** Changing deal breakers layout
**How to Edit:** Modify styling, list formatting

#### `WhatYoullGetSection.jsx`

**Purpose:** Describes what you bring to a relationship
**Edit When:** Changing section layout

#### `QuoteSection.jsx`

**Purpose:** Featured quote/motto
**Edit When:** Changing quote styling
**How to Edit:** Modify text alignment, font size, styling

---

## 🛠️ Utilities (`src/utils/`)

#### `hobbyCard.js`

**Purpose:** Utility functions for hobby card logic
**Edit When:** Adding hobby-related helpers

#### `personalTakes.js`

**Purpose:** Utility functions for personal takes logic
**Edit When:** Adding take filtering/formatting logic

---

## 📊 Assets (`src/assets/`)

**Purpose:** Images, photos, etc.

**Current Assets:**

- `shawn-pfp.jpg` - Profile photo

**Edit When:** Adding new images
**How to Add:**

1. Save image to `src/assets/`
2. Reference in code: `import img from '../assets/filename.jpg'`
3. Or use URL string: `'src/assets/filename.jpg'`

---

## 🔄 Data Flow

```
shawn.js (profile data)
    ↓
App.jsx (routes)
    ↓
Profile.jsx (renders sections)
    ├─ HeroSection (displays name, photo, greeting)
    ├─ QualitiesSection (displays qualities array)
    ├─ HobbiesSection (displays hobbies array)
    ├─ PersonalTakesSection (displays categories)
    └─ LookingForSection (displays lookingFor object)
```

**Key Principle:** Edit `shawn.js` and all sections update automatically!

---

## 🎯 Common Editing Tasks

### Change Your Profile Name

**File:** `src/data/shawn.js`

```javascript
name: "Your Name Here",
```

### Change Your Photo

**File:** `src/data/shawn.js`

```javascript
photoUrl: "https://images.unsplash.com/photo-...", // URL or path
```

### Add a New Hobby

**File:** `src/data/shawn.js`

```javascript
hobbies: [
  // ... existing hobbies
  {
    id: "new-hobby",
    title: "New Hobby Title",
    description: "Description here",
    imageUrl: "https://...",
    imageAlt: "Alt text",
  },
];
```

### Add a New Quality

**File:** `src/data/shawn.js`

```javascript
qualities: [
  // ... existing qualities
  {
    id: "new-quality",
    iconKey: "shootingStar", // Pick from Icons.jsx
    title: "Quality Title",
    preview: "Short preview",
    body: "Longer description",
  },
];
```

### Add a Personal Take

**File:** `src/data/personalTakesCategories.js`
Find the subcategory and add to `takes` array:

```javascript
takes: [
  "Existing take",
  "Your new take (max 140 characters)", // Add here
];
```

### Change Section Order

**File:** `src/pages/Profile.jsx`
Reorder the section components:

```javascript
return (
  <>
    <HeroSection profile={profile} />
    <HobbiesSection profile={profile} /> {/* Move this up */}
    <QualitiesSection profile={profile} />
    {/* ... */}
  </>
);
```

### Customize Colors/Styling

**File:** `src/styles/` (various CSS files)
**or** Check `tailwind.config.js` for Tailwind theme customization

---

## 🚨 Important Notes

1. **Keep Takes Under 140 Characters** - They're designed to be punchy
2. **Icon Keys** - Make sure `iconKey` values exist in `src/components/Icons.jsx`
3. **Image URLs** - Use Unsplash or any public image URL
4. **React Rules** - Components must return JSX, props must be passed correctly
5. **Tailwind Classes** - Most styling uses Tailwind utility classes

---

## 📚 Technology Stack

- **React 19** - UI library
- **Vite** - Fast build tool
- **React Router** - Page routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management (optional)
- **ESLint** - Code quality

---

## 🐛 Troubleshooting

**Changes not showing?**

- Check browser console for errors
- Restart dev server: `npm run dev`
- Clear browser cache

**Image not loading?**

- Check `photoUrl` is correct
- Use full HTTPS URL or correct relative path
- Verify image file exists

**Styling broken?**

- Check CSS class names are correct
- Verify Tailwind is importing properly
- Check for CSS conflicts

---

## ✨ Tips

- Use [Unsplash](https://unsplash.com) for free hobby images
- Keep text authentic and conversational
- Test on mobile - many will view on phones
- Use line breaks for readability: `"Line 1\nLine 2"`
- Keep emoji use minimal - let design do the talking

---

**Last Updated:** May 2026
**Created for:** Easy editing and customization
