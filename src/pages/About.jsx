import React from "react";
import { Container, Typography } from "@mui/material";

export default function About() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4">About Us</Typography>
      <Typography variant="body1" color="text.secondary">
        We supply imported authentic food ingredients from around the world.
      </Typography>
    </Container>
  );
}
