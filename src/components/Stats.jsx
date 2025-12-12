import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import CountUp from "react-countup";
import { useTheme } from "@mui/material/styles";

const stats = [
  { label: "Restaurants & Hotels", value: 1250 },
  { label: "Caterers Supplied", value: 820 },
  { label: "Years in Market", value: 30 },
  { label: "Products", value: 480 },
];

export default function Stats() {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 8 }, background: "transparent" }}>
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {stats.map((s, idx) => (
            <Grid item xs={6} sm={3} key={idx}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h4" sx={{ color: "primary.main", fontWeight: 800 }}>
                  <CountUp end={s.value} duration={2.5} separator="," />
                </Typography>
                <Typography sx={{ mt: 1, color: "text.secondary" }}>{s.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
