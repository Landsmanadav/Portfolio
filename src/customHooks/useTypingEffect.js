import { useEffect, useState, useRef } from "react";

export function useTypingEffect(
  lines,
  typingSpeed = 50,
  pauseBetweenLines = 500
) {
  const [typedLines, setTypedLines] = useState(() => lines.map(() => ""));
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef(null);

  // לשמור את המערך של שורות מההרצה הקודמת
  const prevLines = useRef(lines);

  // אפס מלא ברגע שמקבלים מערך שורות חדש
  useEffect(() => {
    if (prevLines.current !== lines) {
      setTypedLines(lines.map(() => ""));
      setCurrentLineIndex(0);
      setCharIndex(0);
      setIsTyping(true);
      prevLines.current = lines;
    }
  }, [lines]);

  // אפקט הטיפוס עצמו
  useEffect(() => {
    // אם עברנו את כל השורות, נפסיק לטייב
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      const line = lines[currentLineIndex];

      if (charIndex < line.length) {
        // עדכון תו נוסף בשורה הנוכחית
        setTypedLines((prev) => {
          const next = [...prev];
          next[currentLineIndex] = line.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((i) => i + 1);
      } else {
        // סיימנו שורה – נעבור לשורה הבאה אחרי ההפסקה
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
