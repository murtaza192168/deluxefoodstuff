import React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Email, Instagram, WhatsApp } from "@mui/icons-material";

export default function Footer() {
  const gold = "#D4AF37";

  return (
    <Box
      sx={{
        background: "#111",
        color: gold,
        padding: { xs: "35px 16px", md: "60px 20px" }, // smaller mobile padding
        marginTop: "60px",
      }}
    >
      {/* ================= MAIN GRID ================= */}
      <Grid
        container
        spacing={{ xs: 2, md: 5 }} // tighter spacing on mobile
        alignItems="center" 
        sx={{
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* ---------- LOGO COLUMN ---------- */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <img
            src="/images/CompanyLogo.png"
            alt="Delux Enterprise Logo"
            style={{
              width: "110px",          // reduced size for mobile
              maxWidth: "80%",
              objectFit: "contain",
              filter: "brightness(1.1) contrast(1.1)",
              marginBottom: "10px",   // tighter
            }}
          />
        </Grid>

        {/* ---------- RIGHT SIDE CONTENT ---------- */}
        <Grid item xs={12} md={9}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }} // better compact spacing
            sx={{
              display: "flex",
              justifyContent: {
                xs: "center",
                md: "space-between",
              },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {/* ========== BRANDING BLOCK ========== */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 0.5, fontSize: { xs: "18px", md: "20px" } }}
              >
                Delux Enterprise
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#ccc",
                  lineHeight: 1.4,  // tighter
                  fontSize: "14px",
                }}
              >
                304/305, M. J. Phule Market, Crowford Market, Mumbai – 400001
              </Typography>
            </Grid>

            {/* ========== QUICK LINKS ========== */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 1, fontSize: { xs: "17px", md: "19px" } }}
              >
                Quick Links
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px", // tighter mobile spacing
                }}
              >
                {[
                  { label: "Home", path: "/" },
                  { label: "Products", path: "/products" },
                  { label: "About", path: "/about" },
                ].map((item, index) => (
                  <MuiLink
                    key={index}
                    component={Link}
                    to={item.path}
                    underline="none"
                    onClick={() => window.scrollTo(0, 0)}
                    sx={{
                      color: "#ccc",
                      fontSize: "14px",
                      "&:hover": { color: gold },
                    }}
                  >
                    {item.label}
                  </MuiLink>
                ))}
              </Box>
            </Grid>

            {/* ========== CONNECT WITH US ========== */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, mb: 1, fontSize: { xs: "17px", md: "19px" } }}
              >
                Connect With Us
              </Typography>

              

              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: { xs: 1.2, md: 2 }, // tighter icon spacing on mobile
                }}
              >
                <IconButton
                  component="a"
                  href="https://wa.me/919324789432"
                  target="_blank"
                  sx={{ color: gold, padding: "6px" }}
                >
                  <WhatsApp />
                </IconButton>

                <IconButton
                  component="a"
                  href="mailto:info.deluxfoodstuffs@gmail.com"
                  sx={{ color: gold, padding: "6px" }}
                >
                  <Email />
                </IconButton>

                <IconButton
                  component="a"
                  href="https://instagram.com/info.deluxfoodstuff"
                  target="_blank"
                  sx={{ color: gold, padding: "6px" }}
                >
                  <Instagram />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* ---------- Divider ---------- */}
      <Box
        sx={{
          height: "1px",
          background: "rgba(255,255,255,0.2)",
          mt: { xs: 4, md: 6 },
          mb: 2,
        }}
      />

      {/* ---------- Copyright ---------- */}
      <Typography
        variant="body2"
        align="center"
        sx={{ color: "#aaa", fontSize: "13px" }}
      >
        © {new Date().getFullYear()} Delux Enterprise. All Rights Reserved.
      </Typography>
    </Box>
  );
}
