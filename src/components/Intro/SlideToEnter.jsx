import { useRef, useState, useEffect } from "react";
import "./SlideToEnter.scss";
import { data } from "react-router-dom";
import { getBouncyText } from "../../assets/helper";

function SlideToEnter({ onUnlock }) {
  const sliderRef = useRef(null);
  const buttonRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);

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
      const successTreshold = 10;
      if (offsetX >= maxOffset - successTreshold) {
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
      const successTreshold = 10;
      if (offsetX >= maxOffset - successTreshold) {
        onUnlock();
      } else {
        animateBackToStart(offsetX);
      }
    }

    window.addEventListener("mousemove", onMouseMove, { signal });
    window.addEventListener("mouseup", onMouseUp, { signal });

    return () => {
      controller.abort();
    };
  }, [dragging, offsetX]);

  return (
    <div className="slider-container" ref={sliderRef}>
      <div className="slider-text-wrapper">
        <div className="slider-text">{getBouncyText("Slide to enter")}</div>
        <div
          className="text-mask"
          style={{
            width: `${offsetX + buttonRef.current?.clientWidth}px`,
          }}
        ></div>
      </div>
      <div
        className="slider-button"
        ref={buttonRef}
        onMouseDown={() => setDragging(true)}
        style={{ transform: `translateX(${offsetX}px)` }}
      />
    </div>
  );
}

export default SlideToEnter;
