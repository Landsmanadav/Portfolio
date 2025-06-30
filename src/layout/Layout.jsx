import { Outlet } from "react-router-dom";
import "./Layout.scss";
import CursorFollower from "../components/Shared/CursorFollower";

export default function Layout() {
  return (
    <div className="layout">
      <CursorFollower />
      <div className="page-content">
        <Outlet />
      </div>
      {/* וכאן Footer בעתיד */}
    </div>
  );
}
