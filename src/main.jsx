import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// Define Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2A342E", // Dark green/teal
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D5B36A", // Primary gold
      contrastText: "#2A342E",
    },
    background: {
      default: "#FFFFFF",
      paper: "#E7D6A3", // Cream gold for soft sections
    },
    text: {
      primary: "#2A342E",
      secondary: "#7D2D37", // maroon
    },
    accent: {
      main: "#7D2D37", // custom accent (not native MUI but for consistency)
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
  },
});


// Render root
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
