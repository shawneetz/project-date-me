export default function ExpandableCard({
  icon,
  title,
  preview,
  body,
  isOpen,
  onToggle,
  accentIndex = 0,
}) {
  return (
    <article
      className={`card card--accent-${(accentIndex % 6) + 1}${isOpen ? " card--open" : ""}`}
    >
      <button
        type="button"
        className="card-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="card-trigger-left">
          <div className="card-icon">{icon}</div>
          <div>
            <div className="card-title">{title}</div>
            <div className="card-preview">{preview}</div>
          </div>
        </div>
        <div className={`card-chevron${isOpen ? " open" : ""}`}>⌄</div>
      </button>
      <div className={`card-body${isOpen ? " open" : ""}`}>
        <div className="card-body-inner">
          <p>{body}</p>
        </div>
      </div>
    </article>
  );
}
