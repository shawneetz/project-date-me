export default function HobbyCard({ title, description, imageUrl, imageAlt }) {
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
        <p className="hobby-card-description">{description}</p>
      </div>
    </article>
  );
}
