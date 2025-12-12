import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";

export default function About() {
  return (
    <Container sx={{ py: 8, pt: { xs: "90px", sm: "100px", md: "110px", lg: "120px" }, scrollMarginTop: { xs: "90px", sm: "100px", md: "110px", lg: "120px" } }} >
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "primary.main",
          mb: 4,
          textAlign: "center",
        }}
      >
         Who We Are ?
      </Typography>

      {/* Intro Paragraph */}
      <Typography
        variant="h6"
        sx={{
          color: "#2A342E",
          fontWeight: 500,
          lineHeight: 1.6,
          mb: 4,
          textAlign: "center",
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        Delux Enterprise is a trusted name in premium imported food ingredients,
        serving restaurants, cloud kitchens, home chefs, and retailers with
        authentic global pantry essentials. Located in the heart of Mumbai’s
        Crawford Market, we specialize in high-quality Arabic, Japanese,
        Korean, Continental and Bakery products sourced from renowned
        international brands.
      </Typography>

      {/* Mission Box */}
      <Box
        sx={{
          backgroundColor: "#E7D6A3",
          borderLeft: "8px solid #D5B36A",
          p: 4,
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#2A342E",
            mb: 1,
          }}
        >
          Our Mission
        </Typography>

        <Typography sx={{ color: "#2A342E", lineHeight: 1.7 }}>
          Our commitment is simple: deliver authentic flavors, consistent
          quality, and reliable service—every single time. From tahina to
          togarashi, kimchi to lotus biscoff, luncheon meats to premium coffee
          blends—Delux Enterprise brings the world’s finest ingredients under
          one roof, helping every kitchen create extraordinary culinary
          experiences without compromise.
        </Typography>
      </Box>

      {/* Why Choose Us */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: "primary.main",
          textAlign: "center",
        }}
      >
        Why Choose Us?
      </Typography>

      <Grid container spacing={4}>
        {[
          "Authentic Imported Products from trusted global manufacturers",
          "Wide Culinary Range — Arabic, Japanese, Korean, Bakery & Continental",
          "Premium Quality Control ensuring freshness & consistency",
          "Reliable Service with committed delivery",
          "Trusted Wholesale Partner for restaurants & businesses",
        ].map((point, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                p: 3,
                backgroundColor: "#fff",
                borderRadius: 2,
                border: "1px solid #D5B36A",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "#2A342E",
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                ✔ {point}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
