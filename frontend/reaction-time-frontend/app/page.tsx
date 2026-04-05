"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";

export default function Home() {
  const router = useRouter();
  const theme = useTheme(); // Access current theme (light or dark)

  // State to store user info
  const [yearGroup, setYearGroup] = useState("");
  const [sleepHours, setSleepHours] = useState<number | "">("");
  const [device, setDevice] = useState("");
  const [gender, setGender] = useState("");

  const handleStartTest = () => {
    // Validate inputs
    if (!yearGroup || !sleepHours || !device || !gender) {
      alert("Please fill out all fields!");
      return;
    }

    // Save to local storage or context
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ yearGroup, sleepHours, device, gender })
    );

    router.push("/reaction-time");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textShadow: theme.palette.mode === "dark" 
            ? "2px 2px 6px rgba(0,0,0,0.7)"
            : "2px 2px 4px rgba(255,255,255,0.3)",
        }}
      >
        Welcome to the Reaction Time Test!
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 5, color: theme.palette.text.secondary, textAlign: "center", maxWidth: 500 }}
      >
        Before you start, please enter your information below. This will help us
        personalize your results.
      </Typography>

      <Paper
        elevation={5}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
          backdropFilter: "blur(5px)",
          width: "100%",
          maxWidth: 450,
        }}
      >
        <Stack spacing={3}>
          {/* Year Group */}
          <TextField
            label="Year Group"
            variant="filled"
            fullWidth
            value={yearGroup}
            onChange={(e) => setYearGroup(e.target.value)}
            sx={{
              backgroundColor: theme.palette.mode === "dark" 
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
              input: { color: theme.palette.text.primary },
              "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
            }}
          />

          {/* Sleep Hours */}
          <TextField
            label="Sleep Hours Last Night"
            type="number"
            variant="filled"
            fullWidth
            value={sleepHours}
            onChange={(e) => setSleepHours(Number(e.target.value))}
            sx={{
              backgroundColor: theme.palette.mode === "dark" 
                ? "rgba(255,255,255,0.05)"
                : "rgba(0,0,0,0.03)",
              input: { color: theme.palette.text.primary },
              "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
            }}
          />

          {/* Device */}
          <FormControl fullWidth variant="filled">
            <InputLabel sx={{ color: theme.palette.text.secondary }}>Device</InputLabel>
            <Select
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              sx={{
                backgroundColor: theme.palette.mode === "dark" 
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                color: theme.palette.text.primary,
              }}
            >
              <MenuItem value="Desktop">Desktop</MenuItem>
              <MenuItem value="Laptop">Laptop</MenuItem>
              <MenuItem value="Tablet">Tablet</MenuItem>
              <MenuItem value="Phone">Phone</MenuItem>
            </Select>
          </FormControl>

          {/* Gender */}
          <FormControl fullWidth variant="filled">
            <InputLabel sx={{ color: theme.palette.text.secondary }}>Gender</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{
                backgroundColor: theme.palette.mode === "dark" 
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                color: theme.palette.text.primary,
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* Start Button */}
          <Button
            onClick={handleStartTest}
            variant="contained"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: theme.palette.mode === "dark" ? "#1a1a1a" : "#fff",
              fontWeight: "bold",
              py: 1.5,
              "&:hover": {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark || theme.palette.primary.main}, ${theme.palette.secondary.dark || theme.palette.secondary.main})`,
              },
            }}
          >
            Start Test
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}