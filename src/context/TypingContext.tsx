import { createContext, useContext, useState, ReactNode } from "react";

type TypingContextType = {
  isTypingContext: boolean;
  setIsTypingContext: React.Dispatch<React.SetStateAction<boolean>>;
};

const TypingContext = createContext<TypingContextType | undefined>(undefined);

export const TypingProvider = ({ children }: { children: ReactNode }) => {
  const [isTypingContext, setIsTypingContext] = useState(false);
  return (
    <TypingContext.Provider value={{ isTypingContext, setIsTypingContext }}>
      {children}
    </TypingContext.Provider>
  );
};

export const useTypingContext = () => {
  const context = useContext(TypingContext);
  if (!context) {
    throw new Error("useTypingContext must be used within a TypingProvider");
  }
  return context;
};
