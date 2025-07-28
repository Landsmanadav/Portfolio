import { useEffect, useState, useRef } from "react";

export function useTypingEffect(
  lines: string[],
  typingSpeed = 50,
  pauseBetweenLines = 500
) {
  const [typedLines, setTypedLines] = useState(() => lines.map(() => ""));
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // reset all if lines array changes
  useEffect(() => {
    setTypedLines(lines.map(() => ""));
    setCurrentLineIndex(0);
    setCharIndex(0);
    setIsTyping(true);
  }, [lines.join(" ")]); // אם אתה מקבל כל פעם array חדש בזיכרון, זו הדרך

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }
    setIsTyping(true);

    const line = lines[currentLineIndex];
    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setTypedLines((prev) => {
          const next = [...prev];
          next[currentLineIndex] = line.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex(charIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      // Pause before next line
      const pauseTimeout = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
        setCharIndex(0);
      }, pauseBetweenLines);

      return () => clearTimeout(pauseTimeout);
    }
  }, [currentLineIndex, charIndex, lines, typingSpeed, pauseBetweenLines]);

  return { typedLines, currentLineIndex, isTyping };
}
