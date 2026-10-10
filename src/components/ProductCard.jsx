import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { HiCheck, HiPlus } from "react-icons/hi";
import useEnquiry from "../enquiry/useEnquiry";
import { brand, fonts } from "../theme";

// Shown when a product has no photo yet: the brand (or product) name set as a label.
function NameTile({ product }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        backgroundColor: brand.ivory,
        backgroundImage: `linear-gradient(${brand.line}, ${brand.line})`,
        backgroundSize: "40px 1px",
        backgroundPosition: "center calc(50% + 30px)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography
        sx={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 24, lineHeight: 1.15, color: brand.ink, pb: 4 }}
      >
        {product.brands[0] ?? product.name}
      </Typography>
    </Box>
  );
}

export default function ProductCard({ product }) {
  const { has, add, remove } = useEnquiry();
  const [imgFailed, setImgFailed] = useState(false);
  const added = has(product.id);
  const details = product.variants.length ? product.variants : [];
  const badge = product.featured ? (product.origin ? `Imported from ${product.origin}` : "Featured") : null;

  return (
    <Box
      component="article"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: brand.paper,
        border: `1px solid ${product.featured ? brand.gold : brand.line}`,
        transition: "border-color .2s, box-shadow .2s",
        "&:hover": { borderColor: brand.gold, boxShadow: "0 10px 30px -18px rgba(28,38,33,.35)" },
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative", aspectRatio: "4 / 3", borderBottom: `1px solid ${brand.line}` }}>
        {product.image && !imgFailed ? (
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            sx={
              // Studio photos (ivory backdrop, 4:3) fill the frame; older cut-outs sit inside with padding.
              // Pinned to the 4:3 frame so every card's image area is the same height.
              product.image.startsWith("/images/products/")
                ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }
                : { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", p: 2.5 }
            }
          />
        ) : (
          <NameTile product={product} />
        )}
        {badge && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              px: 1,
              py: 0.25,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#fff",
              backgroundColor: brand.ink,
            }}
          >
            {badge}
          </Box>
        )}
      </Box>

      {/* Details */}
      <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
        {product.brands.length > 0 && (
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: brand.gold,
              mb: 0.5,
            }}
          >
            {product.brands.join(" · ")}
          </Typography>
        )}
        <Typography component="h3" sx={{ fontWeight: 600, fontSize: 15.5, lineHeight: 1.35, color: brand.text }}>
          {product.name}
        </Typography>

        {details.length > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.75,
              fontSize: 13,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {details.join(" · ")}
          </Typography>
        )}

        {product.packSizes.length > 0 && (
          <Stack direction="row" spacing={0.75} sx={{ mt: 1, flexWrap: "wrap", rowGap: 0.75 }}>
            {product.packSizes.map((s) => (
              <Box
                key={s}
                sx={{ fontSize: 12, px: 0.75, py: 0.125, border: `1px solid ${brand.line}`, color: brand.muted }}
              >
                {s}
              </Box>
            ))}
          </Stack>
        )}

        <Box sx={{ flex: 1 }} />
        <Button
          fullWidth
          variant={added ? "contained" : "outlined"}
          color="primary"
          onClick={() => (added ? remove(product.id) : add(product))}
          startIcon={added ? <HiCheck size={16} /> : <HiPlus size={16} />}
          aria-pressed={added}
          aria-label={`${added ? "Remove" : "Add"} ${product.name} ${added ? "from" : "to"} enquiry`}
          sx={{
            mt: 2,
            height: 38,
            ...(added ? {} : { borderColor: brand.line, "&:hover": { borderColor: brand.ink } }),
          }}
        >
          {/* Shorter label on phones, where cards sit two to a row. */}
          <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
            {added ? "Added" : "Add"}
          </Box>
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            {added ? "Added to enquiry" : "Add to enquiry"}
          </Box>
        </Button>
      </Box>
    </Box>
  );
}
