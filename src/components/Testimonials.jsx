import React from "react";
import Slider from "react-slick";
import { Box, Typography, Avatar, Paper, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/*
Testimonials data: replace with real testimonials later.
*/

const data = [
  { name: "Chef Arjun", company: "Fort Hotel", text: "Delux supplies authentic ingredients that my kitchen trusts.", avatar: "/testi1.jpg" },
  { name: "Caterer Noor", company: "Noor Caterers", text: "Reliable delivery and consistent quality.", avatar: "/testi2.jpg" },
  { name: "Restaurant Mia", company: "Mia Bistro", text: "Great selection of imported pantry items.", avatar: "/testi3.jpg" },
  { name: "Bakery House", company: "Sweet Spot", text: "Fresh and genuine bakery ingredients.", avatar: "/testi4.jpg" },
];

export default function Testimonials() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const settings = {
    slidesToShow: isSm ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3800,
    speed: 700,
    arrows: false,
    dots: false,
    infinite: true,
    centerMode: false,
  };

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 8 }, background: "transparent" }}>
      <Container>
        <Typography variant="h5" sx={{ color: "primary.main", fontWeight: 800, mb: 3, textAlign: "center" }}>
          What Our Clients Say
        </Typography>

        <Slider {...settings}>
          {data.map((t, i) => (
            <Box key={i} sx={{ px: 2 }}>
              <Paper elevation={2} sx={{ p: 3, minHeight: 160, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Avatar src={t.avatar} alt={t.name} sx={{ width: 56, height: 56 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>{t.name}</Typography>
                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{t.company}</Typography>
                  </Box>
                </Box>

                <Typography sx={{ mt: 2, color: "text.secondary" }}>"{t.text}"</Typography>
              </Paper>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
}
