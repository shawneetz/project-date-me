/**
 * src/sections/HobbiesSection.jsx
 *
 * PIPELINE STAGE: 4 (Section Rendering)
 *
 * Role: Display hobbies in an interactive carousel/slider
 * - Receives items array from Profile.jsx (profile.hobbies)
 * - Each hobby has: id, title, description, imageUrl, imageAlt
 * - Renders as centered carousel with prev/next navigation
 * - Supports keyboard, mouse, and touch gestures
 * - Infinite loop: wraps around when reaching end
 * - Responsive: centers current slide in viewport
 *
 * Data Flow:
 * Profile.jsx (profile.hobbies[])
 * → HobbiesSection props
 * → buildTrackSlides() (adds clones for infinite loop)
 * → Render HobbyCard components
 * → Navigation: prev/next buttons or swipe
 *
 * Carousel Logic:
 * - trackIndex: Current position in track (including clones)
 * - trackX: Pixel offset for centering current slide
 * - instant: Flag to skip animation when looping
 * - canLoop: Enable/disable nav if only 1 hobby
 */

import {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
} from "react";
import { motion, useInView } from "framer-motion";
import HobbyCard from "../../components/HobbyCard";
import {
  buildTrackSlides,
  getHobbyAccent,
  getInitialTrackIndex,
  getRealIndex,
} from "../../utils/hobbyCarousel";
import "./HobbiesSection.css";

export default function HobbiesSection({ items }) {
  // ── Prepare carousel track: original items + clones for infinite loop ──
  const trackSlides = useMemo(() => buildTrackSlides(items), [items]);

  // ── Current position in carousel (0-indexed, includes clones) ──
  const [trackIndex, setTrackIndex] = useState(() =>
    getInitialTrackIndex(items.length),
  );

  // ── Horizontal offset to center current slide in viewport ──
  const [trackX, setTrackX] = useState(0);

  // ── Skip CSS transition when wrapping around for seamless loop ──
  const [instant, setInstant] = useState(false);

  // ── Element refs for DOM manipulation and measurements ──
  const ref = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  // ── Track touch start/end for swipe detection ──
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  // ── Map trackIndex (with clones) back to real hobby index ──
  const realIndex = getRealIndex(trackIndex, items.length);

  // ── Only allow looping if there's more than 1 hobby ──
  const canLoop = items.length > 1;

  /**
   * Calculate how much to offset the carousel so current slide is centered.
   * Formula: (viewport width - slide width) / 2 - slide's left offset
   */
  const updateTrackPosition = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const slide = track.children[trackIndex];
    if (!slide) return;

    const viewportWidth = viewport.offsetWidth;
    const slideWidth = slide.offsetWidth;
    const slideOffset = slide.offsetLeft;
    setTrackX((viewportWidth - slideWidth) / 2 - slideOffset);
  }, [trackIndex]);

  // ── Recalculate position when track is built or trackIndex changes ──
  useLayoutEffect(() => {
    updateTrackPosition();
  }, [updateTrackPosition, trackSlides.length]);

  // ── If instant flag is set, position immediately then reset flag ──
  useLayoutEffect(() => {
    if (!instant) return undefined;

    updateTrackPosition();
    const frame = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(frame);
  }, [instant, trackIndex, updateTrackPosition]);

  // ── Recalculate on viewport resize (responsive) ──
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const ro = new ResizeObserver(() => updateTrackPosition());
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [updateTrackPosition]);

  // ── Navigation: move to next slide ──
  const goToNext = () => {
    if (!canLoop) return;
    setInstant(false);
    setTrackIndex((prev) => prev + 1);
  };

  // ── Navigation: move to previous slide ──
  const goToPrev = () => {
    if (!canLoop) return;
    setInstant(false);
    setTrackIndex((prev) => prev - 1);
  };

  // ── Navigation: jump to specific slide (for dot indicators) ──
  const goToSlide = (index) => {
    if (!canLoop) return;
    setInstant(false);
    setTrackIndex(index + 1);
  };

  /**
   * Handle CSS transition end for infinite loop wrapping.
   * When reaching the cloned last item, jump to real last item without animation.
   * When reaching the cloned first item, jump to real first item without animation.
   */
  const handleTransitionEnd = (e) => {
    if (e.target !== trackRef.current || e.propertyName !== "transform") return;
    if (!canLoop) return;

    if (trackIndex === items.length + 1) {
      setInstant(true);
      setTrackIndex(1);
    } else if (trackIndex === 0) {
      setInstant(true);
      setTrackIndex(items.length);
    }
  };

  // ── Touch gesture: record initial touch point ──
  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  // ── Touch gesture: detect swipe direction and navigate ──
  const handleTouchEnd = (e) => {
    touchEnd.current = e.changedTouches[0].clientX;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50) goToNext(); // Swipe left → next
    if (distance < -50) goToPrev(); // Swipe right → previous
  };

  return (
    <motion.section
      id="hobbies"
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="section"
    >
      <div className="section-label">Hobbies</div>

      {/* Main carousel container */}
      <div className="hobbies-carousel">
        <div className="hobbies-carousel-stage">
          {/* Previous slide button */}
          <button
            type="button"
            onClick={goToPrev}
            className="carousel-nav-btn carousel-nav-prev"
            aria-label="Previous hobby"
            disabled={!canLoop}
          >
            ◄
          </button>

          {/* 
            Viewport: visible area of carousel.
            Touch events attached here for gesture detection.
          */}
          <div
            ref={viewportRef}
            className="hobbies-carousel-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-live="polite"
          >
            {/* 
              Track: slides container that moves to center current slide.
              - transform: translate3d() centers the current slide
              - instant class: skips CSS transition for loop wrapping
              - transitionEnd: detects when to wrap around
            */}
            <div
              ref={trackRef}
              className={`hobbies-carousel-track${instant ? " is-instant" : ""}`}
              style={{ transform: `translate3d(${trackX}px, 0, 0)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {trackSlides.map((slide, index) => {
                const description = slide.item.description ?? slide.item.body;
                const isActive = index === trackIndex;
                const isAdjacent = Math.abs(index - trackIndex) === 1;

                return (
                  <div
                    key={slide.key}
                    className={[
                      "hobbies-carousel-slide",
                      isActive ? "is-active" : "",
                      isAdjacent ? "is-adjacent" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ "--hobby-accent": slide.accent }}
                    aria-hidden={!isActive}
                  >
                    <HobbyCard
                      title={slide.item.title}
                      description={description}
                      imageUrl={slide.item.imageUrl}
                      imageAlt={slide.item.imageAlt}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={goToNext}
            className="carousel-nav-btn carousel-nav-next"
            aria-label="Next hobby"
            disabled={!canLoop}
          >
            ►
          </button>
        </div>

        <div className="carousel-controls">
          <div className="carousel-dots">
            {items.map((hobby, index) => (
              <button
                key={hobby.id ?? index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`carousel-dot ${index === realIndex ? "active" : ""}`}
                style={{ "--hobby-accent": getHobbyAccent(index) }}
                aria-label={`Go to hobby ${index + 1}`}
                aria-current={index === realIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        <div className="carousel-counter">
          {realIndex + 1} / {items.length}
        </div>
      </div>
    </motion.section>
  );
}
