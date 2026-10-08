import React, { useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { HiMenuAlt3, HiX, HiOutlineClipboardList } from "react-icons/hi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { NavLink, Link, useLocation } from "react-router-dom";
import Logo from "/images/CompanyLogo.png";
import company, { navItems } from "../data/company";
import { brand, fonts } from "../theme";
import useEnquiry from "../enquiry/useEnquiry";

const linkSx = {
  position: "relative",
  color: brand.text,
  fontSize: 15,
  fontWeight: 500,
  textDecoration: "none",
  py: 1,
  transition: "color .2s",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 2,
    height: "1px",
    backgroundColor: brand.gold,
    transform: "scaleX(0)",
    transition: "transform .25s",
  },
  "&:hover": { color: brand.ink },
  "&:hover::after, &.active::after": { transform: "scaleX(1)" },
  "&.active": { color: brand.ink },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { count, setOpen: setEnquiryOpen } = useEnquiry();

  const enquiryButton = (
    <IconButton
      aria-label={`Enquiry list, ${count} ${count === 1 ? "product" : "products"}`}
      onClick={() => setEnquiryOpen(true)}
      sx={{ color: brand.ink }}
    >
      <Badge
        badgeContent={count}
        sx={{ "& .MuiBadge-badge": { backgroundColor: brand.gold, color: "#fff", fontWeight: 600 } }}
      >
        <HiOutlineClipboardList size={24} />
      </Badge>
    </IconButton>
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Start each page at the top when navigating.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AppBar position="fixed" elevation={0} sx={{ background: "transparent" }}>
      {/* Utility bar */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          backgroundColor: brand.ink,
          color: "rgba(255,255,255,0.78)",
          fontSize: 12.5,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ height: 36, display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Box component="span">
            {company.address.line1}, {company.address.line2}
          </Box>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box
              component="a"
              href={`mailto:${company.email}`}
              sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#fff" } }}
            >
              {company.email}
            </Box>
            <Box
              component="a"
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#fff" } }}
            >
              {company.phoneDisplay}
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Main bar */}
      <Box
        sx={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : brand.ivory,
          borderBottom: `1px solid ${brand.line}`,
          backdropFilter: scrolled ? "saturate(140%) blur(6px)" : "none",
          transition: "background-color .25s",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            height: { xs: 64, md: 72 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <Box
            component={Link}
            to="/"
            sx={{ display: "flex", alignItems: "center", gap: 1.5, textDecoration: "none" }}
          >
            <Box
              component="img"
              src={Logo}
              alt=""
              sx={{ height: { xs: 44, md: 52 }, width: "auto" }}
            />
            <Box sx={{ lineHeight: 1 }}>
              <Typography
                sx={{
                  fontFamily: fonts.serif,
                  fontWeight: 700,
                  fontSize: { xs: 21, md: 24 },
                  color: brand.ink,
                  lineHeight: 1,
                }}
              >
                {company.name}
              </Typography>
              <Typography
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontSize: 10.5,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: brand.muted,
                  mt: 0.5,
                }}
              >
                Crawford Market · Mumbai
              </Typography>
            </Box>
          </Box>

          {/* Desktop navigation */}
          <Stack
            component="nav"
            direction="row"
            spacing={4}
            alignItems="center"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {navItems.map((item) => (
              <Box key={item.path} component={NavLink} to={item.path} end sx={linkSx}>
                {item.label}
              </Box>
            ))}
            {enquiryButton}
            <Button
              variant="contained"
              color="primary"
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<FaWhatsapp size={16} />}
              sx={{ height: 40 }}
            >
              Enquire
            </Button>
          </Stack>

          {/* Mobile actions */}
          <Stack direction="row" alignItems="center" sx={{ display: { xs: "flex", md: "none" } }}>
            {enquiryButton}
            <IconButton aria-label="Open menu" onClick={() => setOpen(true)} sx={{ color: brand.ink }}>
              <HiMenuAlt3 size={26} />
            </IconButton>
          </Stack>
        </Container>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "min(86vw, 360px)",
            backgroundColor: brand.ivory,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1.5 }}>
          <IconButton aria-label="Close menu" onClick={() => setOpen(false)} sx={{ color: brand.ink }}>
            <HiX size={26} />
          </IconButton>
        </Box>

        <Stack component="nav" sx={{ px: 3 }}>
          {navItems.map((item) => (
            <Box
              key={item.path}
              component={NavLink}
              to={item.path}
              end
              onClick={() => setOpen(false)}
              sx={{
                fontFamily: fonts.serif,
                fontSize: 30,
                fontWeight: 600,
                color: brand.ink,
                textDecoration: "none",
                py: 1.25,
                borderBottom: `1px solid ${brand.line}`,
                "&.active": { color: brand.gold },
              }}
            >
              {item.label}
            </Box>
          ))}
        </Stack>

        <Box sx={{ mt: "auto", p: 3 }}>
          <Button
            fullWidth
            variant="contained"
            href={company.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<FaWhatsapp size={18} />}
            sx={{ height: 48, mb: 3 }}
          >
            Enquire on WhatsApp
          </Button>
          <Typography variant="body2" color="text.secondary">
            {company.address.line1}
            <br />
            {company.address.line2}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <Box component="a" href={`mailto:${company.email}`} sx={{ color: brand.ink }}>
              {company.email}
            </Box>
          </Typography>
          <IconButton
            aria-label="Instagram"
            href={company.instagram}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 1, ml: -1, color: brand.ink }}
          >
            <FaInstagram size={20} />
          </IconButton>
        </Box>
      </Drawer>
    </AppBar>
  );
}
