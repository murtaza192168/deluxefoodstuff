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

      <Container sx={{ py: 8, pt: { xs: "90px", sm: "100px", md: "110px", lg: "120px" }, scrollMarginTop: { xs: "90px", sm: "100px", md: "110px", lg: "120px" }}}>
        
      </Container>
    </>
  );
}
