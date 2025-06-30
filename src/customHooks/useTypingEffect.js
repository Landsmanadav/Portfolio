import { useEffect, useState, useRef } from "react";

export function useTypingEffect(
  lines,
  typingSpeed = 50,
  pauseBetweenLines = 500
) {
  const [typedLines, setTypedLines] = useState([""]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    intervalRef.current = setInterval(() => {
      const line = lines[currentLineIndex];
      if (charIndex < line.length) {
        setTypedLines((prev) => {
          const copy = [...prev];
          copy[currentLineIndex] =
            (copy[currentLineIndex] || "") + line[charIndex];
          return copy;
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
