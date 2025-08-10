import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { useTypingContext } from "@/context/TypingContext";
const sections = ["home", "about", "projects", "cv"];
export default function HomePageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollLock = useRef(false);

  const idx = sections.findIndex((key) =>
    location.pathname.endsWith(`/${key}`)
  );
  const { isTypingContext } = useTypingContext();

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (isTypingContext) return;
      if (scrollLock.current) return;
      scrollLock.current = true;
      setTimeout(() => {
        scrollLock.current = false;
      }, 600);

      let next = idx + (e.deltaY > 0 ? 1 : -1);
      if (next < 0 || next >= sections.length) return;
      navigate(`/${sections[next]}`);
    },
    [idx, navigate, isTypingContext]
  );
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div
        className="flex-1 overflow-hidden"
        tabIndex={0}
        onWheel={handleWheel}
        style={{ outline: "none" }}
      >
        <motion.section
        // key={location.pathname}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        // transition={{ duration: 1 }}
        >
          <Outlet />
        </motion.section>
      </div>
    </div>
  );
}
