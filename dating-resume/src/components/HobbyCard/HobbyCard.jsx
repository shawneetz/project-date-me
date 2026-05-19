import "./HobbyCard.css";

/**
 * HobbyCard
 * Purpose: Display hobby card with image, title, and truncated description (for carousel)
 *
 * Pipeline:
 * Props (title, description, imageUrl, imageAlt)
 *   -> Call truncateHobbyDescription(description)
 *   -> Render media section (image OR placeholder gradient)
 *   -> Render body (title + truncated text)
 */
import { truncateHobbyDescription } from "../../utils/hobbyCard";

export default function HobbyCard({ title, description, imageUrl, imageAlt }) {
  const text = truncateHobbyDescription(description);

  return (
    <article className="hobby-card">
      <div className="hobby-card-media">
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt || title} loading="lazy" />
        ) : (
          <div className="hobby-card-placeholder" aria-hidden="true" />
        )}
      </div>
      <div className="hobby-card-body">
        <h3 className="hobby-card-title">{title}</h3>
        <p className="hobby-card-description">{text}</p>
      </div>
    </article>
  );
}
