import Section from "./Section";
import { useState, useRef, useCallback } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { INTRO_SECTIONS } from "@/utils/TextHelper";
import SlideToEnter from "./SlideToEnter";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const sections = INTRO_SECTIONS;
  const [currentSection, setCurrentSection] = useState(0);
  const scrollY = useMotionValue(0);
  const isAnimating = useRef(false);
  const [showScroll, setShowScroll] = useState(false);
  const [visitedLastSection, setVisitedLastSection] = useState(false);
  const navigate = useNavigate();

  const onUnlock = useCallback(() => {
    navigate("/home", { state: { fromIntro: true } });
  }, [navigate]);

  const handleTypingEnd = useCallback(() => {
    setShowScroll(true);
    if (currentSection === sections.length - 1 && !visitedLastSection) {
      setVisitedLastSection(true);
    }
  }, [currentSection, sections.length, visitedLastSection]);

  const moveSection = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating.current || !showScroll) return;
      const next = Math.max(
        0,
        Math.min(sections.length - 1, currentSection + dir)
      );
      if (next === currentSection) return;
      isAnimating.current = true;
      setShowScroll(false);
      // אם הגענו לסקשן האחרון בפעם הראשונה
      if (next === sections.length && !visitedLastSection) {
        setVisitedLastSection(true);
      }
      setCurrentSection(next);
      animate(scrollY, -window.innerHeight * next, {
        type: "spring",
        stiffness: 100,
        damping: 20,
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    },
    [currentSection, sections.length, scrollY, showScroll, visitedLastSection]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => moveSection(e.deltaY > 0 ? 1 : -1),
    [moveSection]
  );
  const touchStartYRef = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current == null) return;
    const dy = e.changedTouches[0].clientY - touchStartYRef.current;
    const threshold = 50;
    if (dy < -threshold) moveSection(1);
    else if (dy > threshold) moveSection(-1);
    touchStartYRef.current = null;
  };

  const handleScrollClick = useCallback(() => moveSection(1), [moveSection]);

  return (
    <div
      className="h-screen overflow-hidden relative"
      onWheel={handleWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <motion.div style={{ y: scrollY }} className="flex flex-col">
        {sections.map((lines, idx) => (
          <div key={idx} className="h-screen w-full relative">
            {idx === currentSection && (
              <>
                <Section
                  lines={lines}
                  onTypingEnd={handleTypingEnd}
                  instantShow={visitedLastSection}
                />

                {showScroll && idx !== sections.length - 1 && (
                  <motion.div
                    className="absolute bottom-0 ms-8 mb-20 cursor-pointer select-none"
                    animate={{ y: [0, -7, 0] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    onClick={handleScrollClick}
                  >
                    SCROLL DOWN ↓
                  </motion.div>
                )}

                {showScroll && idx === sections.length - 1 && (
                  <SlideToEnter onUnlock={onUnlock} />
                )}
              </>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
