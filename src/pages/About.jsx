import React from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import catalogue from "../data/catalogue.json";
import testimonials from "../data/testimonials";
import company from "../data/company";
import { brand, fonts } from "../theme";
import usePageMeta from "../seo/usePageMeta";
import { pageMeta } from "../seo/pageMeta";

const FOUNDED = 1986;
const IMPORTS_SINCE = 2000;
const yearsAtAddress = new Date().getFullYear() - FOUNDED;

const chapters = [
  {
    year: "1986",
    title: "It began with a kirana counter.",
    text: [
      "In 1986, our family opened a small kirana shop inside the third lane of Crawford Market. Rice, dal, spices, the everyday things a Mumbai kitchen runs on.",
      "What it had was a counter that opened every morning, and customers who learned that what they were promised was what they got.",
    ],
    image: "/images/home/dry-goods.webp",
    alt: "Shelves of pasta, rice, tea and spice mixes at the shop",
  },
  {
    year: "2000",
    title: "The kitchens changed. So did we.",
    text: [
      "By 2000 the city's kitchens were cooking the world. Chefs were asking for soy sauce from Hong Kong, tahina from the Middle East, pasta from Italy, syrups for a new kind of café.",
      "So the family turned its kirana into something new: a specialist in imported foodstuff. Same counter, same family. A very different pantry.",
    ],
    image: "/images/home/sauces.webp",
    alt: "Imported sauces, vinegars and oils on the shop's shelves",
  },
  {
    year: "Today",
    title: "One address. A world of ingredients.",
    text: [
      `Today ${company.name} | ${company.tradingName} supplies restaurants, hotels, cafés, resellers, bulk buyers and ship provisions with ${catalogue.products.length} products from ${catalogue.brands.length} international brands.`,
      "Crawford Market has seen empires rise and fall. We were here then. We are here now.",
    ],
    image: "/images/home/oils-syrups.webp",
    alt: "Monin syrups above a row of imported olive oils",
  },
];

const facts = [
  [String(FOUNDED), "Opened at Crawford Market"],
  [`${yearsAtAddress} yrs`, "At the same address"],
  [String(catalogue.products.length), "Imported products"],
  [String(catalogue.brands.length), "International brands"],
];

const serve = ["Restaurants & hotels", "Cafés & bakeries", "Resellers & bulk buyers", "Ship provisions"];

// Brands whose products are shown with photos on the site lead the list.
const brandsWithPhotos = [...new Set(catalogue.products.filter((p) => p.image).flatMap((p) => p.brands))];
const shelfBrands = [...new Set([...brandsWithPhotos, "Lee Kum Kee", "Monin", "Kikkoman", "Hershey's", "Knorr", "Reggia", "Twinings", "Kewpie"])];

const pageX = { px: { xs: 2, sm: 3 } };

function Overline({ children, light }) {
  return (
    <Typography variant="overline" sx={{ color: light ? brand.goldLight : brand.gold, display: "block" }}>
      {children}
    </Typography>
  );
}

