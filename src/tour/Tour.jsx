import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { HiX } from "react-icons/hi";
import { brand, fonts } from "../theme";
import { markSeen } from "./seen";

// First-time guide. Points at elements marked with data-tour="..." one step at a time:
// a soft spotlight (optional), a small card with an arrow, and Next / Skip.
// Shown once per browser (localStorage); Esc or Skip ends it at any time.

const PAD = 6;
const GAP = 14;
const CARD_W = 300;

const findTarget = (step) => document.querySelector(`[data-tour="${step.target}"]`);

// Scroll only the panel that contains the element (e.g. the enquiry list), never the page behind it.
function bringIntoView(el) {
  let box = el.parentElement;
  while (box && box !== document.body) {
    const oy = getComputedStyle(box).overflowY;
    if ((oy === "auto" || oy === "scroll") && box.scrollHeight > box.clientHeight) break;
    box = box.parentElement;
  }
  if (!box || box === document.body) return;
  const r = el.getBoundingClientRect();
  const b = box.getBoundingClientRect();
  if (r.top >= b.top + 8 && r.bottom <= b.bottom - 8) return;
  const target = box.scrollTop + (r.top - b.top) - (b.height - Math.min(r.height, b.height)) / 2;
  box.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
}

export default function Tour({ steps, storageKey, open, onClose, spotlight = true, scroll = true }) {
  // Only steps whose element is on the page right now.
  const [active, setActive] = useState([]);
  const [i, setI] = useState(0);
  const [rect, setRect] = useState(null);

  useEffect(() => {
    if (!open) return;
    setActive(steps.filter((s) => findTarget(s)));
    setI(0);
  }, [open, steps]);

  const step = active[i];

  const finish = useCallback(() => {
    markSeen(storageKey);
    setActive([]);
    onClose?.();
  }, [storageKey, onClose]);

  const measure = useCallback(() => {
    const el = step && findTarget(step);
    if (!el) return setRect(null);
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step]);

  // Bring the step's element into view, then measure it.
  useLayoutEffect(() => {
    const el = step && findTarget(step);
    if (!el) return;
    if (scroll) bringIntoView(el);
    measure();
    const t = setTimeout(measure, 350);
    return () => clearTimeout(t);
  }, [step, measure, scroll]);

  useEffect(() => {
    if (!step) return;
    const onKey = (e) => e.key === "Escape" && finish();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("keydown", onKey);
    };
  }, [step, measure, finish]);

  if (!open || !step || !rect) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const cardW = Math.min(CARD_W, vw - 32);
  const below = rect.top + rect.height + GAP + 170 < vh || rect.top < 200;
  const top = below ? rect.top + rect.height + PAD + GAP : undefined;
  const bottom = below ? undefined : vh - rect.top + PAD + GAP;
  const centerX = rect.left + rect.width / 2;
  const left = Math.max(16, Math.min(vw - cardW - 16, centerX - cardW / 2));
  const arrowX = Math.max(18, Math.min(cardW - 18, centerX - left));
  const last = i === active.length - 1;

  return createPortal(
    <Box sx={{ position: "fixed", inset: 0, zIndex: 1500, pointerEvents: spotlight ? "auto" : "none" }}>
      {/* Spotlight: four dim panels around a clear window over the element. */}
      {spotlight &&
        (() => {
          const x1 = Math.max(0, rect.left - PAD);
          const y1 = Math.max(0, rect.top - PAD);
          const x2 = Math.min(vw, rect.left + rect.width + PAD);
          const y2 = Math.min(vh, rect.top + rect.height + PAD);
          const dim = { position: "fixed", backgroundColor: "rgba(28,38,33,.55)", transition: "all .35s cubic-bezier(.2,.8,.2,1)", "@media (prefers-reduced-motion: reduce)": { transition: "none" } };
          return (
            <>
              <Box aria-hidden sx={{ ...dim, top: 0, left: 0, width: vw, height: y1 }} />
              <Box aria-hidden sx={{ ...dim, top: y2, left: 0, width: vw, height: Math.max(0, vh - y2) }} />
              <Box aria-hidden sx={{ ...dim, top: y1, left: 0, width: x1, height: y2 - y1 }} />
              <Box aria-hidden sx={{ ...dim, top: y1, left: x2, width: Math.max(0, vw - x2), height: y2 - y1 }} />
            </>
          );
        })()}
      <Box
        aria-hidden
        sx={{
          position: "fixed",
          top: rect.top - PAD,
          left: rect.left - PAD,
          width: rect.width + PAD * 2,
          height: rect.height + PAD * 2,
          outline: `2px solid ${brand.gold}`,
          outlineOffset: 2,
          boxShadow: spotlight ? "none" : "0 0 0 6px rgba(184,145,63,.18)",
          transition: "all .35s cubic-bezier(.2,.8,.2,1)",
          pointerEvents: "none",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      />

      <Box
        role="dialog"
        aria-label={`Guide, step ${i + 1} of ${active.length}: ${step.title}`}
        className="dl-rise"
        key={step.target}
        sx={{
          position: "fixed",
          top,
          bottom,
          left,
          width: cardW,
          pointerEvents: "auto",
          backgroundColor: brand.ink,
          color: "#fff",
          p: 2,
          boxShadow: "0 18px 40px -14px rgba(0,0,0,.55)",
          borderTop: `2px solid ${brand.gold}`,
        }}
      >
        {/* Arrow */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: arrowX - 8,
            ...(below ? { top: -9 } : { bottom: -8 }),
            width: 16,
            height: 16,
            backgroundColor: below ? brand.gold : brand.ink,
            transform: "rotate(45deg)",
            ...(below ? { clipPath: "polygon(0 0, 100% 0, 0 100%)" } : { clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }),
          }}
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.75 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: brand.goldLight }}>
            {active.length > 1 ? `Step ${i + 1} of ${active.length}` : "Tip"}
          </Typography>
          <ButtonBase onClick={finish} aria-label="Close guide" sx={{ color: "rgba(255,255,255,.6)", p: 0.25, "&:hover": { color: "#fff" } }}>
            <HiX size={16} />
          </ButtonBase>
        </Stack>
        <Typography sx={{ fontFamily: fonts.serif, fontSize: 21, fontWeight: 600, lineHeight: 1.2, mb: 0.5 }}>{step.title}</Typography>
        <Typography sx={{ fontSize: 14, lineHeight: 1.55, color: "rgba(255,255,255,.8)" }}>{step.text}</Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1.75 }}>
          {active.length > 1 ? (
            <Stack direction="row" spacing={0.6} aria-hidden>
              {active.map((s, n) => (
                <Box key={s.target} sx={{ width: n === i ? 16 : 6, height: 6, borderRadius: 3, backgroundColor: n === i ? brand.gold : "rgba(255,255,255,.3)", transition: "width .25s" }} />
              ))}
            </Stack>
          ) : (
            <span />
          )}
          <Stack direction="row" spacing={1}>
            {active.length > 1 && !last && (
              <ButtonBase onClick={finish} sx={{ px: 1.25, height: 34, fontSize: 13, color: "rgba(255,255,255,.7)", "&:hover": { color: "#fff" } }}>
                Skip
              </ButtonBase>
            )}
            {i > 0 && (
              <ButtonBase onClick={() => setI(i - 1)} sx={{ px: 1.25, height: 34, fontSize: 13, fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,.3)" }}>
                Back
              </ButtonBase>
            )}
            <ButtonBase
              autoFocus
              onClick={() => (last ? finish() : setI(i + 1))}
              sx={{ px: 1.75, height: 34, fontSize: 13, fontWeight: 600, color: brand.ink, backgroundColor: brand.gold, "&:hover": { backgroundColor: brand.goldLight } }}
            >
              {last ? (active.length > 1 ? "Got it" : "OK") : "Next"}
            </ButtonBase>
          </Stack>
        </Stack>
      </Box>
    </Box>,
    document.body
  );
}
