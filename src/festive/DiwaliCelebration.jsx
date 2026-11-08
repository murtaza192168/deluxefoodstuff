import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import company from "../data/company";
import { brand, fonts } from "../theme";

// Shown only during the festival window (India time), once per browser session.
const START = "2026-11-01T00:00:00+05:30";
const END = "2026-11-15T00:00:00+05:30";
const SEEN_KEY = "delux-diwali-2026-seen";

const COLORS = ["#F5C452", "#FFB347", "#FF7A2F", "#E9D3A0", "#C0392B", "#FFE8A3", "#F28C28"];
const SHOW_MS = 6500;

function inFestivalWindow(now = Date.now()) {
  return now >= Date.parse(START) && now < Date.parse(END);
}

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage blocked: the greeting may show again on reload, which is harmless.
  }
}

// Canvas fireworks: rockets rise from the bottom and burst into falling sparks.
function useFireworks(canvasRef, active) {
  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rockets = [];
    const sparks = [];
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const launch = () => {
      rockets.push({
        x: width * (0.15 + Math.random() * 0.7),
        y: height,
        vy: -(height * 0.011 + Math.random() * height * 0.004),
        targetY: height * (0.15 + Math.random() * 0.35),
        color: pick(COLORS),
      });
    };
    const burst = (x, y, color) => {
      const count = 60 + Math.floor(Math.random() * 40);
      const speed = 2.2 + Math.random() * 2.4;
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count;
        const v = speed * (0.55 + Math.random() * 0.45);
        sparks.push({ x, y, vx: Math.cos(angle) * v, vy: Math.sin(angle) * v, life: 1, color: Math.random() < 0.25 ? pick(COLORS) : color });
      }
    };

    let frame = 0;
    let raf;
    const started = performance.now();
    const tick = (t) => {
      // Fade the previous frame for light trails.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const elapsed = t - started;
      if (elapsed < SHOW_MS - 2200 && frame % 22 === 0) launch();
      frame += 1;

      for (let i = rockets.length - 1; i >= 0; i -= 1) {
        const r = rockets[i];
        r.y += r.vy;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        if (r.y <= r.targetY) {
          burst(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }
      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        s.vy += 0.035;
        s.vx *= 0.985;
        s.vy *= 0.985;
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(s.life, 0);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, active]);
}

function Diya() {
  return (
    <Box
      component="svg"
      viewBox="0 0 120 90"
      aria-hidden
      sx={{
        width: { xs: 96, md: 120 },
        height: "auto",
        overflow: "visible",
        "& .flame": { transformOrigin: "60px 40px", animation: "flicker 1.2s ease-in-out infinite alternate" },
        "& .glow": { animation: "glow 1.6s ease-in-out infinite alternate" },
        "@keyframes flicker": {
          "0%": { transform: "scale(1, 1) rotate(-2deg)" },
          "50%": { transform: "scale(0.94, 1.08) rotate(2deg)" },
          "100%": { transform: "scale(1.04, 0.96) rotate(-1deg)" },
        },
        "@keyframes glow": { "0%": { opacity: 0.45 }, "100%": { opacity: 0.85 } },
      }}
    >
      <defs>
        <radialGradient id="diya-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD86B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFD86B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diya-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#FF7A2F" />
          <stop offset="60%" stopColor="#FFC24A" />
          <stop offset="100%" stopColor="#FFF4C2" />
        </linearGradient>
        <linearGradient id="diya-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9A441" />
          <stop offset="100%" stopColor="#8E4A1C" />
        </linearGradient>
      </defs>
      <circle className="glow" cx="60" cy="34" r="34" fill="url(#diya-glow)" />
      <path className="flame" d="M60 8 C 70 24, 70 36, 60 44 C 50 36, 50 24, 60 8 Z" fill="url(#diya-flame)" />
      <path d="M14 50 Q 60 46 106 50 Q 98 80 60 82 Q 22 80 14 50 Z" fill="url(#diya-body)" />
      <path d="M14 50 Q 60 46 106 50 Q 60 58 14 50 Z" fill="#6B2A2E" />
      <path d="M26 64 Q 60 72 94 64" stroke="#F5C452" strokeWidth="2" fill="none" strokeDasharray="2 5" />
    </Box>
  );
}

export default function DiwaliCelebration() {
  const [open, setOpen] = useState(() => inFestivalWindow() && !alreadySeen());
  const [leaving, setLeaving] = useState(false);
  const canvasRef = useRef(null);
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useFireworks(canvasRef, open && !reduceMotion);

  const close = useCallback(() => {
    setLeaving(true);
    setTimeout(() => setOpen(false), 600);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    markSeen();
    const timer = setTimeout(close, SHOW_MS);
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <Box
      role="dialog"
      aria-modal="true"
      aria-label="Happy Diwali from Delux Enterprise"
      onClick={close}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: "radial-gradient(ellipse at center, rgba(40,24,10,.88), rgba(10,12,11,.94))",
        opacity: leaving ? 0 : 1,
        transition: "opacity .6s ease",
        animation: "festiveIn .5s ease",
        "@keyframes festiveIn": { from: { opacity: 0 }, to: { opacity: 1 } },
      }}
    >
      <Box component="canvas" ref={canvasRef} aria-hidden sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: "relative",
          textAlign: "center",
          color: "#fff",
          maxWidth: 480,
          px: { xs: 3, md: 5 },
          py: { xs: 4, md: 5 },
          border: `1px solid rgba(217,190,124,.45)`,
          background: "linear-gradient(180deg, rgba(28,38,33,.75), rgba(28,38,33,.55))",
          backdropFilter: "blur(2px)",
          boxShadow: "0 30px 80px -30px rgba(255,170,60,.45)",
          animation: "cardIn .7s .2s both cubic-bezier(.2,.8,.2,1)",
          "@keyframes cardIn": { from: { opacity: 0, transform: "translateY(16px) scale(.97)" }, to: { opacity: 1, transform: "none" } },
        }}
      >
        <Diya />
        <Typography sx={{ fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", color: brand.goldLight, mt: 1.5 }}>
          Shubh Deepavali
        </Typography>
        <Typography sx={{ fontFamily: fonts.serif, fontSize: { xs: 40, md: 52 }, fontWeight: 600, lineHeight: 1.05, mt: 1, mb: 2 }}>
          Happy Diwali
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,.82)", fontSize: { xs: 15, md: 16.5 }, mb: 3.5 }}>
          Wishing you light, flavour and prosperity.
          <br />
          From the {company.name} family, Crawford Market, since 1986.
        </Typography>
        <Button
          autoFocus
          disableFocusRipple
          variant="contained"
          onClick={close}
          sx={{ backgroundColor: brand.goldLight, color: brand.ink, height: 46, px: 4, "&:hover": { backgroundColor: "#E9CF8E" } }}
        >
          Enter website
        </Button>
      </Box>
    </Box>
  );
}
