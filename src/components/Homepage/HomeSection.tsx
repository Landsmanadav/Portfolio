import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import SmartButton from "../ui/SmartButton";
import { useTypingEffect } from "@/customHooks/useTypingEffect";
import { useEffect, useMemo } from "react";
import { useTypingContext } from "@/context/TypingContext";

function HomeSection() {
  const { isTypingContext, setIsTypingContext } = useTypingContext();
  const lines = useMemo(
    () => [
      `Full Stack Developer`,
      `specializing in React & Automation`,
      `Building smooth UIs & smart workflows for modern web apps.`,
    ],
    []
  );
  const { typedLines, currentLineIndex, isTyping } = useTypingEffect(
    lines,
    60,
    200
  );
  useEffect(() => {
    if (isTypingContext !== isTyping) {
      setIsTypingContext(isTyping);
    }
  }, [isTyping]);

  return (
    <div>
      <section className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
        <Badge className="mb-4 px-4 py-1 rounded-full text-xs font-medium">
          Hi, I'm Nadav 👋
        </Badge>
        <div className="min-h-[200px] flex flex-col items-center justify-center text-center px-4">
          {typedLines.map((line, idx) => (
            <h1
              key={idx}
              className={`${
                idx === 0
                  ? "text-4xl sm:text-6xl font-bold text-foreground"
                  : idx === 1
                  ? " text-4xl font-light text-muted-foreground"
                  : "text-xl text-muted-foreground max-w-xl"
              }`}
            >
              {line}
            </h1>
          ))}
        </div>
        <motion.div
          whileHover={{ scale: 1.25 }}
          onHoverStart={() => {}}
          onHoverEnd={() => {}}
        >
          <SmartButton asChild className="mt-4" size="lg" variant="outline">
            <a href="mailto:nadav@example.com">Let's connect&nbsp;↗</a>
          </SmartButton>
        </motion.div>
      </section>
    </div>
  );
}

export default HomeSection;
