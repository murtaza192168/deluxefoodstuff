import React, { useMemo, useState } from "react";
import { Box, Button, Container, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { HiOutlineSearch, HiArrowRight } from "react-icons/hi";
import catalogue from "../data/catalogue.json";
import { brand, fonts } from "../theme";

const { products, categories } = catalogue;

// One entry per brand with its product count and the categories it appears in.
const brandIndex = catalogue.brands.map((name) => {
  const items = products.filter((p) => p.brands.includes(name));
  const inCategories = categories.map((c) => c.name).filter((c) => items.some((p) => p.category === c));
  return { name, count: items.length, categories: inCategories };
});

// Group under the first letter, ignoring accents and punctuation ("St. Dalfour" → S).
const letterOf = (name) => name.normalize("NFD").replace(/[^A-Za-z0-9]/g, "").charAt(0).toUpperCase();
const letters = [...new Set(brandIndex.map((b) => letterOf(b.name)))].sort();

export default function Brands() {
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const visible = brandIndex.filter((b) => !q || b.name.toLowerCase().includes(q));
    return letters
      .map((letter) => ({ letter, brands: visible.filter((b) => letterOf(b.name) === letter) }))
      .filter((g) => g.brands.length > 0);
  }, [query]);

  const jumpTo = (letter) => {
    document.getElementById(`brands-${letter}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box sx={{ pt: { xs: "96px", md: "140px" } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ maxWidth: 720, mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: brand.gold }}>
            Brands
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 44, md: 60 }, color: brand.ink, mb: 2 }}>
            Brands we carry
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: 15.5, md: 17 } }}>
            {brandIndex.length} international brands, from Japanese and Thai kitchen staples to Italian pasta and
            café syrups. Choose a brand to see its products.
          </Typography>
        </Box>

        {/* Search and A–Z */}
        <Box
          sx={{
            position: "sticky",
            top: { xs: 64, md: 108 },
            zIndex: 2,
            backgroundColor: brand.ivory,
            py: 2,
            mb: 2,
            borderBottom: `1px solid ${brand.line}`,
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
            <TextField
              size="small"
              placeholder="Find a brand"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ backgroundColor: brand.paper, width: { xs: "100%", md: 280 }, flexShrink: 0 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <HiOutlineSearch size={18} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Box
              component="nav"
              aria-label="Jump to letter"
              sx={{
                display: "flex",
                flexWrap: { xs: "nowrap", md: "wrap" },
                overflowX: { xs: "auto", md: "visible" },
                gap: 0.5,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {letters.map((l) => {
                const enabled = groups.some((g) => g.letter === l);
                return (
                  <Box
                    key={l}
                    component="button"
                    type="button"
                    disabled={!enabled}
                    onClick={() => jumpTo(l)}
                    sx={{
                      all: "unset",
                      boxSizing: "border-box",
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 600,
                      color: enabled ? brand.ink : brand.line,
                      cursor: enabled ? "pointer" : "default",
                      border: `1px solid ${enabled ? brand.line : "transparent"}`,
                      "&:hover": enabled ? { borderColor: brand.gold, color: brand.gold } : {},
                      "&:focus-visible": { outline: `2px solid ${brand.gold}` },
                    }}
                  >
                    {l}
                  </Box>
                );
              })}
            </Box>
          </Stack>
        </Box>

        {/* Brand list */}
        {groups.length === 0 ? (
          <Box sx={{ py: 10, textAlign: "center", border: `1px dashed ${brand.line}` }}>
            <Typography sx={{ fontFamily: fonts.serif, fontSize: 26, mb: 1 }}>No brand found</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Looking for a brand we have not listed? Ask us on WhatsApp.
            </Typography>
            <Button variant="outlined" onClick={() => setQuery("")}>
              Show all brands
            </Button>
          </Box>
        ) : (
          groups.map((g) => (
            <Grid
              key={g.letter}
              id={`brands-${g.letter}`}
              container
              spacing={{ xs: 1, md: 4 }}
              sx={{ py: { xs: 3, md: 4 }, borderBottom: `1px solid ${brand.line}`, scrollMarginTop: { xs: 200, md: 190 } }}
            >
              <Grid size={{ xs: 12, md: 1.5 }}>
                <Typography sx={{ fontFamily: fonts.serif, fontSize: { xs: 36, md: 48 }, fontWeight: 600, color: brand.gold, lineHeight: 1 }}>
                  {g.letter}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 10.5 }}>
                <Grid container spacing={{ xs: 0, sm: 2 }}>
                  {g.brands.map((b) => (
                    <Grid key={b.name} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Box
                        component={Link}
                        to={`/products?brand=${encodeURIComponent(b.name)}`}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2,
                          py: 1.5,
                          px: { sm: 2 },
                          height: "100%",
                          textDecoration: "none",
                          color: "inherit",
                          borderBottom: { xs: `1px solid ${brand.line}`, sm: "none" },
                          border: { sm: `1px solid ${brand.line}` },
                          backgroundColor: { sm: brand.paper },
                          transition: "border-color .2s",
                          "&:hover": { borderColor: brand.gold },
                          "&:hover .arrow": { color: brand.gold, transform: "translateX(2px)" },
                        }}
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontFamily: fonts.serif, fontSize: 22, fontWeight: 600, color: brand.ink, lineHeight: 1.25 }}>
                            {b.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: 13 }}>
                            {b.count} {b.count === 1 ? "product" : "products"} · {b.categories.join(", ")}
                          </Typography>
                        </Box>
                        <Box className="arrow" sx={{ color: brand.muted, display: "flex", transition: "all .2s", flexShrink: 0 }}>
                          <HiArrowRight size={18} />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ))
        )}
      </Container>
    </Box>
  );
}
