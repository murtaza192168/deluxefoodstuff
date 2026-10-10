import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import ProductCard from "../components/ProductCard";
import catalogue from "../data/catalogue.json";
import company from "../data/company";
import { brand, fonts } from "../theme";

const { categories, products, brands } = catalogue;

const featuredIds = ["nutella-hazelnut-spread", "lotus-biscoff-spread", "nescafe-coffee", "al-ameera-tahina-paste"];
const featured = featuredIds.map((id) => products.find((p) => p.id === id)).filter(Boolean);

const brandStrip = [
  "Lee Kum Kee", "Kikkoman", "Kewpie", "Monin", "Hershey's", "Nutella", "Lotus", "Nescafé", "Knorr",
  "Maggi", "Reggia", "Marini", "St. Dalfour", "Twinings", "Lipton", "Samyang", "Indomie", "Old El Paso",
  "Del Monte", "Quaker", "Capilano", "Urbani", "Lao Gan Ma", "Al Ameera",
];

const segments = [
  {
    title: "Restaurants & hotels",
    text: "Sauces, oils, rice, noodles and pastes in kitchen pack sizes for Asian, Middle Eastern and continental menus.",
  },
  {
    title: "Cafés & bakeries",
    text: "Monin and Hershey's syrups, Lotus Biscoff, Nutella, ladyfingers, condensed milk and coffee.",
  },
  {
    title: "Caterers & cloud kitchens",
    text: "Everyday staples in bulk, from stock powders and coconut milk to mayonnaise and ketchup.",
  },
  {
    title: "Retailers",
    text: "Imported brands for your shelves, supplied at trade rates with minimum order quantities.",
  },
];

const steps = [
  { title: "Build your list", text: "Add products from the catalogue, or simply message us what you need." },
  { title: "Get a trade quote", text: "We reply on WhatsApp with current prices, pack sizes and minimum order quantities." },
  { title: "Confirm your order", text: "Confirm on WhatsApp or by phone and we get your order ready." },
];

const shopPhotos = [
  {
    src: "/images/home/dry-goods.webp",
    alt: "Shelves of pasta, arborio rice, tea and spice mixes",
    caption: "Pasta, rice, tea and spice mixes",
  },
  {
    src: "/images/home/oils-syrups.webp",
    alt: "Monin syrups above a row of olive oils",
    caption: "Monin syrups and olive oils",
  },
  {
    src: "/images/home/premium.webp",
    alt: "Buono Tartufi black truffle sauce and whole black truffle jars",
    caption: "Italian truffle range",
  },
];

const pageX = { px: { xs: 2, sm: 3 } };

function SectionHeading({ overline, title, action }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "flex-end" }}
      spacing={2}
      sx={{ mb: { xs: 4, md: 5 } }}
    >
      <Box>
        <Typography variant="overline" sx={{ color: brand.gold }}>
          {overline}
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 46 }, color: brand.ink, maxWidth: 640 }}>
          {title}
        </Typography>
      </Box>
      {action}
    </Stack>
  );
}

function ArrowLink({ to, children }) {
  return (
    <Box
      component={Link}
      to={to}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        color: brand.ink,
        fontWeight: 600,
        fontSize: 15,
        textDecoration: "none",
        borderBottom: `1px solid ${brand.gold}`,
        pb: 0.5,
        whiteSpace: "nowrap",
        "&:hover svg": { transform: "translateX(3px)" },
        "& svg": { transition: "transform .2s" },
      }}
    >
      {children} <HiArrowRight size={16} />
    </Box>
  );
}

