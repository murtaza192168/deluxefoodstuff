import React, { useEffect, useRef, useState } from "react";
import { Box, ButtonBase, IconButton, InputBase, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { HiCheck, HiOutlineChatAlt2, HiPaperAirplane, HiPlus, HiX } from "react-icons/hi";
import useEnquiry from "../enquiry/useEnquiry";
import { getAnalyticsConsent, onConsentChange } from "../privacy/consent";
import company from "../data/company";
import Logo from "/images/logo-192.webp";
import { brand, fonts } from "../theme";
import { answer } from "./engine";
import { starters } from "./faq";

const GREETING = {
  from: "bot",
  text: "Hello! I'm the Delux assistant. Ask me if we stock a product, or about prices, minimum orders and finding the shop. If I'm not sure, I'll pass you to our team on WhatsApp.",
  chips: starters,
};

const waLink = (text) => `${company.whatsapp}?text=${encodeURIComponent(text)}`;
const handoffText = (q) =>
  q ? `Hello ${company.name}, I asked on your website: "${q}"` : `Hello ${company.name}, I have a trade enquiry.`;

function ProductRow({ product, onNavigate }) {
  const { has, add } = useEnquiry();
  const added = has(product.id);
  return (
    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 1, backgroundColor: brand.paper, border: `1px solid ${brand.line}` }}>
      <Box sx={{ width: 52, height: 39, flexShrink: 0, backgroundColor: brand.ivory, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {product.image ? (
          <Box component="img" src={product.image} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <Typography aria-hidden sx={{ fontFamily: fonts.serif, fontSize: 22, fontWeight: 600, color: brand.gold }}>
            {(product.brands[0] ?? product.name).charAt(0)}
          </Typography>
        )}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {product.brands[0] && (
          <Typography sx={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: brand.gold }}>
            {product.brands[0]}
          </Typography>
        )}
        <Typography
          component={Link}
          to={product.brands[0] ? `/products?brand=${encodeURIComponent(product.brands[0])}` : "/products"}
          onClick={onNavigate}
          sx={{ display: "block", fontSize: 13, fontWeight: 600, lineHeight: 1.3, color: brand.text, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
        >
          {product.name}
        </Typography>
      </Box>
      <ButtonBase
        onClick={() => !added && add(product)}
        aria-label={added ? `${product.name} is in your enquiry list` : `Add ${product.name} to enquiry`}
        sx={{
          flexShrink: 0,
          px: 1,
          height: 30,
          gap: 0.5,
          fontSize: 12,
          fontWeight: 600,
          color: added ? "#fff" : brand.ink,
          backgroundColor: added ? brand.ink : "transparent",
          border: `1px solid ${added ? brand.ink : brand.line}`,
        }}
      >
        {added ? (
          <Box component="span" className="dl-tick">
            <HiCheck size={14} />
          </Box>
        ) : (
          <HiPlus size={14} />
        )}
        {added ? "Added" : "Add"}
      </ButtonBase>
    </Stack>
  );
}

function ActionLink({ action, onNavigate }) {
  const sx = {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.75,
    px: 1.25,
    py: 0.6,
    fontSize: 13,
    fontWeight: 600,
    color: brand.ink,
    border: `1px solid ${brand.ink}`,
    textDecoration: "none",
    "&:hover": { backgroundColor: brand.ink, color: "#fff" },
  };
  if (action.to)
    return (
      <Box component={Link} to={action.to} onClick={onNavigate} sx={sx}>
        {action.label}
      </Box>
    );
  return (
    <Box
      component="a"
      href={action.href}
      {...(action.download ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
      sx={sx}
    >
      {action.label}
    </Box>
  );
}

function HandoffButton({ question }) {
  return (
    <Box
      component="a"
      href={waLink(handoffText(question))}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 1.5,
        py: 0.85,
        fontSize: 13.5,
        fontWeight: 600,
        color: "#fff",
        backgroundColor: "#1F9D55",
        textDecoration: "none",
        "&:hover": { backgroundColor: "#188447" },
      }}
    >
      <FaWhatsapp size={16} /> Ask our team on WhatsApp
    </Box>
  );
}

function Bubble({ msg, onChip, onNavigate }) {
  const bot = msg.from === "bot";
  return (
    <Box sx={{ display: "flex", justifyContent: bot ? "flex-start" : "flex-end" }}>
      <Box sx={{ maxWidth: "88%" }}>
        <Box
          sx={{
            px: 1.5,
            py: 1.1,
            fontSize: 14,
            lineHeight: 1.55,
            color: bot ? brand.text : "#fff",
            backgroundColor: bot ? brand.paper : brand.ink,
            border: bot ? `1px solid ${brand.line}` : "none",
            whiteSpace: "pre-line",
          }}
        >
          {msg.text}
        </Box>
        {msg.products?.length > 0 && (
          <Stack spacing={0.75} sx={{ mt: 0.75 }}>
            {msg.products.map((p) => (
              <ProductRow key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </Stack>
        )}
        {(msg.actions?.length > 0 || msg.handoff) && (
          <Stack direction="row" sx={{ mt: 0.75, flexWrap: "wrap", gap: 0.75 }}>
            {msg.handoff && <HandoffButton question={msg.question} />}
            {msg.actions?.map((a) => (
              <ActionLink key={a.label} action={a} onNavigate={onNavigate} />
            ))}
          </Stack>
        )}
        {msg.chips && (
          <Stack direction="row" sx={{ mt: 1, flexWrap: "wrap", gap: 0.75 }}>
            {msg.chips.map((c) => (
              <ButtonBase
                key={c}
                onClick={() => onChip(c)}
                sx={{
                  px: 1.25,
                  py: 0.6,
                  fontSize: 13,
                  color: brand.ink,
                  border: `1px solid ${brand.gold}`,
                  backgroundColor: "rgba(184,145,63,.06)",
                  "&:hover": { backgroundColor: "rgba(184,145,63,.16)" },
                }}
              >
                {c}
              </ButtonBase>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

function Typing() {
  return (
    <Box aria-label="Assistant is typing" sx={{ display: "inline-flex", gap: 0.5, px: 1.5, py: 1.4, backgroundColor: brand.paper, border: `1px solid ${brand.line}` }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: brand.gold,
            animation: "dl-dot 1s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
            "@keyframes dl-dot": { "0%,80%,100%": { opacity: 0.25, transform: "none" }, "40%": { opacity: 1, transform: "translateY(-3px)" } },
            "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 0.6 },
          }}
        />
      ))}
    </Box>
  );
}

// Floating chat assistant. Answers common questions from src/assistant/faq.js and the
// catalogue, and hands anything it isn't sure about to the team on WhatsApp.
export default function ChatAssistant() {
  const { pathname } = useLocation();
  const { count, open: drawerOpen } = useEnquiry();
  const [choice, setChoice] = useState(() => getAnalyticsConsent());
  useEffect(() => onConsentChange(setChoice), []);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hint, setHint] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timer = useRef(0);

  // A gentle one-time "Questions? Ask here" hint per visit.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("delux-chat-hint") === "1";
    } catch {
      /* storage blocked */
    }
    if (seen) return;
    const show = setTimeout(() => setHint(true), 6000);
    const hide = setTimeout(() => setHint(false), 14000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);
  const dismissHint = () => {
    setHint(false);
    try {
      sessionStorage.setItem("delux-chat-hint", "1");
    } catch {
      /* storage blocked */
    }
  };

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const ask = (raw) => {
    const q = raw.trim().slice(0, 300);
    if (!q || typing) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text: q }]);
    setTyping(true);
    const reply = answer(q);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", question: q, ...reply }]);
    }, 450 + Math.min(700, reply.text.length * 4));
  };

  const bannerShowing = Boolean(company.gaMeasurementId) && !choice;
  if (bannerShowing || drawerOpen) return null;
  const raised = pathname === "/products" && count > 0;
  const closeOnMobile = () => window.matchMedia("(max-width: 599px)").matches && setOpen(false);

  return (
    <>
      {/* Launcher */}
      {!open && (
        <Box sx={{ position: "fixed", right: { xs: 16, md: 24 }, bottom: { xs: raised ? 82 : 16, md: 24 }, zIndex: 1100, transition: "bottom .2s" }}>
          {hint && (
            <Box
              className="dl-rise"
              onClick={dismissHint}
              sx={{
                position: "absolute",
                right: 0,
                bottom: "calc(100% + 10px)",
                whiteSpace: "nowrap",
                px: 1.5,
                py: 0.9,
                fontSize: 13.5,
                fontWeight: 500,
                color: brand.ink,
                backgroundColor: brand.paper,
                border: `1px solid ${brand.line}`,
                boxShadow: "0 10px 24px -14px rgba(0,0,0,.4)",
                cursor: "pointer",
              }}
            >
              Questions? Ask here
            </Box>
          )}
          <ButtonBase
            onClick={() => {
              dismissHint();
              setOpen(true);
              setTimeout(() => inputRef.current?.focus(), 250);
            }}
            aria-label="Open chat: ask us a question"
            sx={{
              width: { xs: 56, md: 60 },
              height: { xs: 56, md: 60 },
              borderRadius: "50%",
              color: brand.goldLight,
              backgroundColor: brand.ink,
              boxShadow: "0 12px 28px -8px rgba(0,0,0,.5)",
              border: `1.5px solid ${brand.gold}`,
              transition: "transform .2s",
              "&:hover": { transform: "scale(1.06)" },
              "&:focus-visible": { outline: `3px solid ${brand.gold}`, outlineOffset: 3 },
            }}
          >
            <HiOutlineChatAlt2 size={28} />
          </ButtonBase>
        </Box>
      )}

      {/* Panel (with a tap-to-close backdrop on phones) */}
      {open && (
        <Box
          onClick={() => setOpen(false)}
          aria-hidden
          sx={{ display: { xs: "block", sm: "none" }, position: "fixed", inset: 0, zIndex: 1299, backgroundColor: "rgba(28,38,33,.35)" }}
        />
      )}
      {open && (
        <Box
          role="dialog"
          aria-label="Chat with Delux Enterprise"
          className="dl-rise"
          sx={{
            position: "fixed",
            zIndex: 1300,
            right: { xs: 0, sm: 24 },
            left: { xs: 0, sm: "auto" },
            bottom: { xs: 0, sm: 24 },
            width: { xs: "100%", sm: 380 },
            height: { xs: "85dvh", sm: 580 },
            maxHeight: { sm: "calc(100dvh - 48px)" },
            display: "flex",
            flexDirection: "column",
            backgroundColor: brand.ivory,
            border: { sm: `1px solid ${brand.line}` },
            boxShadow: "0 24px 60px -20px rgba(0,0,0,.45)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.25} sx={{ px: 2, py: 1.5, backgroundColor: brand.ink, color: "#fff" }}>
            <Box component="img" src={Logo} alt="" sx={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#fff" }} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: fonts.serif, fontSize: 20, fontWeight: 600, lineHeight: 1.1 }}>Delux Assistant</Typography>
              <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>Instant answers · our team on WhatsApp</Typography>
            </Box>
            <IconButton onClick={() => setOpen(false)} aria-label="Close chat" sx={{ color: "rgba(255,255,255,.8)" }}>
              <HiX size={20} />
            </IconButton>
          </Stack>

          <Box ref={listRef} aria-live="polite" sx={{ flex: 1, overflowY: "auto", px: 1.75, py: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            {messages.map((m, i) => (
              <Bubble key={i} msg={m} onChip={ask} onNavigate={closeOnMobile} />
            ))}
            {typing && <Typing />}
          </Box>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 1.25, borderTop: `1px solid ${brand.line}`, backgroundColor: brand.paper }}
          >
            <InputBase
              inputRef={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a product or our shop"
              inputProps={{ "aria-label": "Your question", maxLength: 300 }}
              sx={{ flex: 1, fontSize: 15, px: 1 }}
            />
            <IconButton type="submit" aria-label="Send" disabled={!input.trim() || typing} sx={{ color: brand.ink }}>
              <HiPaperAirplane size={20} style={{ transform: "rotate(90deg)" }} />
            </IconButton>
          </Box>
          <Box sx={{ px: 2, pb: 1.25, pt: 0.25, backgroundColor: brand.paper, fontSize: 12, color: brand.muted, display: "flex", justifyContent: "space-between", gap: 1 }}>
            <span>Answers come from our catalogue and FAQ.</span>
            <Box component="a" href={waLink(handoffText())} target="_blank" rel="noopener noreferrer" sx={{ color: "#1F9D55", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
              Talk to a person
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
