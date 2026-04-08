"use client";

import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import { motion } from "framer-motion";
import { useThemeMode, Mode } from "../hooks/useThemeMode";

export default function LofiThemeModeSelector() {
  const { mode, setMode } = useThemeMode();

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newMode: Mode | null) => {
    if (newMode) setMode(newMode);
  };

  return (
    <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      {/* Background Glow */}
      <motion.div
        animate={{ opacity: 0.6, scale: 1.15 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          width: 120,
          height: 60,
          borderRadius: 30,
          background: "radial-gradient(circle, rgba(124,58,237,0.5), transparent 70%)",
          filter: "blur(20px)",
          zIndex: 0,
        }}
      />

      {/* Toggle Buttons */}
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleChange}
        sx={{
          zIndex: 1,
          backdropFilter: "blur(12px)",
          borderRadius: 8,
          overflow: "hidden",
          background: "linear-gradient(145deg, rgba(30,30,45,0.7), rgba(15,15,25,0.9))",
          boxShadow: "0 0 18px rgba(124,58,237,0.4)",
        }}
      >
        <ToggleButton value="light" sx={{ px: 2, py: 1, color: "#fbbf24" }}>
          <motion.div whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.1 }}>
            <LightModeIcon />
          </motion.div>
        </ToggleButton>

        <ToggleButton value="dark" sx={{ px: 2, py: 1, color: "#a78bfa" }}>
          <motion.div whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.1 }}>
            <DarkModeIcon />
          </motion.div>
        </ToggleButton>

        <ToggleButton value="system" sx={{ px: 2, py: 1, color: "#60a5fa" }}>
          <motion.div whileTap={{ scale: 0.85 }} whileHover={{ scale: 1.1 }}>
            <SettingsBrightnessIcon />
          </motion.div>
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Floating Music Note */}
      <motion.div
        animate={{ y: [-2, -10, -2], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          top: -6,
          right: -6,
          fontSize: 12,
          color: "#a78bfa",
          pointerEvents: "none",
        }}
      >
        ♪
      </motion.div>
    </Box>
  );
}