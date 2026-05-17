import { useState } from "react";

export default function ExpandableCard({ icon, title, preview, body }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card">
      <button
        type="button"
        className="card-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
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
    </div>
  );
}
