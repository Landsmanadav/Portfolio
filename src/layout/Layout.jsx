import { Outlet } from "react-router-dom";
import CursorFollower from "../components/Shared/CursorFollower";
import SeaweedCanvasBg from "../components/Shared/SeaweedCanvasBg";
import { useEffect, useRef } from "react";
import { useUi } from "../context/UiContext";
import SmoothFollower from "@/components/Shared/SmoothFollower";

export default function Layout() {
  const { showCursor, setShowCursor, showBackground, cursorHover } = useUi();

  return (
    <div className="layout">
      <div style={{ visibility: showBackground ? "unset" : "hidden" }}>
        <SeaweedCanvasBg />
      </div>
      <div style={{ visibility: showCursor ? "unset" : "hidden" }}>
        <CursorFollower />
      </div>
      <div style={{ visibility: cursorHover ? "unset" : "hidden" }}>
        <SmoothFollower />
      </div>

      <div className="page-content">
        <Outlet />
      </div>
      {/* וכאן Footer בעתיד */}
    </div>
  );
}
