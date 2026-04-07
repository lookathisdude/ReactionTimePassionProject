"use client";

import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useEffect, useState, ReactNode } from "react";
import { lightTheme, darkTheme } from "../theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  //dark mode state and effect to listen for system preference changes
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

    // Set initial value via a one-time event dispatch instead of direct setState
    darkMediaQuery.addEventListener("change", handleChange);

    // Use a separate initialization check
    if (darkMediaQuery.matches !== isDarkMode) {
      const initEvent = new MediaQueryListEvent("change", {
        matches: darkMediaQuery.matches,
        media: darkMediaQuery.media,
      });
      handleChange(initEvent);
    }

    return () => darkMediaQuery.removeEventListener("change", handleChange);
  }, [isDarkMode]);

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}