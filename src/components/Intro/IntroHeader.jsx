import { useEffect, useState, useRef } from "react";
import "./IntroHeader.scss";
import { useTypingEffect } from "../../customHooks/useTypingEffect";

const lines = [
  "Hey, I'm Nadav Landesman.",
  "React + Automation Enthusiast.",
  "Full Stack Developer with a passion for smooth UI and smart flows.",
  "Turning ideas into interactive, high-performing user experiences.",
];

export default function IntroHeader() {
  const { typedLines, currentLineIndex, isTyping } = useTypingEffect(
    lines,
    50,
    500
  );

  return (
    <div className="intro-header">
      {typedLines.map((line, idx) => (
        <h2 key={idx} className="typed-line">
          {line}
          {idx === currentLineIndex && isTyping && (
            <span className="cursor">|</span>
          )}
        </h2>
      ))}
    </div>
  );
}
