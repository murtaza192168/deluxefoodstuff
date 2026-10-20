import React, { useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { HiOutlineSearch, HiOutlineClipboardList } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useEnquiry from "../enquiry/useEnquiry";
import catalogue from "../data/catalogue.json";
import { brand, fonts } from "../theme";

const { categories, products } = catalogue;
const allBrands = [...new Set(products.flatMap((p) => p.brands))].sort((a, b) =>
  a.localeCompare(b, undefined, { sensitivity: "base" })
);
const allCuisines = [...new Set(products.flatMap((p) => p.cuisines))].sort();

// Featured products first within each category, otherwise keep catalogue order.
const byFeatured = (a, b) => Number(b.featured) - Number(a.featured);

function matches(product, { query, brandFilter, cuisine }) {
  if (brandFilter && !product.brands.includes(brandFilter)) return false;
  if (cuisine && !product.cuisines.includes(cuisine)) return false;
  if (!query) return true;
  const haystack = [product.name, ...product.brands, ...product.variants, product.category, ...product.cuisines]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
}

function CategoryLink({ active, label, count, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      sx={{
        all: "unset",
        boxSizing: "border-box",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 2,
        width: "100%",
        py: 1,
        pl: 1.5,
        borderLeft: `2px solid ${active ? brand.gold : "transparent"}`,
        color: active ? brand.ink : brand.muted,
        fontWeight: active ? 600 : 400,
        fontSize: 14.5,
        "&:hover": { color: brand.ink },
        "&:focus-visible": { outline: `2px solid ${brand.gold}`, outlineOffset: 2 },
      }}
    >
      <span>{label}</span>
      <Box component="span" sx={{ fontSize: 12.5, color: brand.muted, fontWeight: 400 }}>
        {count}
      </Box>
    </Box>
  );
}

function CategoryChip({ active, label, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        all: "unset",
        cursor: "pointer",
        flexShrink: 0,
        px: 1.75,
        py: 0.75,
        fontSize: 13.5,
        whiteSpace: "nowrap",
        border: `1px solid ${active ? brand.ink : brand.line}`,
        backgroundColor: active ? brand.ink : brand.paper,
        color: active ? "#fff" : brand.text,
      }}
    >
      {label}
    </Box>
  );
}

