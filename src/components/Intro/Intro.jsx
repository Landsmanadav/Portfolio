import { useCallback, useState } from "react";
import SlideToEnter from "./SlideToEnter";
import { useNavigate } from "react-router-dom";
import "./Intro.scss";
import IntroHeader from "./IntroHeader";

function Intro() {
  const navigate = useNavigate();

  const [isExiting, setIsExiting] = useState(false);

  const handleUnlock = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      console.log("exit");
    }, 600);
  }, [navigate]);

  return (
    <div className={`intro-wrapper ${isExiting ? "exit" : ""}`}>
      <IntroHeader />
      <SlideToEnter onUnlock={handleUnlock} />
    </div>
  );
}
export default Intro;
