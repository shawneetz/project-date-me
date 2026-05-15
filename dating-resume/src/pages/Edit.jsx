// src/pages/Edit.jsx
// Placeholder for the editor page.
// This is where the user would fill in their own resume data.
// You can build this out later — for now it just shows a coming soon message.

import { Link } from "react-router-dom";

export default function Edit() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <p className="text-neutral-600 text-sm mb-4">Editor coming soon.</p>
      <Link
        to="/"
        className="text-pink-500 text-sm underline underline-offset-2"
      >
        ← Back home
      </Link>
    </div>
  );
}
