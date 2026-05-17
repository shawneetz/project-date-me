import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ExpandableCard from "./ExpandableCard";
import { getIcon } from "./iconMap";

export default function HobbyCarousel({ items }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const goToNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
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
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const item = items[current];

  return (
    <motion.section
      id="hobbies"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="section"
    >
      <div className="section-label">Hobbies</div>

      {/* Carousel Container */}
      <div
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <ExpandableCard
            icon={getIcon(item.iconKey)}
            title={item.title}
            preview={item.preview}
            body={item.body}
          />
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="carousel-controls">
        <button
          onClick={goToPrev}
          className="carousel-nav-btn carousel-nav-prev"
          aria-label="Previous hobby"
        >
          ←
        </button>

        {/* Dots */}
        <div className="carousel-dots">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`carousel-dot ${index === current ? "active" : ""}`}
              aria-label={`Go to hobby ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="carousel-nav-btn carousel-nav-next"
          aria-label="Next hobby"
        >
          →
        </button>
      </div>

      {/* Slide Counter */}
      <div className="carousel-counter">
        {current + 1} / {items.length}
      </div>
    </motion.section>
  );
}
