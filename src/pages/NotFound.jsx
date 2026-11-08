import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import usePageMeta from "../seo/usePageMeta";
import { brand } from "../theme";

export default function NotFound() {
  usePageMeta({
    title: "Page not found | Delux Enterprise",
    description: "This page does not exist. Browse our imported food catalogue or contact Delux Enterprise, Crawford Market, Mumbai.",
    path: "/",
    noindex: true,
  });
  return (
    <Box sx={{ pt: { xs: "96px", md: "140px" } }}>
      <Container maxWidth="sm" sx={{ textAlign: "center", py: { xs: 8, md: 12 } }}>
        <Typography variant="overline" sx={{ color: brand.gold }}>
          Page not found
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: 40, md: 56 }, color: brand.ink, mb: 2 }}>
          This shelf is empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          The page you were looking for doesn't exist. Try the catalogue instead.
        </Typography>
        <Button component={Link} to="/products" variant="contained" size="large">
          Browse products
        </Button>
      </Container>
    </Box>
  );
}
