import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CursorFollower from "../components/Shared/CursorFollower";
import SeaweedCanvasBg from "../components/Shared/SeaweedCanvasBg";
import SmoothFollower from "@/components/Shared/SmoothFollower";
import { useUi } from "../context/UiContext";

const MemoSeaweed = React.memo(SeaweedCanvasBg);
const MemoCursorFollower = React.memo(CursorFollower);
const MemoSmoothFollower = React.memo(SmoothFollower);

export default function Layout() {
  const { showCursor, showBackground, cursorHover } = useUi();

  const isDark = document.documentElement.classList.contains("dark");
  const dotColor = isDark ? "#ffffff4d" : "#323232a6";
  return (
    <div className="layout relative min-h-screen">
      <div className={showBackground ? "visible" : "invisible"}>
        <MemoSeaweed />
      </div>

      <div className={showCursor ? "visible" : "invisible"}>
        <MemoCursorFollower />
      </div>

      <div style={{ display: cursorHover ? "unset" : "none" }}>
        <MemoSmoothFollower color={cursorHover ? dotColor : "transparent"} />
      </div>

      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
}
