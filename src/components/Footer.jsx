import React from "react";
import { Box, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaRegEnvelope } from "react-icons/fa";
import Logo from "/images/CompanyLogo.png";
import company, { navItems } from "../data/company";
import catalogue from "../data/catalogue.json";
import { brand, fonts } from "../theme";

const headingSx = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: brand.goldLight,
  mb: 2,
};

const linkSx = {
  color: "rgba(255,255,255,0.72)",
  textDecoration: "none",
  fontSize: 14.5,
  lineHeight: 2,
  transition: "color .2s",
  "&:hover": { color: "#fff" },
};

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: brand.ink, color: "#fff", mt: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Grid container spacing={{ xs: 5, md: 6 }}>
          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
              <Box component="img" src={Logo} alt="" sx={{ height: 56, width: "auto" }} />
              <Typography sx={{ fontFamily: fonts.serif, fontSize: 26, fontWeight: 700, lineHeight: 1 }}>
                {company.name}
              </Typography>
            </Stack>
            <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: 14.5, maxWidth: 340 }}>
              Imported Arabic, Japanese, Korean, bakery and continental ingredients for
              restaurants, caterers, cloud kitchens and retailers.
            </Typography>
          </Grid>

          {/* Product ranges */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography sx={headingSx}>Ranges</Typography>
            <Stack>
              {catalogue.categories.map((c) => (
                <Box key={c.id} component={Link} to={`/products?category=${c.id}`} sx={linkSx}>
                  {c.name}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Company */}
          <Grid size={{ xs: 12, sm: 6, md: 1.5 }}>
            <Typography sx={headingSx}>Company</Typography>
            <Stack>
              {navItems.map((item) => (
                <Box key={item.path} component={Link} to={item.path} sx={linkSx}>
                  {item.label}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 12, md: 3.5 }}>
            <Typography sx={headingSx}>Visit &amp; contact</Typography>
            <Box
              component="a"
              href={company.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ ...linkSx, display: "block", lineHeight: 1.7, mb: 2 }}
            >
              {company.address.line1}
              <br />
              {company.address.line2}
            </Box>
            <Stack spacing={0.5}>
              <Box component="a" href={company.whatsapp} target="_blank" rel="noopener noreferrer" sx={linkSx}>
                WhatsApp {company.phoneDisplay}
              </Box>
              <Box component="a" href={`mailto:${company.email}`} sx={{ ...linkSx, wordBreak: "break-all" }}>
                {company.email}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom bar */}
      <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <Container
          maxWidth="lg"
          sx={{
            py: 2.5,
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={0.5}>
            {[
              { href: company.whatsapp, label: "WhatsApp", icon: <FaWhatsapp size={18} /> },
              { href: `mailto:${company.email}`, label: "Email", icon: <FaRegEnvelope size={17} /> },
              { href: company.instagram, label: "Instagram", icon: <FaInstagram size={18} /> },
            ].map((s) => (
              <IconButton
                key={s.label}
                aria-label={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: brand.goldLight } }}
              >
                {s.icon}
              </IconButton>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
