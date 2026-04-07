// version 1.1.2
"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
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
import {
  ADD_USER,
  type UserAttributes,
  DeviceType,
  Gender,
} from "../utils/sendUserAttributes";

type AddUserResponse = {
  addUser: UserAttributes;
};

export default function UserAttributes() {
  const [addUser, { loading, error }] = useMutation<AddUserResponse>(ADD_USER);
  const [yearGroup, setYearGroup] = useState("");
  const [sleepHours, setSleepHours] = useState<number | "">("");
  const [device, setDevice] = useState<DeviceType | "">("");
  const [gender, setGender] = useState<Gender | "">("");
  const theme = useTheme();

  const handleStartTest = async () => {
    if (!yearGroup || !sleepHours || !device || !gender) {
      alert("Please fill out all fields!");
      return;
    }

    // defin the input object
    const input = {
      yearGroup: Number(yearGroup),
      sleepHours: Number(sleepHours),
      deviceType: device,
      gender: gender,
    };

    //log the input
    console.log("Sending input: ", JSON.stringify(input));

    try {
      const { data } = await addUser({
        variables: {
          input,
        },
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify({ yearGroup, sleepHours, device, gender }),
      );

      console.log("User added:", data?.addUser);
    } catch (err) {
      console.error("Failed to add user:", err);
    }
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
          fontFamily: "Meow Script, cursive",
          fontWeight: "bold",
          mb: 3,
          textShadow:
            theme.palette.mode === "dark"
              ? "2px 2px 6px rgba(0,0,0,0.7)"
              : "2px 2px 4px rgba(255,255,255,0.3)",
        }}
      >
        Welcome to the Reaction Time Test!
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 5,
          color: theme.palette.text.secondary,
          textAlign: "center",
          maxWidth: 500,
        }}
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
          <TextField
            label="Year Group"
            variant="filled"
            fullWidth
            value={yearGroup}
            onChange={(e) => setYearGroup(e.target.value)}
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
              input: { color: theme.palette.text.primary },
              "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
            }}
          />

          <TextField
            label="Sleep Hours Last Night"
            type="number"
            variant="filled"
            fullWidth
            value={sleepHours}
            onChange={(e) => setSleepHours(Number(e.target.value))}
            sx={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
              input: { color: theme.palette.text.primary },
              "& .MuiInputLabel-root": { color: theme.palette.text.secondary },
            }}
          />

          <FormControl fullWidth variant="filled">
            <InputLabel sx={{ color: theme.palette.text.secondary }}>
              Device
            </InputLabel>
            <Select
              value={device}
              onChange={(e) => setDevice(e.target.value as DeviceType)}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                color: theme.palette.text.primary,
              }}
            >
              <MenuItem value={DeviceType.DESKTOP}>Desktop</MenuItem>
              <MenuItem value={DeviceType.LAPTOP}>Laptop</MenuItem>
              <MenuItem value={DeviceType.TABLET}>Tablet</MenuItem>
              <MenuItem value={DeviceType.PHONE}>Phone</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="filled">
            <InputLabel sx={{ color: theme.palette.text.secondary }}>
              Gender
            </InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                color: theme.palette.text.primary,
              }}
            >
              <MenuItem value={Gender.MALE}>Male</MenuItem>
              <MenuItem value={Gender.FEMALE}>Female</MenuItem>
              <MenuItem value={Gender.OTHER}>Other</MenuItem>
            </Select>
          </FormControl>

          {error && (
            <Typography color="error" variant="body2">
              Failed to submit: {error.message}
            </Typography>
          )}

          <Button
            onClick={handleStartTest}
            variant="contained"
            disabled={loading}
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
            {loading ? "Submitting..." : "Start Test"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
