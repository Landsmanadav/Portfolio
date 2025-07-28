import { useTypingEffect } from "@/customHooks/useTypingEffect";
import { useEffect } from "react";

export default function Section({
  lines,
  onTypingEnd,
  instantShow,
}: {
  lines: string[];
  onTypingEnd: () => void;
  instantShow: boolean;
}) {
  if (instantShow) {
    onTypingEnd();

    return (
      <div className="h-screen w-full flex flex-col items-start justify-center px-4 pl-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 leading-tight min-h-[12rem] text-left whitespace-pre-line overflow-x-auto w-full">
          {lines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </h1>
      </div>
    );
  }

  const { typedLines, isTyping } = useTypingEffect(lines, 40, 500);

  useEffect(() => {
    if (!isTyping && onTypingEnd) onTypingEnd();
  }, [isTyping, onTypingEnd]);

  return (
    <div className="h-screen w-full flex flex-col items-start justify-center px-4 pl-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 leading-tight min-h-[12rem] text-left whitespace-pre-line overflow-x-auto w-full">
        {typedLines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </h1>
    </div>
  );
}
