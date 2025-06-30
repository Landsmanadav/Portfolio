import { useEffect, useState, useRef } from "react";

export function useTypingEffect(
  lines,
  typingSpeed = 50,
  pauseBetweenLines = 500
) {
  const [typedLines, setTypedLines] = useState(lines.map(() => ""));
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef(null);

  // לזיהוי מתי קיבלת מערך חדש של שורות
  const prevLines = useRef(lines);

  useEffect(() => {
    if (prevLines.current !== lines) {
      // איפוס מלא
      setTypedLines(lines.map(() => ""));
      setCurrentLineIndex(0);
      setCharIndex(0);
      setIsTyping(true);
      prevLines.current = lines;

      // *זריקת תו ראשון מידית* כדי לחתוך את ההשהיה
      if (lines[0]?.length) {
        setTypedLines([lines[0][0]]);
        setCharIndex(1);
      }
    }
  }, [lines]);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      const line = lines[currentLineIndex];
      if (charIndex < line.length) {
        setTypedLines((prev) => {
          const next = [...prev];
          next[currentLineIndex] = line.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((i) => i + 1);
      } else {
        clearInterval(intervalRef.current);
        setTimeout(() => {
          setTypedLines((prev) => [...prev, ""]);
          setCurrentLineIndex((i) => i + 1);
          setCharIndex(0);
        }, pauseBetweenLines);
      }
    }, typingSpeed);

    return () => clearInterval(intervalRef.current);
  }, [currentLineIndex, charIndex, lines, typingSpeed, pauseBetweenLines]);

  return { typedLines, currentLineIndex, isTyping };
}