function ProductGrid({ items }) {
  return (
    <Grid container spacing={{ xs: 1.5, sm: 2.5 }}>
      {items.map((p) => (
        <Grid key={p.id} size={{ xs: 6, sm: 4 }}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
}

export default function ProductsCatalog() {
  const [params, setParams] = useSearchParams();
  const activeCategory = categories.some((c) => c.id === params.get("category")) ? params.get("category") : null;
  // Brand lives in the URL (?brand=) so the Brands page can link straight to a brand's products.
  const brandFilter = allBrands.includes(params.get("brand")) ? params.get("brand") : null;
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const { count, setOpen } = useEnquiry();

  const filtered = useMemo(
    () => products.filter((p) => matches(p, { query: query.trim(), brandFilter, cuisine })),
    [query, brandFilter, cuisine]
  );

  const countByCategory = useMemo(() => {
    const counts = {};
    filtered.forEach((p) => (counts[p.category] = (counts[p.category] ?? 0) + 1));
    return counts;
  }, [filtered]);

  const sections = categories
    .filter((c) => !activeCategory || c.id === activeCategory)
    .map((c) => ({ ...c, items: filtered.filter((p) => p.category === c.name).sort(byFeatured) }))
    .filter((s) => s.items.length > 0);

  const shown = sections.reduce((n, s) => n + s.items.length, 0);
  // Matches outside the selected category, offered when the category itself has none.
  const elsewhere = activeCategory && shown === 0 ? filtered.length : 0;
  const hasFilters = Boolean(query || brandFilter || cuisine);

  const updateParams = (changes) => {
    const next = { category: activeCategory, brand: brandFilter, ...changes };
    setParams(Object.fromEntries(Object.entries(next).filter(([, v]) => v)), { replace: true });
  };

  const setBrandFilter = (value) => updateParams({ brand: value });

  const selectCategory = (id) => {
    updateParams({ category: id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setQuery("");
    setBrandFilter(null);
    setCuisine("");
  };

  return (
    <Box sx={{ pt: { xs: "96px", md: "140px" } }}>
      <Container maxWidth="lg">
        {/* Page header */}
        <Box sx={{ maxWidth: 720, mb: { xs: 4, md: 6 } }}>
          <Typography variant="overline" sx={{ color: brand.gold }}>
            Wholesale catalogue
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 44, md: 60 }, color: brand.ink, mb: 2 }}>
            Products
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: 15.5, md: 17 } }}>
            {products.length} products from {allBrands.length} brands across {categories.length} categories.
            Trade supply only: add items to your enquiry list and we will reply on WhatsApp with current
            prices and minimum order quantities.
          </Typography>
        </Box>

        {/* Filters */}
        <Grid
          container
          spacing={1.5}
          sx={{ pb: 3, mb: { xs: 2, md: 4 }, borderBottom: `1px solid ${brand.line}` }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search products, brands or variants"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <HiOutlineSearch size={18} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ backgroundColor: brand.paper }}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Autocomplete
              size="small"
              options={allBrands}
              value={brandFilter}
              onChange={(_, v) => setBrandFilter(v)}
              renderInput={(p) => <TextField {...p} placeholder="All brands" />}
              sx={{ backgroundColor: brand.paper }}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <TextField
              select
              fullWidth
              size="small"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              slotProps={{ select: { displayEmpty: true } }}
              sx={{ backgroundColor: brand.paper }}
            >
              <MenuItem value="">All cuisines</MenuItem>
              {allCuisines.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        {/* Mobile category chips */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: { xs: "flex", md: "none" },
            overflowX: "auto",
            mx: -2,
            px: 2,
            pb: 2,
            mb: 1,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <CategoryChip label="All" active={!activeCategory} onClick={() => selectCategory(null)} />
          {categories.map((c) => (
            <CategoryChip
              key={c.id}
              label={c.name}
              active={activeCategory === c.id}
              onClick={() => selectCategory(c.id)}
            />
          ))}
        </Stack>

        <Grid container spacing={{ xs: 0, md: 5 }}>
          {/* Desktop category list */}
          <Grid size={{ md: 3 }} sx={{ display: { xs: "none", md: "block" } }}>
            <Box component="nav" aria-label="Product categories" sx={{ position: "sticky", top: 132 }}>
              <Typography variant="overline" sx={{ color: brand.muted, display: "block", mb: 1 }}>
                Categories
              </Typography>
              <CategoryLink
                label="All products"
                count={filtered.length}
                active={!activeCategory}
                onClick={() => selectCategory(null)}
              />
              {categories.map((c) => (
                <CategoryLink
                  key={c.id}
                  label={c.name}
                  count={countByCategory[c.name] ?? 0}
                  active={activeCategory === c.id}
                  onClick={() => selectCategory(c.id)}
                />
              ))}
            </Box>
          </Grid>

          {/* Results */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, minHeight: 32 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {shown} {shown === 1 ? "product" : "products"}
              </Typography>
              {hasFilters && (
                <Button size="small" onClick={clearFilters} sx={{ color: brand.ink }}>
                  Clear filters
                </Button>
              )}
            </Stack>

            {sections.length === 0 ? (
              <Box sx={{ py: 10, textAlign: "center", border: `1px dashed ${brand.line}` }}>
                <Typography sx={{ fontFamily: fonts.serif, fontSize: 26, mb: 1 }}>No products found</Typography>
                <Typography color="text.secondary" sx={{ mb: 3, px: 2 }}>
                  {elsewhere
                    ? `Nothing in this category, but ${elsewhere} ${elsewhere === 1 ? "match" : "matches"} in other categories.`
                    : "Try a different search, or ask us on WhatsApp. We source more than we list."}
                </Typography>
                {elsewhere ? (
                  <Button variant="outlined" onClick={() => selectCategory(null)}>
                    Search all categories
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={clearFilters}>
                    Clear filters
                  </Button>
                )}
              </Box>
            ) : (
              sections.map((s) => (
                <Box key={s.id} component="section" sx={{ mb: { xs: 5, md: 7 } }}>
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    spacing={1.5}
                    sx={{ mb: 2, pb: 1, borderBottom: `1px solid ${brand.line}` }}
                  >
                    <Typography variant="h2" sx={{ fontSize: { xs: 26, md: 30 }, color: brand.ink }}>
                      {s.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {s.items.length}
                    </Typography>
                  </Stack>
                  <ProductGrid items={s.items} />
                </Box>
              ))
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile enquiry bar */}
      {count > 0 && (
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            left: 16,
            right: 16,
            bottom: 16,
            zIndex: 1100,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={<HiOutlineClipboardList size={20} />}
            sx={{ height: 50, boxShadow: "0 12px 30px -10px rgba(0,0,0,.45)" }}
          >
            View enquiry list ({count})
          </Button>
        </Box>
      )}
    </Box>
  );
}
