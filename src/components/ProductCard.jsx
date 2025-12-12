import React, { useRef, useEffect, useState } from "react";
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
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (imgRef.current) observer.observe(imgRef.current);
  }, []);

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
      {/* LAZY LOAD IMAGE WRAPPER */}
      <Box
        ref={imgRef}
        sx={{
          width: "100%",
          height: 220,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderBottom: "1px solid #eee",
        }}
      >
        {isVisible && (
          <CardMedia
            component="img"
            src={item.img}
            alt={item.name}
            onLoad={() => setLoaded(true)}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          />
        )}
      </Box>

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
              sx={{ bgcolor: "#E7D6A3", fontWeight: 600 }}
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
          href={`https://wa.me/919324789432?text=${encodeURIComponent(
            `Can I get details about this product: ${item.name}?`
          )}`}
          target="_blank"
        >
          Enquire
        </Button>
      </Box>
    </Card>
  );
}
