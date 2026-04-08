"use client";

import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { lightTheme, darkTheme } from "../theme";
import ThemeModeContext, { Mode } from "../hooks/useThemeMode";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // Default to dark (safe for SSR)
  const [mode, setMode] = useState<Mode>("dark");

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setMode(prevMode => (prevMode === "system" ? (e.matches ? "dark" : "light") : prevMode));
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Determine effective theme
  const effectiveMode = useMemo(() => {
    if (mode === "system") {
      return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return mode;
  }, [mode]);

  const theme = useMemo(() => (effectiveMode === "dark" ? darkTheme : lightTheme), [effectiveMode]);

  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}