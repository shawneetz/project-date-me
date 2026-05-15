// src/App.jsx
// Sets up the routes:
// /         → Landing page
// /:username → Public profile (e.g. /shawn)
// /edit     → Editor (future)

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/edit" element={<Edit />} />
        {/* :username must come last so it doesn't catch /edit */}
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
