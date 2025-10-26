import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Home() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Deluxe Food Stuff</Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Authentic Ingredients. Global Flavours. Trusted Supply.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/products">Explore Products</Button>
    </Container>
  );
}

function Products() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>Product Categories</Typography>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        {["Arabic", "Sushi", "Thai", "Korean", "Continental"].map(c => (
          <Box key={c} sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
            <Typography variant="h6">{c}</Typography>
            <Typography variant="body2" color="text.secondary">Sample description for {c} ingredients.</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default function App() {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Deluxe Food Stuff</Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/products">Products</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Container sx={{ py:6 }}><Typography variant="h4">Contact</Typography></Container>} />
      </Routes>
    </>
  );
}
