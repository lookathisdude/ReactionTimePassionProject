import {createTheme} from '@mui/material'
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f3f1ed", // warm beige
      paper: "#fff8f0",   // lighter card/paper
    },
    text: {
      primary: "#3e3a36", // dark brown text
      secondary: "#6e5d50", // subtle gray-brown
    },
    primary: {
      main: "#c08497", // soft rose accent
    },
    secondary: {
      main: "#a3d2ca", // pastel teal accent
    },
  },
  typography: {
    fontFamily: "'Courier New', monospace",
    h1: { fontFamily: "'Pacifico', cursive", letterSpacing: 2 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f3f1ed",
          color: "#3e3a36",
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

// Dark Lo-Fi Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1e1e", // dark gray
      paper: "#2c2c2c",   // card/paper background
    },
    text: {
      primary: "#f5f5f5", // off-white
      secondary: "#c0b9b2", // warm gray
    },
    primary: {
      main: "#e07a5f", // muted coral
    },
    secondary: {
      main: "#3d405b", // deep violet accent
    },
  },
  typography: {
    fontFamily: "'Courier New', monospace",
    h1: { fontFamily: "'Pacifico', cursive", letterSpacing: 2 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#1e1e1e",
          color: "#f5f5f5",
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});