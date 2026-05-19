import "./HeroPhoto.css";

/**
 * HeroPhoto
 * Purpose: Display profile photo or placeholder fallback in hero section
 *
 * Pipeline:
 * Props (profile: { name, photoUrl })
 *   -> Check if photoUrl exists
 *   -> YES: Render <img> with name as alt text
 *   -> NO: Render placeholder div with "[photo here]" text
 */
export default function HeroPhoto({ profile }) {
  const { name, photoUrl } = profile;

  return (
    <div className="hero-photo-wrap">
      <div className="hero-photo">
        {photoUrl ? (
          <img src={photoUrl} alt={name} />
        ) : (
          <div className="hero-photo-placeholder">
            [ photo
            <br />
            here ]
          </div>
        )}
      </div>
    </div>
  );
}
