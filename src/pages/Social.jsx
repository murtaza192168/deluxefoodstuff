import React, { useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import InstagramGrid from "../social/InstagramGrid";
import useInstagramFeed from "../social/useInstagramFeed";
import company from "../data/company";
import { brand } from "../theme";

const filters = [
  { id: "all", label: "All", test: () => true },
  { id: "reels", label: "Reels", test: (p) => p.type === "reel" || p.type === "video" },
  { id: "posts", label: "Posts", test: (p) => p.type === "image" || p.type === "carousel" },
];

const PAGE = 12;

export default function Social() {
  const feed = useInstagramFeed();
  const [filter, setFilter] = useState("all");
  const [shown, setShown] = useState(PAGE);

  const active = filters.find((f) => f.id === filter);
  const posts = feed.posts.filter(active.test);
  const visibleFeed = { ...feed, posts: posts.slice(0, shown) };

  return (
    <Box sx={{ pt: { xs: "96px", md: "140px" } }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ md: "flex-end" }}
          spacing={3}
          sx={{ mb: { xs: 4, md: 5 } }}
        >
          <Box sx={{ maxWidth: 680 }}>
            <Typography variant="overline" sx={{ color: brand.gold }}>
              Posts &amp; Reels
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: 44, md: 60 }, color: brand.ink, mb: 2 }}>
              From our Instagram
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: { xs: 15.5, md: 17 } }}>
              New arrivals, product spotlights and ideas from the shop. Updated automatically from @
              {company.instagramHandle}.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            href={company.instagram}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<FaInstagram size={17} />}
            sx={{ borderColor: brand.ink, flexShrink: 0, alignSelf: { xs: "flex-start", md: "auto" } }}
          >
            Follow on Instagram
          </Button>
        </Stack>

        {feed.status === "ready" && (
          <Stack direction="row" spacing={1} sx={{ mb: 3 }} role="tablist" aria-label="Filter posts">
            {filters.map((f) => {
              const selected = f.id === filter;
              return (
                <Box
                  key={f.id}
                  component="button"
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setFilter(f.id);
                    setShown(PAGE);
                  }}
                  sx={{
                    all: "unset",
                    cursor: "pointer",
                    px: 2,
                    py: 0.75,
                    fontSize: 14,
                    fontWeight: 600,
                    border: `1px solid ${selected ? brand.ink : brand.line}`,
                    backgroundColor: selected ? brand.ink : brand.paper,
                    color: selected ? "#fff" : brand.text,
                    "&:focus-visible": { outline: `2px solid ${brand.gold}`, outlineOffset: 2 },
                  }}
                >
                  {f.label}
                </Box>
              );
            })}
          </Stack>
        )}

        {feed.status === "ready" && posts.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 8, textAlign: "center" }}>
            Nothing here yet.
          </Typography>
        ) : (
          <InstagramGrid feed={visibleFeed} />
        )}

        {feed.status === "ready" && shown < posts.length && (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button variant="outlined" onClick={() => setShown(shown + PAGE)} sx={{ borderColor: brand.ink }}>
              Load more
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
