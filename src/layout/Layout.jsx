import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import CursorFollower from "../components/Shared/CursorFollower";
import SeaweedCanvasBg from "../components/Shared/SeaweedCanvasBg";
import SmoothFollower from "@/components/Shared/SmoothFollower";
import { useUi } from "../context/UiContext";

export default function Layout() {
  const { showCursor, showBackground, cursorHover } = useUi();
  const location = useLocation();
  const isDark = document.documentElement.classList.contains("dark");
  const dotColor = isDark ? "#ffffff4d" : "#323232a6";

  return (
    <div className="layout relative min-h-screen">
      {/* רקע ים */}
      <div className={showBackground ? "visible" : "invisible"}>
        <SeaweedCanvasBg />
      </div>

      {/* עוקב עכבר מותאם */}
      <div className={showCursor ? "visible" : "invisible"}>
        <CursorFollower />
      </div>

      {/* נקודה חלקה */}
      <div style={{ display: cursorHover ? "unset" : "none" }}>
        <SmoothFollower color={cursorHover ? dotColor : "transparent"} />
      </div>

      {/* תוכן העמוד עם fade-in/fade-out */}
      <div className="page-content">
        <Outlet />
      </div>

      {/* Footer בעתיד */}
    </div>
  );
}
