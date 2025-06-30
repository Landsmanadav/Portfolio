import React, { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTypingEffect } from "../../customHooks/useTypingEffect";
import "./ScrollIntro.scss";

export default function ScrollIntro({ sections, onSectionChange }) {
  const sectionHeight = window.innerHeight;

  // Motion for scroll position
  const scrollY = useMotionValue(0);
  const y = useTransform(scrollY, (v) => -v);

  // Current section index
  const [currentSection, setCurrentSection] = useState(0);

  // Buffer for completed lines
  const [typedBuffers, setTypedBuffers] = useState(
    Array(sections.length).fill("")
  );
  const [reachedLast, setReachedLast] = useState(false);

  // Indicator visibility for scroll-down
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  // Typing effect for the active section
  const activeLines = useMemo(
    () => [sections[currentSection]],
    [currentSection, sections]
  );
  const { typedLines } = useTypingEffect(activeLines, 50, 500);

  // When a line finishes typing, buffer it and detect last
  useEffect(() => {
    if (
      typedLines[0] === sections[currentSection] &&
      !typedBuffers[currentSection]
    ) {
      setTypedBuffers((prev) => {
        const next = [...prev];
        next[currentSection] = sections[currentSection];
        return next;
      });
      if (currentSection === sections.length - 1) {
        setReachedLast(true);
      }
    }
  }, [typedLines, currentSection, sections, typedBuffers]);

  // Reset indicator whenever we change section
  useEffect(() => {
    setIndicatorVisible(false);
  }, [currentSection]);

  // Show scroll-down indicator 0.5s after ready, except on last
  useEffect(() => {
    const ready = reachedLast || Boolean(typedBuffers[currentSection]);
    if (ready && currentSection < sections.length - 1) {
      const timer = setTimeout(() => setIndicatorVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [reachedLast, typedBuffers, currentSection, sections.length]);

  // Notify parent on every section change
  useEffect(() => {
    onSectionChange?.(currentSection);
  }, [currentSection, onSectionChange]);

  // Prevent double-scroll while animating
  const [isAnimating, setIsAnimating] = useState(false);
  const handleWheel = (e) => {
    e.preventDefault();
    if (isAnimating) return;

    const dir = e.deltaY > 0 ? 1 : -1;
    if (!reachedLast) {
      if (dir > 0 && !indicatorVisible) return;
      if (dir < 0) return;
    }

    const next = Math.max(
      0,
      Math.min(sections.length - 1, currentSection + dir)
    );
    if (next === currentSection) return;

    onSectionChange?.(next);
    setCurrentSection(next);
    setIsAnimating(true);

    animate(scrollY, next * sectionHeight, {
      type: "spring",
      stiffness: 100,
      damping: 20,
      onComplete: () => setIsAnimating(false),
    });
  };

  return (
    <div className="container" onWheel={handleWheel}>
      <motion.div className="inner" style={{ y }}>
        {sections.map((text, idx) => {
          // determine what to show: buffered, full, or typing
          let display = "";
          if (reachedLast) {
            display = sections[idx];
          } else if (typedBuffers[idx]) {
            display = typedBuffers[idx];
          } else if (idx === currentSection) {
            display = typedLines[0] || "";
          }

          const showIndicator =
            idx === currentSection &&
            indicatorVisible &&
            idx < sections.length - 1;

          return (
            <div
              key={idx}
              className="section"
              style={{ top: idx * sectionHeight }}
            >
              <motion.h1 className="title">
                {display.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </motion.h1>

              {showIndicator && (
                <motion.div
                  className="scroll-indicator"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  onClick={() => {
                    const next = currentSection + 1;
                    onSectionChange?.(next);
                    setCurrentSection(next);
                    animate(scrollY, next * sectionHeight, {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      onComplete: () => setIsAnimating(false),
                    });
                  }}
                >
                  SCROLL DOWN ↓
                </motion.div>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
