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
  // item: { name, description, img, unit, hs_code, gst, price }
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>
      <CardMedia
        component="img"
        image={item.img}
        alt={item.name}
        sx={{ height: 160, objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom color="primary.main">
          {item.name}
        </Typography>
        {item.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {item.description}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
          {item.unit && <Chip label={item.unit} size="small" sx={{ bgcolor: "#E7D6A3" }} />}
          {item.hs_code && <Chip label={`HS: ${item.hs_code}`} size="small" />}
          {item.gst && <Chip label={`${item.gst}% GST`} size="small" />}
        </Box>

        {item.price && (
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "secondary.main" }}>
            {item.price}
          </Typography>
        )}
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            "&:hover": { backgroundColor: "#424942ff" },
          }}
          href={`https://wa.me/919324789432?subject=Enquiry:%20${encodeURIComponent(item.name)}`}
        >
          Enquire
        </Button>
      </Box>
    </Card>
  );
}