export default function Home() {
  return (
    <Box sx={{ pt: { xs: "64px", md: "108px" } }}>
      {/* Hero */}
      <Box sx={{ borderBottom: `1px solid ${brand.line}` }}>
        <Container maxWidth="lg" sx={pageX}>
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center" sx={{ py: { xs: 6, md: 10 } }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="overline" sx={{ color: brand.gold }}>
                Wholesale · Crawford Market, Mumbai
              </Typography>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: 46, sm: 60, md: 72 }, color: brand.ink, mt: 1, mb: 3, maxWidth: 640 }}
              >
                Imported ingredients for professional kitchens
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: { xs: 16, md: 18 }, maxWidth: 540, mb: 4 }}>
                {company.name} supplies restaurants, hotels, cafés, caterers and retailers with sauces, oils,
                noodles, spices, syrups and pantry staples from {brands.length} international brands.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  size="large"
                  endIcon={<HiArrowRight size={18} />}
                  sx={{ height: 52, px: 3.5 }}
                >
                  Browse the catalogue
                </Button>
                <Button
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="large"
                  startIcon={<FaWhatsapp size={18} />}
                  sx={{ height: 52, px: 3.5, borderColor: brand.ink }}
                >
                  WhatsApp us
                </Button>
              </Stack>

              {/* Facts */}
              <Grid container sx={{ mt: { xs: 6, md: 8 }, borderTop: `1px solid ${brand.line}` }}>
                {[
                  [products.length, "Products"],
                  [brands.length, "Brands"],
                  [categories.length, "Categories"],
                  ["Trade", "Prices on request"],
                ].map(([value, label]) => (
                  <Grid key={label} size={{ xs: 6, sm: 3 }} sx={{ pt: 2.5, pr: 2 }}>
                    <Typography sx={{ fontFamily: fonts.serif, fontSize: 34, fontWeight: 600, color: brand.ink, lineHeight: 1 }}>
                      {value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                      {label}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                component="img"
                src="/images/home/sauces.webp"
                alt={`Imported sauces, vinegars and oils on the shelves at ${company.name}`}
                sx={{
                  width: "100%",
                  aspectRatio: { xs: "4 / 3", md: "4 / 5" },
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Product ranges */}
      <Container maxWidth="lg" sx={{ ...pageX, py: { xs: 8, md: 12 } }}>
        <SectionHeading
          overline="Product ranges"
          title="Twelve ranges, one supplier"
          action={<ArrowLink to="/products">View all {products.length} products</ArrowLink>}
        />
        <Grid container sx={{ borderTop: `1px solid ${brand.line}`, borderLeft: `1px solid ${brand.line}` }}>
          {categories.map((c, i) => {
            const inCategory = products.filter((p) => p.category === c.name);
            const topBrands = [...new Set(inCategory.flatMap((p) => p.brands))].slice(0, 3);
            return (
              <Grid key={c.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  component={Link}
                  to={`/products?category=${c.id}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    minHeight: { xs: 0, md: 170 },
                    p: 3,
                    textDecoration: "none",
                    color: "inherit",
                    borderRight: `1px solid ${brand.line}`,
                    borderBottom: `1px solid ${brand.line}`,
                    backgroundColor: brand.paper,
                    transition: "background-color .2s",
                    "&:hover": { backgroundColor: brand.ivory },
                    "&:hover .arrow": { opacity: 1, transform: "translateX(0)" },
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                    <Typography sx={{ fontSize: 12, color: brand.muted, letterSpacing: "0.08em" }}>
                      {String(i + 1).padStart(2, "0")}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: brand.muted }}>{inCategory.length} products</Typography>
                  </Stack>
                  <Typography sx={{ fontFamily: fonts.serif, fontSize: 25, fontWeight: 600, lineHeight: 1.2, color: brand.ink, mt: 1.5 }}>
                    {c.name}
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ pr: 2 }}>
                      {topBrands.length ? topBrands.join(", ") : "Assorted brands"}
                    </Typography>
                    <Box
                      className="arrow"
                      sx={{ color: brand.gold, opacity: { xs: 1, md: 0 }, transform: "translateX(-4px)", transition: "all .2s", display: "flex" }}
                    >
                      <HiArrowRight size={18} />
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Brands */}
      <Box sx={{ backgroundColor: brand.ink, color: "#fff", py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg" sx={pageX}>
          <Grid container spacing={{ xs: 4, md: 8 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="overline" sx={{ color: brand.goldLight }}>
                Brands we carry
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 42 }, mb: 2 }}>
                {brands.length} brands from around the world
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
                Genuine imported products from established manufacturers in Japan, Korea, Thailand, the Middle
                East, Europe and the Americas.
              </Typography>
              <Box
                component={Link}
                to="/brands"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                  borderBottom: `1px solid ${brand.goldLight}`,
                  pb: 0.5,
                }}
              >
                View all brands <HiArrowRight size={16} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: { xs: 2.5, md: 3.5 }, rowGap: { xs: 1, md: 1.5 } }}>
                {brandStrip.map((b) => (
                  <Typography
                    key={b}
                    sx={{ fontFamily: fonts.serif, fontSize: { xs: 22, md: 28 }, fontWeight: 500, color: "rgba(255,255,255,0.88)" }}
                  >
                    {b}
                  </Typography>
                ))}
                <Typography sx={{ fontFamily: fonts.serif, fontSize: { xs: 22, md: 28 }, fontStyle: "italic", color: brand.goldLight }}>
                  and {brands.length - brandStrip.length} more
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* From the catalogue */}
      <Container maxWidth="lg" sx={{ ...pageX, py: { xs: 8, md: 12 } }}>
        <SectionHeading
          overline="From the catalogue"
          title="Favourites for desserts, cafés and kitchens"
          action={<ArrowLink to="/products">Browse products</ArrowLink>}
        />
        <Grid container spacing={{ xs: 1.5, sm: 2.5 }}>
          {featured.map((p) => (
            <Grid key={p.id} size={{ xs: 6, md: 3 }}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Who we supply */}
      <Box sx={{ backgroundColor: brand.paper, borderTop: `1px solid ${brand.line}`, borderBottom: `1px solid ${brand.line}` }}>
        <Container maxWidth="lg" sx={{ ...pageX, py: { xs: 8, md: 12 } }}>
          <SectionHeading overline="Who we supply" title="Built for businesses that cook and sell food" />
          <Grid container spacing={{ xs: 4, md: 5 }}>
            {segments.map((s) => (
              <Grid key={s.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ borderTop: `2px solid ${brand.gold}`, pt: 2.5 }}>
                  <Typography sx={{ fontFamily: fonts.serif, fontSize: 25, fontWeight: 600, color: brand.ink, mb: 1 }}>
                    {s.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 15 }}>
                    {s.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How ordering works */}
      <Container maxWidth="lg" sx={{ ...pageX, py: { xs: 8, md: 12 } }}>
        <SectionHeading overline="How ordering works" title="From enquiry to order in three steps" />
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {steps.map((s, i) => (
            <Grid key={s.title} size={{ xs: 12, md: 4 }}>
              <Stack direction="row" spacing={2.5}>
                <Typography sx={{ fontFamily: fonts.serif, fontSize: 56, fontWeight: 600, color: brand.gold, lineHeight: 0.9 }}>
                  {i + 1}
                </Typography>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 17, color: brand.ink, mb: 0.75 }}>{s.title}</Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 15 }}>
                    {s.text}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Inside the shop */}
      <Container maxWidth="lg" sx={{ ...pageX, pb: { xs: 8, md: 12 } }}>
        <SectionHeading overline="Inside the shop" title="Stocked from floor to ceiling" />
        <Grid container spacing={{ xs: 2, md: 2.5 }}>
          {shopPhotos.map((photo) => (
            <Grid key={photo.src} size={{ xs: 12, sm: 4 }}>
              <Box component="figure" sx={{ m: 0 }}>
                <Box
                  component="img"
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  sx={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" }}
                />
                <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1.25 }}>
                  {photo.caption}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Visit */}
      <Container maxWidth="lg" sx={{ ...pageX, pb: { xs: 2, md: 4 } }}>
        <Grid container sx={{ backgroundColor: brand.paper, border: `1px solid ${brand.line}` }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              component="img"
              src="/images/home/storefront.webp"
              alt={`${company.name}, shops 304 and 305 at Crawford Market`}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                minHeight: { xs: 220, md: 420 },
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ p: { xs: 3, md: 5 }, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography variant="overline" sx={{ color: brand.gold }}>
                Visit the shop
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: 32, md: 40 }, color: brand.ink, mb: 2 }}>
                Crawford Market, Mumbai
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 0.5 }}>
                {company.address.line1}
                <br />
                {company.address.line2}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                GSTIN {company.gstin}
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  variant="contained"
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<FaWhatsapp size={18} />}
                  sx={{ height: 46 }}
                >
                  {company.phoneDisplay}
                </Button>
                <Button
                  variant="outlined"
                  href={company.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ height: 46, borderColor: brand.ink }}
                >
                  Get directions
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
