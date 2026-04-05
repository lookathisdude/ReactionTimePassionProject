"use client";

// Imports
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useEffect, useState, ReactNode } from "react";
import { lightTheme, darkTheme } from "../theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize state with system preference directly (avoids setState in effect)
  const getInitialDarkMode = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false; // default to light mode for SSR
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  // Effect to listen for system preference changes dynamically
  useEffect(() => {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Listener for preference changes
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

    darkMediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on unmount
    return () => darkMediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}