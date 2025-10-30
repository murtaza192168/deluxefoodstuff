import React from "react";
import { Container, Typography, Box } from "@mui/material";

export default function Products() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>Product Categories</Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {["Arabic", "Sushi", "Thai", "Korean", "Continental"].map((c) => (
          <Box key={c} sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
            <Typography variant="h6">{c}</Typography>
            <Typography variant="body2" color="text.secondary">
              Sample description for {c} ingredients.
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
