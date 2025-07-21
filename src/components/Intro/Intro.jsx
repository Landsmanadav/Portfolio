// Intro.jsx
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SlideToEnter from "./SlideToEnter";
import ScrollIntro from "./ScrollIntro";
import "./Intro.scss";

export default function Intro() {
  const navigate = useNavigate();
  // מגדירים כאן את ה־sections בשביל שנוכל לחשב lastIndex דינמי
  const sections = [
    // Section 1
    `Welcome to my portfolio.\nScroll down for more content.`,

    // Section 2
    `Hey, I’m Nadav Landesman\n` +
      `a React & Automation enthusiast\n` +
      `dedicated to building dynamic user interfaces\n` +
      `and streamlined workflows.`,

    // Section 3
    `As a Full-Stack Developer, I architect robust back-ends with Node.js/C#\n` +
      `and craft sleek, responsive front-ends with React,\n` +
      `always prioritizing performance and maintainability.`,

    // Section 4
    `I thrive on smooth UI and intelligent automation:\n` +
      `from fluid Framer Motion transitions\n` +
      `to powerful n8n pipelines that eliminate manual tasks behind the scenes.`,

    // Section 5
    `Turning ideas into interactive,\n` +
      `high-performing experiences drives me.\n` +
      `If you’re ready to dive in, slide to enter.`,
  ];
  const lastIndex = sections.length - 1;

  const [currentSection, setCurrentSection] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [hasFinishedTypingOnce, setHasFinishedTypingOnce] = useState(false);
  const [hasTypedNow, setHasTypedNow] = useState(false);

  // נקבל מ־ScrollIntro התראה מתי ההקלדה בסקשן האחרון הסתיימה
  const handleTypingDone = useCallback(() => {
    setHasFinishedTypingOnce(true);
    setHasTypedNow(true); // להציג הפעם!
  }, []);

  // בכל פעם שמגיעים לסקשן אחרון - אם כבר היה typing פעם, להראות מיד
  React.useEffect(() => {
    if (currentSection === lastIndex && hasFinishedTypingOnce) {
      setHasTypedNow(true);
    }
  }, [currentSection, lastIndex, hasFinishedTypingOnce]);

  const handleSectionChange = useCallback(
    (sectionIndex) => {
      setCurrentSection(sectionIndex);
      // אם עברו אחורה – אל תציג מיד (רק אם כבר היה typing לפחות פעם אחת)
      if (sectionIndex !== lastIndex) setHasTypedNow(false);
    },
    [lastIndex]
  );

  const handleUnlock = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/homepage");
    }, 600);
  }, [navigate]);

  return (
    <div className={`intro-wrapper ${isExiting ? "exit" : ""}`}>
      <ScrollIntro
        sections={sections}
        onSectionChange={handleSectionChange}
        onTypingDone={
          currentSection === lastIndex && !hasFinishedTypingOnce
            ? handleTypingDone
            : undefined
        }
      />
      {currentSection === lastIndex && hasTypedNow && (
        <SlideToEnter onUnlock={handleUnlock} />
      )}
    </div>
  );
}
