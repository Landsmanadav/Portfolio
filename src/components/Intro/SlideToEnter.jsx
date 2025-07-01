import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./SlideToEnter.scss";
import { getBouncyText } from "../../utils/helper";

function SlideToEnter({ onUnlock, delay = 500 }) {
  const sliderRef = useRef(null);
  const buttonRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [show, setShow] = useState(false);

  // Timeout before showing the component
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!dragging) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const slider = sliderRef.current;
    const button = buttonRef.current;
    if (!slider || !button) return;

    const sliderRect = slider.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const maxOffset = sliderRect.width - buttonRect.width - 12;

    function onMouseMove(e) {
      const newX = e.clientX - sliderRect.left - buttonRect.width / 2;
      const clampedX = Math.max(0, Math.min(newX, maxOffset));
      setOffsetX(clampedX);

      if (clampedX >= maxOffset - 10) {
        onUnlock();
      }
    }

    function animateBackToStart(currentX) {
      function step() {
        currentX -= 5;
        if (currentX <= 0) {
          setOffsetX(0);
          return;
        }
        setOffsetX(currentX);
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function onMouseUp() {
      setDragging(false);
      if (offsetX >= maxOffset - 10) {
        onUnlock();
      } else {
        animateBackToStart(offsetX);
      }
    }

    window.addEventListener("mousemove", onMouseMove, { signal });
    window.addEventListener("mouseup", onMouseUp, { signal });

    return () => controller.abort();
  }, [dragging, offsetX, onUnlock]);

  // *** זה החלק החדש! ***
  if (!show) return null;

  return (
    <motion.div
      className="slider-wrapper"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        position: "absolute",
        bottom: "20%",
        // left: "5%",
        width: "100%",
        zIndex: 100,
        minHeight: 60,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="slider-container" ref={sliderRef}>
        <div className="slider-text-wrapper">
          <motion.div
            className="slider-text"
            animate={{ y: [0, 0, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          >
            {getBouncyText("SLIDE TO ENTER ➔")}
          </motion.div>
          <div
            className="text-mask"
            style={{
              width: `${offsetX + (buttonRef.current?.clientWidth || 0)}px`,
            }}
          />
        </div>

        <div
          className="slider-button"
          ref={buttonRef}
          onMouseDown={() => setDragging(true)}
          onTouchStart={() => setDragging(true)}
          style={{ transform: `translateX(${offsetX}px)` }}
        />
      </div>
    </motion.div>
  );
}

export default SlideToEnter;
