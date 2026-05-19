/**
 * src/hooks/useReveal.js
 *
 * PIPELINE STAGE: 7 (Client-Side Interactivity)
 *
 * Hook Purpose: Detect when element enters viewport and trigger animations
 * - Uses Intersection Observer API for efficient scroll detection
 * - Returns ref and visible flag to control CSS animations
 * - Automatically cleanup and disconnect on unmount
 * - Fires only once per element (observer disconnects after first trigger)
 *
 * Usage:
 * const { ref, visible } = useReveal(200); // 200ms delay before firing
 * <div ref={ref} style={{ opacity: visible ? 1 : 0 }}>Content</div>
 *
 * Animation Flow:
 * 1. Element mounts with ref attached
 * 2. Intersection Observer watches for element entering viewport
 * 3. When 8% of element is visible, timer starts (delay param)
 * 4. After delay, visible flag becomes true
 * 5. CSS transition animates based on visible flag
 * 6. Observer disconnects (fires only once)
 */

import { useCallback, useEffect, useRef, useState } from "react";

export function useReveal(delay = 0) {
  // ── Flag: true when element should become visible (after scroll + delay) ──
  const [visible, setVisible] = useState(false);

  // ── Reference to active Intersection Observer instance ──
  const observerRef = useRef(null);

  // ── Cleanup: disconnect observer on unmount ──
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  /**
   * Callback ref: called when component mounts/updates.
   * Sets up Intersection Observer for this element.
   */
  const ref = useCallback(
    (node) => {
      // ── Cleanup previous observer ──
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node) return;

      // ── Create new Intersection Observer ──
      const observer = new IntersectionObserver(
        ([entry]) => {
          // ── Trigger when 8% of element enters viewport ──
          if (entry.isIntersecting) {
            // ── Wait for delay (e.g., stagger timing) then set visible ──
            setTimeout(() => setVisible(true), delay);
            // ── Disconnect after first trigger (fire only once) ──
            observer.disconnect();
          }
        },
        {
          // ── Trigger when 8% of element is visible ──
          threshold: 0.08,
          // ── Start checking slightly before element is in view (8% above bottom) ──
          rootMargin: "0px 0px -8% 0px",
        },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [delay],
  );

  return { ref, visible };
}
