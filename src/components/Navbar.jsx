import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
      <img 
        src="/images/CompanyLogo.png" 
        alt="Delux Enterprise Logo" 
        style={{
          height: "70px",
          width: "auto",
          marginRight: "16px",
          objectFit: "contain",
        }}
      />
    </Link>
    <Box sx={{ flexGrow: 1 }} />

        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/products">Products</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        <Button color="inherit" component={Link} to="/contact">Contact</Button>
      </Toolbar>
    </AppBar>
  );
}
<Button color="inherit" component={Link} to="/about">About</Button>