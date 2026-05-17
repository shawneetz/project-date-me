import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import HobbyCard from "../components/HobbyCard";

export default function HobbiesSection({ items }) {
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
    if (distance > 50) goToNext();
    if (distance < -50) goToPrev();
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const item = items[current];
  const description = item.description ?? item.body;

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

      <div className="hobbies-carousel">
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
            className="carousel-slide"
          >
            <HobbyCard
              title={item.title}
              description={description}
              imageUrl={item.imageUrl}
              imageAlt={item.imageAlt}
            />
          </motion.div>
        </div>

        <div className="carousel-controls">
          <button
            type="button"
            onClick={goToPrev}
            className="carousel-nav-btn carousel-nav-prev"
            aria-label="Previous hobby"
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
