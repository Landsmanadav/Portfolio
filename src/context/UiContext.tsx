import { createContext, useContext, useState, ReactNode } from "react";

type UiContextType = {
  showCursor: boolean;
  setShowCursor: React.Dispatch<React.SetStateAction<boolean>>;
  showBackground: boolean;
  setShowBackground: React.Dispatch<React.SetStateAction<boolean>>;
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
  frequency: number;
  setFrequency: React.Dispatch<React.SetStateAction<number>>;
};

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider = ({ children }: { children: ReactNode }) => {
  const [showCursor, setShowCursor] = useState(true);
  const [showBackground, setShowBackground] = useState(true);
  const [theme, setTheme] = useState(true);
  const [frequency, setFrequency] = useState(0.001);
  // console.log(frequency);
  return (
    <UiContext.Provider
      value={{
        showCursor,
        setShowCursor,
        showBackground,
        setShowBackground,
        theme,
        setTheme,
        frequency,
        setFrequency,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error("useUi must be used within a UiProvider");
  }
  return context;
};
