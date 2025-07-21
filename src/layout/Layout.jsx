import { Outlet } from "react-router-dom";
import CursorFollower from "../components/Shared/CursorFollower";
import SeaweedCanvasBg from "../components/Shared/SeaweedCanvasBg";
import { useRef } from "react";

export default function Layout() {
  return (
    <div className="layout">
      <SeaweedCanvasBg />
      <CursorFollower />
      <div className="page-content">
        <Outlet />
      </div>
      {/* וכאן Footer בעתיד */}
    </div>
  );
}
