import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import HobbyCard from "../components/HobbyCard";

function slideIndex(index, length) {
  return ((index % length) + length) % length;
}

export default function HobbiesSection({ items }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const goToNext = () => {
    setDirection(1);
    setCurrent((prev) => slideIndex(prev + 1, items.length));
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrent((prev) => slideIndex(prev - 1, items.length));
  };

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEnd.current = e.changedTouches[0].clientX;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50) goToNext();
    if (distance < -50) goToPrev();
  };

  const item = items[current];
  const description = item.description ?? item.body;

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 32 : -32,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir > 0 ? -32 : 32,
      opacity: 0,
    }),
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

      <div className="hobbies-carousel">
        <div
          className="hobbies-carousel-viewport"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="hobbies-carousel-slide"
              aria-live="polite"
            >
              <HobbyCard
                title={item.title}
                description={description}
                imageUrl={item.imageUrl}
                imageAlt={item.imageAlt}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="carousel-controls">
          <button
            type="button"
            onClick={goToPrev}
            className="carousel-nav-btn carousel-nav-prev"
            aria-label="Previous hobby"
            disabled={items.length <= 1}
          >
            ←
          </button>

          <div className="carousel-dots">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`carousel-dot ${index === current ? "active" : ""}`}
                aria-label={`Go to hobby ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goToNext}
            className="carousel-nav-btn carousel-nav-next"
            aria-label="Next hobby"
            disabled={items.length <= 1}
          >
            →
          </button>
        </div>

        <div className="carousel-counter">
          {current + 1} / {items.length}
        </div>
      </div>
    </motion.section>
  );
}
