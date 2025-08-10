import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getBouncyText } from "../../utils/Helper";

function SlideToEnter({
  onUnlock,
  delay = 500,
}: {
  onUnlock: () => void;
  delay?: number;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!dragging) return;
    const ctrl = new AbortController();
    const { signal } = ctrl;

    const slider = sliderRef.current!;
    const button = buttonRef.current!;
    const sliderRect = slider.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const maxOffset = sliderRect.width - buttonRect.width - 12;

    const onMove = (clientX: number) => {
      const newX = clientX - sliderRect.left - buttonRect.width / 2;
      const clamped = Math.max(0, Math.min(newX, maxOffset));
      setOffsetX(clamped);
      if (clamped >= maxOffset - 10) onUnlock();
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      onMove(e.touches[0].clientX);
      e.preventDefault();
    };

    const end = () => {
      setDragging(false);
      if (offsetX >= maxOffset - 10) onUnlock();
      else {
        let x = offsetX;
        const step = () => {
          x -= 5;
          if (x <= 0) return setOffsetX(0);
          setOffsetX(x);
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { signal });
    window.addEventListener("mouseup", end, { signal });
    window.addEventListener("touchmove", onTouchMove, {
      signal,
      passive: false,
    });
    window.addEventListener("touchend", end, { signal });

    return () => ctrl.abort();
  }, [dragging, offsetX, onUnlock]);

  if (!show) return null;

  return (
    <motion.div
      className="absolute bottom-[20%] left-0 w-full flex items-center z-[100]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div
        ref={sliderRef}
        className="
          relative h-[60px]
          w-[90%] mx-auto
          sm:w-[320px] sm:ms-[5%] sm:mx-0
          bg-transparent
          rounded-[50px]
          shadow-[0_0_15px_rgba(255,255,255,0.1)]
          overflow-hidden
          flex items-center
          px-[8px]
          box-border
          transition-colors duration-100 ease-linear
        "
      >
        <motion.div
          className="ms-4 absolute w-full text-center pointer-events-none"
          // transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        >
          {getBouncyText("SLIDE TO ENTER ➔")}
        </motion.div>

        <div
          className="absolute top-[10px] bottom-[10px] left-0 bg-background z-[20] rounded-[30px]"
          style={{
            width: offsetX + (buttonRef.current?.clientWidth ?? 0) + "px",
          }}
        />

        <div
          ref={buttonRef}
          className="
            absolute top-[5px] left-0
            w-[50px] h-[50px]
            bg-white
            rounded-full
            shadow-lg
            cursor-grab
            transition-colors duration-200
            z-[30]
            will-change-transform
            touch-none
          "
          style={{ transform: `translateX(${offsetX}px)` }}
          onMouseDown={() => setDragging(true)}
          onTouchStart={() => setDragging(true)}
        />
      </div>
    </motion.div>
  );
}

export default SlideToEnter;
