import React from "react";
import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import { Instagram, WhatsApp, LocationOn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#2A342E",
        color: "#E7D6A3",
        py: 4,
        mt: 8,
      }}
    >
      <Container>
        {/* Company Name */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, mb: 2, color: "#D5B36A" }}
        >
          Delux Enterprise
        </Typography>

        {/* Address */}
        <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 3 }}>
          <LocationOn sx={{ color: "#D5B36A" }} />
          <Typography variant="body1" sx={{ maxWidth: 400, lineHeight: 1.6 }}>
            Shop 305, Crawford Market, Opp. Sarang Street, Dhobi Talao,
            CST Area, Fort, Mumbai – 400001, Maharashtra, India
          </Typography>
        </Stack>

        {/* Social & Contact Icons */}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <IconButton
            href="https://wa.me/919324789432"
            target="_blank"
            sx={{ color: "#E7D6A3", "&:hover": { color: "#D5B36A" } }}
          >
            <WhatsApp fontSize="large" />
          </IconButton>

          

          <IconButton
            href="https://www.instagram.com/info.deluxfoodstuff?igsh=aHkxYmp4amp3ZzZ1"
            target="_blank"
            sx={{ color: "#E7D6A3", "&:hover": { color: "#D5B36A" } }}
          >
            <Instagram fontSize="large" />
          </IconButton>
        </Stack>

        <Typography variant="body2" sx={{ mt: 3, opacity: 0.7 }}>
          © {new Date().getFullYear()} Delux Enterprise. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
