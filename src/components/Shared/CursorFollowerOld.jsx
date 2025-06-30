import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./CursorFollower.scss";

export default function CursorFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="cursor-follower"
      animate={{
        x: pos.x - 10,
        y: pos.y - 10,
      }}
      transition={{
        type: "tween",
        stiffness: 200,
        damping: 20,
      }}
    />
  );
}
