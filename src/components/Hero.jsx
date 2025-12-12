import React from "react";
import Slider from "react-slick";
import { Box, Container, Typography, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";


/*
 Place hero images in /public/hero-1.jpg, /public/hero-2.jpg, /public/hero-3.jpg
 Keep images large (1920x1080) for best look.
*/

const slides = [
  { img: "/hero-arabic.webp", title: "Arabic Pantry • Authentic Flavours" },
  { img: "/hero-japanese.jpg", title: "Sushi Essentials • Premium Quality" },
  { img: "/hero-bakery.jpg", title: "Bakery & Pantry • Trusted Brands" },
  { img: "/hero-thai.webp", title: "Thai Pantry • LEE KUM KEE" },
];

export default function Hero() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const settings = {
    autoplay: true,
    autoplaySpeed: 3200,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    fade: true,
    pauseOnHover: false,
    customPaging: i => <div style={{width:10,height:6,background: 'rgba(255,255,255,0.4)',borderRadius:6}}/>
  };

  return (
    <Box component="section" sx={{ position: "relative", mb: 4 }}>
      <Slider {...settings}>
        {slides.map((s, idx) => (
          <Box
            key={idx}
            sx={{
              height: { xs: "100vh", md: "88vh" },
              backgroundImage: `url(${s.img})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundColor: "black",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
            role="img"
            aria-label={s.title}
          >
            {/* overlay */}
            <Box sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.45))"
            }}/>

            {/* content */}
            <Container sx={{ position: "relative", zIndex: 2, textAlign: "center", color: "primary.contrastText", display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    height: "100%", }}>
              <Typography variant={isSm ? "h4" : "h2"} sx={{ fontWeight: 800, letterSpacing: 0.4 }}>
                {s.title}
              </Typography>
              <Typography sx={{ mt: 2, maxWidth: 720, mx: "auto", fontSize: isSm ? "0.95rem" : "1.125rem", color: "rgba(255,255,255,0.92)" }}>
                Supplying premium imported ingredients to restaurants, caterers & resellers across India.
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                href="/products"
                sx={{
                  mt: 4,
                  px: 4,
                  py: 1.25,
                  borderRadius: 3,
                  fontWeight: 700,
                }}
              >
                Explore Products
              </Button>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
