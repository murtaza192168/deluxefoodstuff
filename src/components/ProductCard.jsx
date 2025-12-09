// src/components/ProductCard.jsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

export default function ProductCard({ item }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={item.img}
        alt={item.name}
        sx={{
          height: 180,
          objectFit: "contain",
          p: 2,
          background: "#fff",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 700, color: "#2A342E" }}
        >
          {item.name}
        </Typography>

        {item.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {item.description}
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
          {item.unit && (
            <Chip
              label={item.unit}
              size="small"
              sx={{
                bgcolor: "#E7D6A3",
                fontWeight: 600,
              }}
            />
          )}
        </Box>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#2A342E",
            color: "white",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#1E2723" },
          }}
          href={`https://wa.me/919324789432?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(
            item.name
          )}`}
        >
          Enquire
        </Button>
      </Box>
    </Card>
  );
}
