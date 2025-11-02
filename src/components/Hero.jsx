import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Container } from "@mui/material";

const heroImages = [
  "/hero-chinese.webp",
  "/hero-arabic.webp",
  "/hero-thai.webp",
  "/hero-japanese.jpg"
];

export default function Hero() {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    fade: true,
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: { xs: "70vh", md: "90vh" } }}>
      <Slider {...settings}>
       {heroImages.map((img, idx) => (
  <Box
    key={idx}
    sx={{
      width: "100%",
      height: { xs: "70vh", md: "90vh" },
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",

      // ✅ Centering logic
      backgroundPosition:
        img.includes("hero-arabic") ? "center 35%" : "center",

      backgroundRepeat: "no-repeat",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
      }}
    />
  </Box>
))}

      </Slider>

      {/* Text Layer */}
      <Container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 3,
          color: "#fff",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          Deluxe Food Stuff
        </Typography>

        <Typography variant="h5" sx={{ mt: 2, opacity: 0.9 }}>
          Authentic Ingredients. Global Flavours. Trusted Supply.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, px: 6, py: 1.6, fontSize: "1.1rem" }}
          href="/products"
        >
          Explore Products
        </Button>
      </Container>
    </Box>
  );
}
