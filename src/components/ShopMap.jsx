import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { HiOutlineLocationMarker } from "react-icons/hi";
import company from "../data/company";
import { brand, fonts } from "../theme";

const EMBED = "https://www.google.com/maps?q=" + encodeURIComponent("Mahatma Jyotiba Phule Mandai, Crawford Market, Mumbai") + "&z=17&output=embed";

// Google Maps loads only after the visitor taps, so Google is not contacted otherwise.
export default function ShopMap() {
  const [show, setShow] = useState(false);
  return (
    <Box sx={{ border: `1px solid ${brand.line}`, backgroundColor: brand.paper, mt: 3 }}>
      <Box sx={{ aspectRatio: { xs: "4 / 3", sm: "16 / 9" }, position: "relative", backgroundColor: brand.ivory }}>
        {show ? (
          <Box component="iframe" title="Map to Delux Enterprise" src={EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
        ) : (
          <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", px: 3, gap: 1.5 }}>
            <HiOutlineLocationMarker size={30} color={brand.gold} />
            <Typography sx={{ fontFamily: fonts.serif, fontSize: 24, fontWeight: 600, color: brand.ink, lineHeight: 1.2 }}>
              M. J. Phule (Crawford) Market
            </Typography>
            <Typography variant="body2" color="text.secondary">{company.address.landmark} · 3rd Lane, Shop 304/305</Typography>
            <Button variant="contained" onClick={() => setShow(true)} sx={{ mt: 1 }}>Show map</Button>
            <Typography sx={{ fontSize: 11.5, color: brand.muted }}>Loads Google Maps</Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ px: 2, py: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Typography variant="body2" color="text.secondary">Inside the 3rd lane of the market, opposite Sadanand Hotel.</Typography>
        <Box component="a" href={company.mapUrl} target="_blank" rel="noopener noreferrer" sx={{ fontSize: 14, fontWeight: 600, color: brand.ink }}>
          Open in Google Maps
        </Box>
      </Box>
    </Box>
  );
}
