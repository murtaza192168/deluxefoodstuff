import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
     <Box
      sx={{
        height: "100vh",
        backgroundImage: "url('/herobg.jpg')", // we'll update image later
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Container>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          Authentic. Premium. Trusted.
        </Typography>

        <Typography
          variant="h5"
          sx={{ mt: 2, maxWidth: 500, lineHeight: 1.5, opacity: 0.9 }}
        >
          Supplying imported global food ingredients to restaurants, hotels,
          supermarkets, and wholesalers.
        </Typography>

        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/products"
          sx={{ mt: 4, backgroundColor: "#00695f" }}
        >
          Explore Products
        </Button>
      </Container>

    </Box>
  );
}
