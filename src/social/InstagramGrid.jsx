import React, { useState } from "react";
import { Box, Button, Dialog, Grid, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import { HiPlay, HiX, HiChevronLeft, HiChevronRight, HiOutlineDuplicate } from "react-icons/hi";
import company from "../data/company";
import { brand, fonts } from "../theme";

const formatDate = (d) => (d ? d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "");

function TypeBadge({ type }) {
  if (type === "image") return null;
  const icon = type === "carousel" ? <HiOutlineDuplicate size={18} /> : <HiPlay size={18} />;
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        top: 10,
        right: 10,
        color: "#fff",
        display: "flex",
        filter: "drop-shadow(0 1px 3px rgba(0,0,0,.6))",
      }}
    >
      {icon}
    </Box>
  );
}

function PostTile({ post, onOpen }) {
  const label = post.type === "reel" ? "Reel" : post.type === "video" ? "Video" : "Post";
  return (
    <Box
      component="button"
      type="button"
      onClick={onOpen}
      aria-label={`Open ${label.toLowerCase()}${post.caption ? `: ${post.caption.slice(0, 80)}` : ""}`}
      sx={{
        all: "unset",
        boxSizing: "border-box",
        position: "relative",
        display: "block",
        width: "100%",
        aspectRatio: "4 / 5",
        cursor: "pointer",
        overflow: "hidden",
        backgroundColor: brand.line,
        "&:hover img, &:focus-visible img": { transform: "scale(1.03)" },
        "&:hover .caption, &:focus-visible .caption": { opacity: 1 },
        "&:focus-visible": { outline: `2px solid ${brand.gold}`, outlineOffset: 2 },
      }}
    >
      <Box
        component="img"
        src={post.image}
        alt=""
        loading="lazy"
        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .4s" }}
      />
      <TypeBadge type={post.type} />
      {post.caption && (
        <Box
          className="caption"
          sx={{
            position: "absolute",
            inset: 0,
            display: { xs: "none", md: "flex" },
            alignItems: "flex-end",
            p: 2,
            opacity: 0,
            transition: "opacity .25s",
            color: "#fff",
            background: "linear-gradient(to top, rgba(20,26,23,.85), rgba(20,26,23,0) 60%)",
          }}
        >
          <Typography
            sx={{
              fontSize: 13.5,
              lineHeight: 1.45,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.caption}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function Media({ item, isVideo, videoUrl }) {
  const sx = { width: "100%", height: "100%", objectFit: "contain", display: "block", backgroundColor: "#000" };
  return isVideo && videoUrl ? (
    <Box component="video" src={videoUrl} poster={item} controls autoPlay playsInline sx={sx} />
  ) : (
    <Box component="img" src={item} alt="" sx={sx} />
  );
}

function PostDialog({ post, onClose }) {
  const [slide, setSlide] = useState(0);
  if (!post) return null;
  const slides = post.type === "carousel" && post.children.length ? post.children : null;
  const current = slides ? slides[slide] : null;

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{ sx: { borderRadius: 0, overflow: "hidden", m: { xs: 1, sm: 4 }, width: { xs: "calc(100% - 16px)" } } }}
    >
      <Grid container sx={{ maxHeight: { md: "86vh" } }}>
        <Grid size={{ xs: 12, md: 7.5 }} sx={{ position: "relative", backgroundColor: "#000" }}>
          <Box sx={{ aspectRatio: "4 / 5", maxHeight: { xs: "60vh", md: "86vh" }, mx: "auto" }}>
            {current ? (
              <Media key={current.id} item={current.image} isVideo={current.isVideo} videoUrl={current.videoUrl} />
            ) : (
              <Media item={post.imageLarge} isVideo={Boolean(post.videoUrl)} videoUrl={post.videoUrl} />
            )}
          </Box>
          {slides && slides.length > 1 && (
            <>
              {[
                { dir: -1, icon: <HiChevronLeft size={22} />, side: { left: 8 }, label: "Previous" },
                { dir: 1, icon: <HiChevronRight size={22} />, side: { right: 8 }, label: "Next" },
              ].map(({ dir, icon, side, label }) => (
                <IconButton
                  key={label}
                  aria-label={`${label} image`}
                  onClick={() => setSlide((slide + dir + slides.length) % slides.length)}
                  sx={{ position: "absolute", top: "50%", transform: "translateY(-50%)", ...side, backgroundColor: "rgba(255,255,255,.85)", "&:hover": { backgroundColor: "#fff" } }}
                >
                  {icon}
                </IconButton>
              ))}
              <Typography sx={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center", color: "#fff", fontSize: 13 }}>
                {slide + 1} / {slides.length}
              </Typography>
            </>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 4.5 }} sx={{ display: "flex", flexDirection: "column", maxHeight: { md: "86vh" } }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2.5, py: 1.5, borderBottom: `1px solid ${brand.line}` }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FaInstagram size={18} color={brand.ink} />
              <Typography sx={{ fontWeight: 600, fontSize: 14.5 }}>@{company.instagramHandle}</Typography>
            </Stack>
            <IconButton aria-label="Close" onClick={onClose}>
              <HiX size={20} />
            </IconButton>
          </Stack>
          <Box sx={{ px: 2.5, py: 2, overflowY: "auto", flex: 1 }}>
            <Typography sx={{ fontSize: 12, color: brand.muted, mb: 1, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {post.type === "reel" ? "Reel" : post.type === "video" ? "Video" : "Post"} · {formatDate(post.date)}
            </Typography>
            <Typography sx={{ whiteSpace: "pre-line", fontSize: 15 }}>{post.caption}</Typography>
          </Box>
          <Box sx={{ p: 2.5, borderTop: `1px solid ${brand.line}` }}>
            <Button
              fullWidth
              variant="contained"
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<FaInstagram size={17} />}
            >
              View on Instagram
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export function FollowPanel({ compact }) {
  return (
    <Box
      sx={{
        border: `1px dashed ${brand.line}`,
        backgroundColor: brand.paper,
        textAlign: "center",
        py: compact ? 5 : 9,
        px: 3,
      }}
    >
      <FaInstagram size={30} color={brand.gold} />
      <Typography sx={{ fontFamily: fonts.serif, fontSize: compact ? 26 : 32, fontWeight: 600, color: brand.ink, mt: 1.5 }}>
        Follow @{company.instagramHandle}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 3, maxWidth: 460, mx: "auto" }}>
        New arrivals, product spotlights and recipe ideas, posted on Instagram.
      </Typography>
      <Button variant="contained" href={company.instagram} target="_blank" rel="noopener noreferrer" startIcon={<FaInstagram size={17} />}>
        Open Instagram
      </Button>
    </Box>
  );
}

export default function InstagramGrid({ feed, limit, columns = { xs: 6, sm: 4, md: 3 } }) {
  const [open, setOpen] = useState(null);

  if (feed.status === "loading") {
    return (
      <Grid container spacing={{ xs: 1, sm: 1.5 }}>
        {Array.from({ length: limit ?? 8 }, (_, i) => (
          <Grid key={i} size={columns}>
            <Skeleton variant="rectangular" sx={{ width: "100%", height: "auto", aspectRatio: "4 / 5" }} />
          </Grid>
        ))}
      </Grid>
    );
  }
  if (feed.status !== "ready") return <FollowPanel compact={Boolean(limit)} />;

  const posts = limit ? feed.posts.slice(0, limit) : feed.posts;
  return (
    <>
      <Grid container spacing={{ xs: 1, sm: 1.5 }}>
        {posts.map((p) => (
          <Grid key={p.id} size={columns}>
            <PostTile post={p} onOpen={() => setOpen(p)} />
          </Grid>
        ))}
      </Grid>
      {open && <PostDialog key={open.id} post={open} onClose={() => setOpen(null)} />}
    </>
  );
}
