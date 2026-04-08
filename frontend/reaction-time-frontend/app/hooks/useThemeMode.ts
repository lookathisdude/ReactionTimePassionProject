"use client";

import { createContext, useContext } from "react";

// -----------------------------
// Types
// -----------------------------
export type Mode = "light" | "dark" | "system";

export interface ThemeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

// -----------------------------
// Context
// -----------------------------
const ThemeModeContext = createContext<ThemeContextType | undefined>(undefined);

// -----------------------------
// Custom Hook
// -----------------------------
export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) throw new Error("useThemeMode must be used inside ThemeProvider");
  return context;
};

export default ThemeModeContext;