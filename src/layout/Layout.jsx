import { Outlet } from "react-router-dom";
import CursorFollower from "../components/Shared/CursorFollower";
import SeaweedCanvasBg from "../components/Shared/SeaweedCanvasBg";
import { useRef } from "react";
import { useUi } from "../context/UiContext";

export default function Layout() {
  const { showCursor, showBackground } = useUi();
  return (
    <div className="layout">
      <div style={{ visibility: showBackground ? "unset" : "hidden" }}>
        <SeaweedCanvasBg />
      </div>
      <div style={{ visibility: showCursor ? "unset" : "hidden" }}>
        <CursorFollower />
      </div>

      <div className="page-content">
        <Outlet />
      </div>
      {/* וכאן Footer בעתיד */}
    </div>
  );
}
