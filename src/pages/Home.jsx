import React from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import { Container, Typography } from "@mui/material";


export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Testimonials />

      {/* <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Why Choose Deluxe Food Stuff?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We bring the world’s most trusted food ingredients straight to your kitchen.
        </Typography>
      </Container> */}
    </>
  );
}
