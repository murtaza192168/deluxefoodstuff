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
import productsData from "../data/products.data.json";

function CategoryPanel({ items }) {
  return (
    <Grid container spacing={4} justifyContent="center">
      {items.map((it) => (
        <Grid key={it.name} item xs={12} sm={6} md={4} lg={3} xl={3}>
          <ProductCard item={it} />
        </Grid>
      ))}
    </Grid>
  );
}

export default function ProductsCatalog() {
  const categories = productsData.map((c) => c.category);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "primary.main",
          textAlign: "center",
          mb: 4,
        }}
      >
        Product Catalogue
      </Typography>

      {/* Category Tabs */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          mb: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              fontSize: "15px",
            },
            "& .Mui-selected": { color: "#D5B36A !important" },
          }}
        >
          {categories.map((cat) => (
            <Tab key={cat} label={cat} />
          ))}
        </Tabs>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 5, display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "450px",
            padding: "14px 20px",
            fontSize: "16px",
            borderRadius: "30px",
            border: "2px solid #C2A05B",
            outline: "none",
            color: "#2A342E",
          }}
        />
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Product Grid */}
      <CategoryPanel
        items={productsData[tab].items.filter((it) =>
          it.name.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </Container>
  );
}
