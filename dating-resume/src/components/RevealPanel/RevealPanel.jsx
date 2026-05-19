import { useReveal } from "../../hooks/useReveal";

export default function RevealPanel({ delay = 0, children }) {
  const { ref, visible } = useReveal(delay);

  return (
    <div
      ref={ref}
      className={`profile-panel reveal${visible ? " visible" : ""}`}
    >
      {children}
    </div>
  );
}
