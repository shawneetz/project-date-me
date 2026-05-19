import "./PixelWindows.css";

/* src/components/PixelWindow.jsx
   A retro pixel-art OS window card.
   No icons. Title bar + always-open content body.
*/

const ACCENT_COLORS = [
  {
    bar: "#1E5F6E",
    dot1: "#E05050",
    dot2: "#F0C060",
    dot3: "#88C070",
    text: "#60C8D0",
  },
  {
    bar: "#1E4E5A",
    dot1: "#E05050",
    dot2: "#F0C060",
    dot3: "#88C070",
    text: "#E8A44A",
  },
  {
    bar: "#184155",
    dot1: "#E05050",
    dot2: "#F0C060",
    dot3: "#88C070",
    text: "#88C070",
  },
  {
    bar: "#2D3250",
    dot1: "#E05050",
    dot2: "#F0C060",
    dot3: "#88C070",
    text: "#F06E6E",
  },
  {
    bar: "#144164",
    dot1: "#E05050",
    dot2: "#F0C060",
    dot3: "#88C070",
    text: "#FFD166",
  },
  {
    bar: "#1E5F6E",
    dot1: "#E05050",
    dot2: "#F0C060",
    dot3: "#88C070",
    text: "#80DCE4",
  },
];

export default function PixelWindow({ title, body, accentIndex = 0 }) {
  const accent = ACCENT_COLORS[accentIndex % ACCENT_COLORS.length];

  return (
    <div className="pxw">
      {/* Title bar */}
      <div className="pxw-bar" style={{ background: accent.bar }}>
        <div className="pxw-dots">
          <span className="pxw-dot" style={{ background: accent.dot1 }} />
          <span className="pxw-dot" style={{ background: accent.dot2 }} />
          <span className="pxw-dot" style={{ background: accent.dot3 }} />
        </div>
        <span className="pxw-title" style={{ color: accent.text }}>
          {title}
        </span>
        {/* Decorative resize grip (right side) */}
        <div className="pxw-grip" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Window body — always open */}
      <div className="pxw-body">
        <p className="pxw-content">{body}</p>
      </div>
    </div>
  );
}
