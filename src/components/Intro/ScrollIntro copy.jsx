import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useTypingEffect } from "../../customHooks/useTypingEffect";
import "./ScrollIntro.scss";

export default function ScrollIntro({
  sections,
  onSectionChange,
  onTypingDone,
}) {
  const sectionHeight = window.innerHeight;

  // Motion for scroll position
  const scrollY = useMotionValue(0);
  const y = useTransform(scrollY, (v) => -v);

  // State
  const [currentSection, setCurrentSection] = useState(0);
  const [typedBuffers, setTypedBuffers] = useState(
    Array(sections.length).fill("")
  );
  const [reachedLast, setReachedLast] = useState(false);
  const [calledTypingDone, setCalledTypingDone] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Typing effect
  const activeLines = useMemo(
    () => [sections[currentSection]],
    [currentSection, sections]
  );
  const { typedLines } = useTypingEffect(activeLines, 50, 500);

  // Touch handling
  const touchStartY = useRef(0);
  function handleTouchStart(e) {
    touchStartY.current = e.touches[0].clientY;
  }
  function handleTouchEnd(e) {
    const delta = e.changedTouches[0].clientY - touchStartY.current;
    const threshold = 50;
    if (delta < -threshold) {
      handleWheel({ deltaY: 1, preventDefault: () => {} });
    } else if (delta > threshold) {
      handleWheel({ deltaY: -1, preventDefault: () => {} });
    }
  }

  // Central scroll handler
  function handleWheel(e) {
    // e.preventDefault?.();
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
  }

  // Buffer completed lines & detect last
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
      if (currentSection === sections.length - 1 && !calledTypingDone) {
        setReachedLast(true);
        onTypingDone?.();
        setCalledTypingDone(true);
      }
    }
    if (currentSection !== sections.length - 1 && calledTypingDone) {
      setCalledTypingDone(false);
    }
  }, [
    typedLines,
    currentSection,
    sections,
    typedBuffers,
    onTypingDone,
    calledTypingDone,
  ]);

  // Reset indicator on section change
  useEffect(() => {
    setIndicatorVisible(false);
  }, [currentSection]);

  // Show scroll-down indicator
  useEffect(() => {
    const ready = reachedLast || Boolean(typedBuffers[currentSection]);
    if (ready && currentSection < sections.length - 1) {
      const timer = setTimeout(() => setIndicatorVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [reachedLast, typedBuffers, currentSection, sections.length]);

  // Notify parent on each section change
  useEffect(() => {
    onSectionChange?.(currentSection);
  }, [currentSection, onSectionChange]);

  return (
    <div
      className="container"
      style={{ height: sectionHeight }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div className="inner" style={{ y }}>
        {sections.map((text, idx) => {
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
                  onClick={() => handleWheel({ deltaY: 1 })}
                  onTouchStart={() =>
                    handleWheel({ deltaY: 1, preventDefault: () => {} })
                  }
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
