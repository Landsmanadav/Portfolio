import { Outlet } from "react-router-dom";
import CursorFollower from "../components/Shared/CursorFollower";
import SeaweedCanvasBg from "../components/Shared/SeaweedCanvasBg";
import { useRef } from "react";
import { useUi } from "../context/UiContext";

export default function Layout() {
  const { showCursor, showBackground } = useUi();
  console.log(showBackground);
  return (
    <div className="layout">
      {showBackground && <SeaweedCanvasBg />}
      {showCursor && <CursorFollower />}
      <div className="page-content">
        <Outlet />
      </div>
      {/* וכאן Footer בעתיד */}
    </div>
  );
}
