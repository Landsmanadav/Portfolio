"use client";
import "./CursorFollower.scss";
import useCanvasCursor from "../../customHooks/useCanvasCursor";

const CursorFollower = () => {
  useCanvasCursor();

  return (
    <canvas
      className="pointer-events-none fixed inset-0 cursor-follower2"
      id="canvas"
    />
  );
};

export default CursorFollower;