export default function About() {
  usePageMeta({ ...pageMeta["/about"], path: "/about" });
  return (
    <Box sx={{ pt: { xs: "64px", md: "108px" } }}>
      {/* Opening */}
      <Box sx={{ position: "relative", minHeight: { xs: 520, md: 640 }, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <Box
          component="img"
          src="/images/home/storefront.webp"
          alt=""
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,26,23,.94) 10%, rgba(20,26,23,.55) 55%, rgba(20,26,23,.25))" }} />
        <Container maxWidth="lg" sx={{ ...pageX, position: "relative", pb: { xs: 6, md: 9 }, color: "#fff" }}>
          <Overline light>Our story · Since {FOUNDED}</Overline>
          <Typography variant="h1" sx={{ fontSize: { xs: 44, sm: 60, md: 80 }, maxWidth: 820, mt: 1, mb: 2.5 }}>
            Same counter. Same family. Since {FOUNDED}.
          </Typography>
          <Typography sx={{ fontSize: { xs: 16.5, md: 20 }, maxWidth: 620, color: "rgba(255,255,255,.82)" }}>
            From a neighbourhood kirana shop to a trusted wholesale source of imported ingredients, inside Crawford Market.
            Worldwide taste. Wholesale scale.
          </Typography>
        </Container>
      </Box>

      {/* Facts */}
      <Box sx={{ backgroundColor: brand.ink, color: "#fff", borderTop: `1px solid rgba(255,255,255,.08)` }}>
        <Container maxWidth="lg" sx={pageX}>
          <Grid container>
            {facts.map(([value, label], i) => (
              <Grid
                key={label}
                size={{ xs: 6, md: 3 }}
                sx={{
                  py: { xs: 3, md: 4 },
                  pl: { xs: i % 2 ? 2.5 : 0, md: i ? 3 : 0 },
                  borderLeft: { xs: i % 2 ? "1px solid rgba(255,255,255,.12)" : "none", md: i ? "1px solid rgba(255,255,255,.12)" : "none" },
                  borderTop: { xs: i > 1 ? "1px solid rgba(255,255,255,.12)" : "none", md: "none" },
                }}
              >
                <Typography sx={{ fontFamily: fonts.serif, fontSize: { xs: 34, md: 44 }, fontWeight: 600, lineHeight: 1, color: brand.goldLight }}>
                  {value}
                </Typography>
                <Typography sx={{ fontSize: 14, color: "rgba(255,255,255,.7)", mt: 1 }}>{label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Chapters */}
      <Container maxWidth="lg" sx={{ ...pageX, py: { xs: 8, md: 12 } }}>
        <Box sx={{ maxWidth: 680, mb: { xs: 6, md: 9 } }}>
          <Overline>Three chapters</Overline>
          <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 48 }, color: brand.ink }}>
            {yearsAtAddress} years in one of Mumbai's oldest markets
          </Typography>
        </Box>

        {chapters.map((c, i) => (
          <Grid
            key={c.year}
            container
            spacing={{ xs: 3, md: 8 }}
            alignItems="center"
            direction={{ xs: "column-reverse", md: i % 2 ? "row-reverse" : "row" }}
            sx={{ mb: { xs: 8, md: 12 }, "&:last-of-type": { mb: 0 } }}
          >
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                sx={{ fontFamily: fonts.serif, fontSize: { xs: 64, md: 96 }, fontWeight: 600, lineHeight: 0.9, color: brand.gold, mb: 2 }}
              >
                {c.year}
              </Typography>
              <Typography sx={{ fontFamily: fonts.serif, fontSize: { xs: 30, md: 38 }, fontWeight: 600, lineHeight: 1.15, color: brand.ink, mb: 2.5 }}>
                {c.title}
              </Typography>
              {c.text.map((t) => (
                <Typography key={t} color="text.secondary" sx={{ fontSize: { xs: 16, md: 17.5 }, mb: 2, maxWidth: 520 }}>
                  {t}
                </Typography>
              ))}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
              <Box
                component="img"
                src={c.image}
                alt={c.alt}
                loading="lazy"
                sx={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
            </Grid>
          </Grid>
        ))}
      </Container>

      {/* Quote */}
      <Box sx={{ backgroundColor: brand.paper, borderTop: `1px solid ${brand.line}`, borderBottom: `1px solid ${brand.line}` }}>
        <Container maxWidth="md" sx={{ ...pageX, py: { xs: 8, md: 11 }, textAlign: "center" }}>
          <Typography sx={{ fontFamily: fonts.serif, fontSize: { xs: 72, md: 96 }, lineHeight: 0.6, color: brand.gold }} aria-hidden>
            “
          </Typography>
          <Typography
            component="blockquote"
            sx={{ m: 0, fontFamily: fonts.serif, fontSize: { xs: 30, md: 44 }, fontWeight: 500, lineHeight: 1.25, color: brand.ink }}
          >
            We don't just stock products. We build relationships that last.
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 3, maxWidth: 560, mx: "auto" }}>
            Customers don't come back because they have to. They come back because we never give them a reason to leave.
          </Typography>
        </Container>
      </Box>

      {/* Who we serve + brands */}
      <Container maxWidth="lg" sx={{ ...pageX, py: { xs: 8, md: 12 } }}>
        <Grid container spacing={{ xs: 6, md: 8 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Overline>Who we serve</Overline>
            <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 42 }, color: brand.ink, mb: 3 }}>
              Kitchens that can't afford a missing ingredient
            </Typography>
            <Stack sx={{ borderTop: `1px solid ${brand.line}` }}>
              {serve.map((s) => (
                <Typography key={s} sx={{ py: 1.75, borderBottom: `1px solid ${brand.line}`, fontSize: 17, fontWeight: 500, color: brand.ink }}>
                  {s}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Overline>On our shelves</Overline>
            <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 42 }, color: brand.ink, mb: 2 }}>
              Brands kitchens ask for by name
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3.5 }}>
              Years of consistency earn more than orders. This year, gifts from Lee Kum Kee India and Chenab Impex
              arrived at our counter: a reminder of the relationships behind every shelf.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 1 }}>
              {shelfBrands.map((b) => (
                <Box
                  key={b}
                  component={Link}
                  to={`/products?brand=${encodeURIComponent(b)}`}
                  sx={{
                    fontFamily: fonts.serif,
                    fontSize: { xs: 22, md: 26 },
                    color: brand.ink,
                    textDecoration: "none",
                    "&:hover": { color: brand.gold },
                  }}
                >
                  {b}
                </Box>
              ))}
            </Box>
            <Box
              component={Link}
              to="/brands"
              sx={{ display: "inline-flex", alignItems: "center", gap: 1, mt: 3.5, color: brand.ink, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${brand.gold}`, pb: 0.5 }}
            >
              All {catalogue.brands.length} brands <HiArrowRight size={16} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials (shown once real, anonymised quotes are added to src/data/testimonials.js) */}
      {testimonials.length > 0 && (
        <Box sx={{ backgroundColor: brand.ink, color: "#fff", py: { xs: 8, md: 11 } }}>
          <Container maxWidth="lg" sx={pageX}>
            <Overline light>In their words</Overline>
            <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 42 }, mb: { xs: 4, md: 6 } }}>
              What our customers tell us
            </Typography>
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {testimonials.map((t) => (
                <Grid key={t.quote} size={{ xs: 12, md: 4 }}>
                  <Box sx={{ borderTop: `2px solid ${brand.goldLight}`, pt: 3, height: "100%" }}>
                    <Typography sx={{ fontFamily: fonts.serif, fontSize: { xs: 22, md: 24 }, lineHeight: 1.35, mb: 2.5 }}>
                      “{t.quote}”
                    </Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>{t.role}</Typography>
                    <Typography sx={{ fontSize: 13.5, color: "rgba(255,255,255,.6)" }}>{t.business}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Visit */}
      <Container maxWidth="lg" sx={{ ...pageX, py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: "center", maxWidth: 640, mx: "auto" }}>
          <Overline>Chapter four is yours</Overline>
          <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 48 }, color: brand.ink, mb: 2 }}>
            Come to the counter that started it all
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            {company.address.line1}, {company.address.line2} · {company.address.landmark}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<FaWhatsapp size={18} />}
              sx={{ height: 50 }}
            >
              WhatsApp us
            </Button>
            <Button variant="outlined" size="large" component={Link} to="/products" endIcon={<HiArrowRight size={18} />} sx={{ height: 50, borderColor: brand.ink }}>
              Browse the catalogue
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
