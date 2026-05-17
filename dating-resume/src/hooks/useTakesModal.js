import { useCallback, useEffect, useId, useRef } from "react";

export function useTakesModal(isOpen, onClose) {
  const titleId = useId();
  const closeRef = useRef(null);
  const previousFocus = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    previousFocus.current = document.activeElement;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    const timer = requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(timer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus();
      }
    };
  }, [isOpen, handleKeyDown]);

  return { titleId, closeRef };
}
