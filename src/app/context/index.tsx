"use client";

import { useContext, createContext, useState } from "react";

interface ContextProps {
  showQR: boolean;
  setShowQR: React.Dispatch<React.SetStateAction<boolean>>;
}
const C = createContext<ContextProps | null>(null);

const P = ({ children }: { children: React.ReactNode }) => {
  const [showQR, setShowQR] = useState(false);
  const pValue = { showQR, setShowQR };
  return <C.Provider value={pValue}>{children}</C.Provider>;
};

const useCH = () => {
  const context = useContext(C);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

/**
 * Exports
 */
export const Context = C;
export const Provider = P;
export const useContextHook = useCH;
