import React from "react";
import { Container, Typography } from "@mui/material";

export default function Contact() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4">Contact Us</Typography>
      <Typography variant="body1" color="text.secondary">
        Reach out to us for enquiries and partnerships.
      </Typography>
    </Container>
  );
}
