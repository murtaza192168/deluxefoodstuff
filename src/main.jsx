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
    primary: { main: "#2E7D32" },  // Green
    secondary: { main: "#6D4C41" }, // Brown
    background: { default: "#fafafa" },
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
