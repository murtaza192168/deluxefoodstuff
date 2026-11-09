import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import company from "../data/company";
import { brand } from "../theme";

// Notice + explicit consent shown before a visitor sends us their details.
export default function ConsentCheckbox({ checked, onChange, error, compact = false, onNavigate }) {
  return (
    <Box>
      <FormControlLabel
        sx={{ alignItems: "flex-start", m: 0 }}
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            size="small"
            sx={{ p: 0.5, mr: 1, mt: "-2px", color: error ? "#C0392B" : undefined, "&.Mui-checked": { color: brand.ink } }}
          />
        }
        label={
          <Typography sx={{ fontSize: compact ? 12 : 13, lineHeight: 1.5, color: brand.muted }}>
            I agree that {company.name} may use the details I share (name, business, city and the products I ask
            about) only to reply to this enquiry and send me a quote. The message is sent from my own WhatsApp or
            email. See our{" "}
            <Box component={Link} to="/privacy" onClick={onNavigate} sx={{ color: brand.ink, textDecoration: "underline" }}>
              Privacy Policy
            </Box>
            .
          </Typography>
        }
      />
      {error && (
        <Typography sx={{ fontSize: 12, color: "#C0392B", mt: 0.5, ml: 3.5 }}>Please tick the box to continue.</Typography>
      )}
    </Box>
  );
}
