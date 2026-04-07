"use client";

import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Information() {
  const fullText = "Please enter your information";
  const [displayedText, setDisplayedText] = useState("");
  const [blink, setBlink] = useState(true);
  const [mounted, setMounted] = useState(false); // ✅ guard for SSR

  // Only start effects after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!mounted) return;
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [mounted]);

  // Blinking cursor
  useEffect(() => {
    if (!mounted) return;
    const cursorInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [mounted]);

  if (!mounted) return null; // ✅ prevent SSR mismatch

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30vh",
        backgroundColor: "#1e1e1e",
        color: "#f5f5f5",
        fontFamily: "Meow Script, cursive",
        fontSize: { xs: "1.2rem", sm: "1.5rem", md: "4rem" },
        letterSpacing: "0.05em",
        textShadow: "0 0 5px #8ecae6, 0 0 10px #219ebc",
      }}
    >
      <Typography>
        {displayedText}
        <span style={{ opacity: blink ? 1 : 0 }}>|</span>
      </Typography>
    </Box>
  );
}
