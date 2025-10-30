import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#222", py: 3, mt: 8, color: "#bbb", textAlign: "center" }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Deluxe Food Stuff. All Rights Reserved.
      </Typography>
    </Box>
  );
}
