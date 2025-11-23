// src/pages/ProductsCatalog.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.data.json"; // relative path

function CategoryPanel({ items }) {
  return (
    <Grid container spacing={3}>
      {items.map((it) => (
        <Grid key={it.name} item xs={12} sm={6} md={4}>
          <ProductCard item={it} />
        </Grid>
      ))}
    </Grid>
  );
}

export default function ProductsCatalog() {
  const categories = productsData.map((c) => c.category);
  const [tab, setTab] = useState(0);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Product Catalogue
      </Typography>

      {/* Category tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((cat) => (
            <Tab
              key={cat}
              label={cat}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                color: "primary.main",
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Active category items */}
      <Box>
        <CategoryPanel items={productsData[tab].items} />
      </Box>
    </Container>
  );
}
