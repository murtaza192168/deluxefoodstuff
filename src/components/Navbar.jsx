import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { HiMenu, HiX } from "react-icons/hi";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "/images/CompanyLogo.png"

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const gold = "#D4AF37";
  const dark = "#0E0E0E";

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "dark",
    height: { xs: 70, sm: 78, md: 88, lg: 96 },
    display: "flex",
    justifyContent: "center",
    boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
        animation: "slideDown 0.6s ease",
        "@keyframes slideDown": {
          "0%": { transform: "translateY(-60px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between",  alignItems: "center",
      width: "100%", }}>
        {/* Logo */}
        <Box
  component={Link}
  sx={{
    to: "/",

   height: { xs: 42, sm: 48, md: 60, lg: 68 },
        cursor: "pointer",
    width: "auto",
    objectFit: "contain",
      transition: "0.3s ease",
      filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.4))",
      "&:hover": {
        transform: "scale(1.06)",
      },


    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    animation: "fadeIn 1s ease",
    "@keyframes fadeIn": {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
    
  }}
>
  <Box
    component="img"
    src={Logo}
    alt="Delux Enterprise Logo"
    sx={{
      height: { xs: 36, sm: 42, md: 50 }, // responsive sizes
      width: "auto",
      objectFit: "contain",
      filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.4))",
      cursor: "pointer",
      transition: "0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
      },
    }}
  />
</Box>


        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            alignItems: "center",
          }}
        >
          {navItems.map((item, index) => (
            <Typography
              key={index}
              component={Link}
              to={item.path}
              sx={{
                color: gold,
                textDecoration: "none",
                fontWeight: 500,
                position: "relative",
                opacity: 0,
                animation: `fadeUp 0.6s ease forwards`,
                animationDelay: `${0.2 + index * 0.15}s`,
                "@keyframes fadeUp": {
                  "0%": { opacity: 0, transform: "translateY(10px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -3,
                  width: "0%",
                  height: "2px",
                  backgroundColor: gold,
                  transition: "0.3s",
                },
                "&:hover:after": {
                  width: "100%",
                },
              }}
            >
              {item.label}
            </Typography>
          ))}

          {/* Social Icons */}
          <IconButton
            href="https://wa.me/919324789432"
            target="_blank"
            sx={{
              color: gold,
              fontSize: "22px",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.15)",
              },
            }}
          >
            <FaWhatsapp />
          </IconButton>

          <IconButton
            href="https://www.instagram.com/info.deluxfoodstuff?igsh=aHkxYmp4amp3ZzZ1"
            target="_blank"
            sx={{
              color: gold,
              fontSize: "22px",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.15)",
              },
            }}
          >
            <FaInstagram />
          </IconButton>
        </Box>

        {/* Hamburger Icon */}
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            display: { xs: "block", md: "none" },
            color: gold,
            transition: "0.3s",
            "&:hover": { transform: "scale(1.15)" },
          }}
        >
          <HiMenu size={28} />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: dark,
            width: "70%",
            color: gold,
            paddingTop: 4,
            animation: "drawerSlide 0.4s ease",
            "@keyframes drawerSlide": {
              "0%": { transform: "translateX(100%)" },
              "100%": { transform: "translateX(0)" },
            },
          },
        }}
      >
        <Box sx={{ textAlign: "right", pr: 2 }}>
          <IconButton onClick={() => setOpen(false)} sx={{ color: gold }}>
            <HiX size={28} />
          </IconButton>
        </Box>

        <List>
          {navItems.map((item, i) => (
            <ListItem key={i} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setOpen(false)}
                sx={{
                  textAlign: "center",
                  opacity: 0,
                  animation: `fadeInMenu 0.5s ease forwards`,
                  animationDelay: `${0.1 + i * 0.12}s`,
                  "@keyframes fadeInMenu": {
                    "0%": { opacity: 0, transform: "translateX(20px)" },
                    "100%": { opacity: 1, transform: "translateX(0)" },
                  },
                }}
              >
                <ListItemText primary={item.label} sx={{ color: gold }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Drawer Social Icons */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 3 }}>
          <IconButton
            href="https://wa.me/919324789432"
            target="_blank"
            sx={{ color: gold, fontSize: "24px" }}
          >
            <FaWhatsapp />
          </IconButton>

          <IconButton
            href="https://www.instagram.com/info.deluxfoodstuff?igsh=aHkxYmp4amp3ZzZ1"
            target="_blank"
            sx={{ color: gold, fontSize: "24px" }}
          >
            <FaInstagram />
          </IconButton>
        </Box>
      </Drawer>
    </AppBar>
  );
}
