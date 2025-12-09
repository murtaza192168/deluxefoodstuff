import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Instagram, WhatsApp, Menu, Close } from "@mui/icons-material";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const gold = "#E7D6A3"; // your golden brand color

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>

          {/* LOGO */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src="/images/CompanyLogo.png"
              alt="Delux Enterprise Logo"
              style={{
                height: "65px",
                width: "auto",
                objectFit: "contain",
                marginRight: "16px",
              }}
            />
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4, alignItems: "center" }}>
            {["Home", "Products", "About"].map((item) => (
              <Button
                key={item}
                component={Link}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                sx={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  position: "relative",
                  textTransform: "none",
                  color: gold,  // GOLD TEXT COLOR
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    width: "0%",
                    height: "2px",
                    backgroundColor: gold,  // GOLD UNDERLINE
                    transition: "0.3s ease",
                  },
                  "&:hover:after": {
                    width: "100%",
                  },
                }}
              >
                {item}
              </Button>
            ))}

            {/* GOLD Icons */}
            <IconButton
              href="https://wa.me/919324789432"
              target="_blank"
              sx={{ color: gold }}
            >
              <WhatsApp />
            </IconButton>

            <IconButton
              href="https://www.instagram.com/info.deluxfoodstuff?igsh=aHkxYmp4amp3ZzZ1"
              target="_blank"
              sx={{ color: gold }}
            >
              <Instagram />
            </IconButton>
          </Box>

          {/* Mobile Icon (Hamburger = GOLD) */}
          <IconButton
            sx={{ color: gold, display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { backgroundColor: "primary.main", color: gold, width: 240 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton onClick={() => setOpen(false)} sx={{ color: gold }}>
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ backgroundColor: gold }} />

        <List >
          {["Home", "Products", "About"].map((text) => (
            <ListItem sx={{ color: gold }}
              button
              key={text}
              component={Link}
              to={text === "Home" ? "/" : `/${text.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}

          <Divider sx={{ backgroundColor: gold }} />

          <ListItem sx={{ color: gold }} button component="a" href="https://wa.me/919324789432" target="_blank">
            <WhatsApp sx={{ mr: 1 }} /> WhatsApp
          </ListItem>

          <ListItem sx={{ color: gold }} button component="a" href="https://www.instagram.com/info.deluxfoodstuff?igsh=aHkxYmp4amp3ZzZ1" target="_blank">
            <Instagram sx={{ mr: 1 }} /> Instagram
          </ListIte
        </List>
      </Drawer>
    </>
  );
}
