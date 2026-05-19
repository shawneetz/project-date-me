/**
 * src/hooks/useTakesModal.js
 *
 * PIPELINE STAGE: 7 (Client-Side Interactivity)
 *
 * Hook Purpose: Manage modal accessibility and focus behavior
 * - Handles keyboard interactions (ESC to close)
 * - Manages focus trap (focus on close button when modal opens)
 * - Disables body scroll when modal is open
 * - Restores focus to trigger element when modal closes
 *
 * Usage:
 * const { titleId, closeRef } = useTakesModal(isOpen, onClose);
 * <div role="dialog" aria-labelledby={titleId}>
 *   <button ref={closeRef} onClick={onClose}>Close</button>
 * </div>
 *
 * Accessibility Features:
 * - ESC key closes modal
 * - Focus trap: focus shifts to close button on open
 * - Body overflow hidden while modal open
 * - Focus restored to previous element on close
 */

import { useCallback, useEffect, useId, useRef } from "react";

export function useTakesModal(isOpen, onClose) {
  // ── Unique ID for aria-labelledby accessibility ──
  const titleId = useId();

  // ── Reference to close button (focused when modal opens) ──
  const closeRef = useRef(null);

  // ── Track element that was focused before modal opened ──
  const previousFocus = useRef(null);

  /**
   * Handle keyboard events (specifically ESC key to close).
   * Memoized with onClose as dependency.
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  /**
   * Setup modal behavior when isOpen changes:
   * - Store current focus (to restore later)
   * - Hide body scroll
   * - Attach keyboard listener
   * - Focus close button
   * - Cleanup: restore scroll, remove listener, restore focus
   */
  useEffect(() => {
    if (!isOpen) return;

    // ── Save the element that currently has focus ──
    previousFocus.current = document.activeElement;

    // ── Hide page scroll while modal is open ──
    document.body.style.overflow = "hidden";

    // ── Listen for ESC key ──
    window.addEventListener("keydown", handleKeyDown);

    // ── Focus close button using requestAnimationFrame to ensure it's rendered ──
    const timer = requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    // ── Cleanup function: runs on unmount or when isOpen becomes false ──
    return () => {
      cancelAnimationFrame(timer);
      // ── Restore page scroll ──
      document.body.style.overflow = "";
      // ── Remove ESC listener ──
      window.removeEventListener("keydown", handleKeyDown);
      // ── Restore focus to element that was focused before modal ──
      if (previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus();
      }
    };
  }, [isOpen, handleKeyDown]);

  return { titleId, closeRef };
}
