import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { getAnalyticsConsent, onConsentChange, setAnalyticsConsent } from "./consent";
import company from "../data/company";
import { brand } from "../theme";

// Asks once whether we may use analytics cookies. Nothing is tracked until the visitor accepts.
export default function CookieBanner() {
  const [choice, setChoice] = useState(() => getAnalyticsConsent());
  useEffect(() => onConsentChange(setChoice), []);

  if (!company.gaMeasurementId || choice) return null;

  return (
    <Box
      role="region"
      aria-label="Cookie choice"
      sx={{
        position: "fixed",
        left: { xs: 12, sm: "auto" },
        right: 12,
        bottom: 12,
        zIndex: 1400,
        maxWidth: 420,
        backgroundColor: brand.ink,
        color: "#fff",
        p: 2.5,
        boxShadow: "0 18px 40px -18px rgba(0,0,0,.6)",
      }}
    >
      <Typography sx={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,.88)" }}>
        We'd like to use Google Analytics cookies to count visits and see which pages are useful. No tracking happens
        unless you accept.{" "}
        <Box component={Link} to="/privacy" sx={{ color: brand.goldLight, textDecoration: "underline" }}>
          Privacy Policy
        </Box>
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => setAnalyticsConsent("granted")}
          sx={{ backgroundColor: brand.goldLight, color: brand.ink, "&:hover": { backgroundColor: "#E9CF8E" } }}
        >
          Accept
        </Button>
        <Button variant="outlined" onClick={() => setAnalyticsConsent("denied")} sx={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}>
          Decline
        </Button>
      </Stack>
    </Box>
  );
}
