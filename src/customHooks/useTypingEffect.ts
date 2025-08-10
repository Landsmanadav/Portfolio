import { useEffect, useState } from "react";

const typedCache = new Set<string>();

export function useTypingEffect(
  lines: string[],
  typingSpeed = 50,
  pauseBetweenLines = 500
) {
  const [typedLines, setTypedLines] = useState(() =>
    lines.map((l) => (typedCache.has(l) ? l : ""))
  );
  const [currentLineIndex, setCurrentLineIndex] = useState(() => {
    const i = lines.findIndex((l) => !typedCache.has(l));
    return i === -1 ? lines.length : i;
  });
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(() => {
    return lines.some((l) => !typedCache.has(l));
  });

  useEffect(() => {
    const initial = lines.map((l) => (typedCache.has(l) ? l : ""));
    setTypedLines(initial);
    const i = lines.findIndex((l) => !typedCache.has(l));
    setCurrentLineIndex(i === -1 ? lines.length : i);
    setCharIndex(0);
    setIsTyping(i !== -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("\n")]);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const line = lines[currentLineIndex];

    if (typedCache.has(line)) {
      setTypedLines((prev) => {
        const next = [...prev];
        next[currentLineIndex] = line;
        return next;
      });
      setCurrentLineIndex((i) => i + 1);
      setCharIndex(0);
      return;
    }

    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setTypedLines((prev) => {
          const next = [...prev];
          next[currentLineIndex] = line.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((c) => c + 1);
      }, typingSpeed);
      return () => clearTimeout(t);
    } else {
      typedCache.add(line);
      const p = setTimeout(() => {
        setCurrentLineIndex((i) => i + 1);
        setCharIndex(0);
      }, pauseBetweenLines);
      return () => clearTimeout(p);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLineIndex, charIndex, lines, typingSpeed, pauseBetweenLines]);

  return { typedLines, currentLineIndex, isTyping };
}

export function clearTypingCache() {
  typedCache.clear();
}
