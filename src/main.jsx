import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import EnquiryProvider from "./enquiry/EnquiryProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Render root
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <EnquiryProvider>
          <App />
        </EnquiryProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
