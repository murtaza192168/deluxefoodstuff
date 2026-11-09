import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import useEnquiry from "../enquiry/useEnquiry";
import { getAnalyticsConsent, onConsentChange } from "../privacy/consent";
import company from "../data/company";

// Always-visible WhatsApp shortcut. Steps aside for the cookie banner, and sits above the
// mobile "View enquiry list" bar on the products page.
export default function FloatingWhatsApp() {
  const { pathname } = useLocation();
  const { count, open } = useEnquiry();
  const [choice, setChoice] = useState(() => getAnalyticsConsent());
  useEffect(() => onConsentChange(setChoice), []);

  const bannerShowing = Boolean(company.gaMeasurementId) && !choice;
  if (bannerShowing || open) return null;
  const raised = pathname === "/products" && count > 0;

  return (
    <Box
      component="a"
      href={`${company.whatsapp}?text=${encodeURIComponent(`Hello ${company.name}, I have a trade enquiry.`)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      sx={{
        position: "fixed",
        right: { xs: 16, md: 24 },
        bottom: { xs: raised ? 82 : 16, md: 24 },
        zIndex: 1100,
        width: { xs: 54, md: 58 },
        height: { xs: 54, md: 58 },
        borderRadius: "50%",
        backgroundColor: "#25D366",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 26px -8px rgba(0,0,0,.45)",
        transition: "transform .2s, bottom .2s",
        "&:hover": { transform: "scale(1.06)" },
        "&:focus-visible": { outline: "3px solid #1C2621", outlineOffset: 3 },
      }}
    >
      <FaWhatsapp size={30} />
    </Box>
  );
}
