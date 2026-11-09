import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Drawer,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { HiX, HiMinus, HiPlus, HiOutlineTrash } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import useEnquiry from "./useEnquiry";
import catalogue from "../data/catalogue.json";
import company from "../data/company";
import { brand, fonts } from "../theme";
import ConsentCheckbox from "../privacy/ConsentCheckbox";

const productsById = Object.fromEntries(catalogue.products.map((p) => [p.id, p]));

const UNITS = [
  { id: "carton", one: "carton", many: "cartons", label: "Cartons" },
  { id: "pc", one: "piece", many: "pieces", label: "Pieces" },
];
const QUICK = [1, 5, 10, 25, 50];
const MAX_QTY = 9999;
const unitOf = (item) => UNITS.find((u) => u.id === item.unit) ?? UNITS[0];
const clampQty = (n) => Math.min(MAX_QTY, Math.max(1, n));

function buildMessage(items, contact, note) {
  const lines = items.map((item, n) => {
    const details = [item.variant, item.packSize].filter(Boolean).join(", ");
    const u = unitOf(item);
    return `${n + 1}. ${item.name}${details ? ` (${details})` : ""}: ${item.qty} ${item.qty === 1 ? u.one : u.many}`;
  });
  const who = [
    contact.name && `Name: ${contact.name}`,
    contact.business && `Business: ${contact.business}`,
    contact.city && `City: ${contact.city}`,
  ].filter(Boolean);
  return [
    `Hello ${company.name}, I would like a trade quote for:`,
    "",
    ...lines,
    ...(note.trim() ? ["", `Note: ${note.trim()}`] : []),
    ...(who.length ? ["", ...who] : []),
  ].join("\n");
}

function UnitToggle({ value, onChange }) {
  return (
    <Stack direction="row" role="radiogroup" aria-label="Unit" sx={{ border: `1px solid ${brand.line}`, height: 36 }}>
      {UNITS.map((u) => {
        const on = value === u.id;
        return (
          <ButtonBase
            key={u.id}
            role="radio"
            aria-checked={on}
            onClick={() => onChange(u.id)}
            sx={{
              px: 1.5,
              fontSize: 13,
              fontWeight: 600,
              color: on ? "#fff" : brand.muted,
              backgroundColor: on ? brand.ink : "transparent",
              transition: "background-color .15s, color .15s",
            }}
          >
            {u.label}
          </ButtonBase>
        );
      })}
    </Stack>
  );
}

function QtyStepper({ value, onChange }) {
  const [draft, setDraft] = useState(null); // lets the box be cleared while typing
  const step = (d) => onChange(clampQty(value + d));
  return (
    <Stack direction="row" alignItems="center" sx={{ border: `1px solid ${brand.line}`, height: 36 }}>
      <IconButton size="small" aria-label="Decrease quantity" onClick={() => step(-1)} disabled={value <= 1}>
        <HiMinus size={14} />
      </IconButton>
      <Box
        component="input"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={draft ?? value}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
          setDraft(digits);
          if (digits) onChange(clampQty(parseInt(digits, 10)));
        }}
        onBlur={() => setDraft(null)}
        aria-label="Quantity"
        sx={{ width: 52, border: 0, textAlign: "center", font: "inherit", fontSize: 15, fontWeight: 600, background: "transparent", outline: "none" }}
      />
      <IconButton size="small" aria-label="Increase quantity" onClick={() => step(1)}>
        <HiPlus size={14} />
      </IconButton>
    </Stack>
  );
}

function QuickPicks({ value, onPick, label = "Quick quantity" }) {
  return (
    <Stack direction="row" role="group" aria-label={label} sx={{ gap: 0.75, flexWrap: "wrap" }}>
      {QUICK.map((n) => {
        const on = value === n;
        return (
          <ButtonBase
            key={n}
            onClick={() => onPick(n)}
            aria-pressed={on}
            sx={{
              minWidth: 44,
              height: 32,
              px: 1,
              fontSize: 13.5,
              fontWeight: 600,
              color: on ? "#fff" : brand.ink,
              backgroundColor: on ? brand.gold : brand.paper,
              border: `1px solid ${on ? brand.gold : brand.line}`,
              "&:hover": { borderColor: brand.gold },
            }}
          >
            {n}
          </ButtonBase>
        );
      })}
    </Stack>
  );
}

export default function EnquiryDrawer() {
  const { items, open, setOpen, update, remove, clear } = useEnquiry();
  const [contact, setContact] = useState({ name: "", business: "", city: "" });
  const [note, setNote] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [tried, setTried] = useState(false);

  const whatsappUrl = useMemo(
    () => `${company.whatsapp}?text=${encodeURIComponent(buildMessage(items, contact, note))}`,
    [items, contact, note]
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{ sx: { width: "min(100vw, 440px)", backgroundColor: brand.ivory } }}
    >
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 3, py: 2, borderBottom: `1px solid ${brand.line}` }}
        >
          <Box>
            <Typography sx={{ fontFamily: fonts.serif, fontSize: 26, fontWeight: 600, lineHeight: 1.2 }}>
              Enquiry list
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {items.length} {items.length === 1 ? "product" : "products"} · trade prices on request
            </Typography>
          </Box>
          <IconButton aria-label="Close enquiry list" onClick={() => setOpen(false)}>
            <HiX size={22} />
          </IconButton>
        </Stack>

        {/* Items */}
        <Box sx={{ flex: 1, overflowY: "auto", px: 3 }}>
          {items.length === 0 ? (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography sx={{ fontFamily: fonts.serif, fontSize: 22, mb: 1 }}>Your list is empty</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add products from the catalogue, then send the whole list to us on WhatsApp for a quote.
              </Typography>
              <Button component={Link} to="/products" variant="outlined" onClick={() => setOpen(false)}>
                Browse products
              </Button>
            </Box>
          ) : (
            <>
              {items.length > 1 && (
                <Box sx={{ mt: 2.5, p: 1.75, backgroundColor: brand.paper, border: `1px dashed ${brand.gold}` }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: brand.gold, mb: 1 }}>
                    Same for every product
                  </Typography>
                  <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                    <UnitToggle
                      value={items.every((i) => unitOf(i).id === unitOf(items[0]).id) ? unitOf(items[0]).id : null}
                      onChange={(unit) => items.forEach((i) => update(i.id, { unit }))}
                    />
                    <QuickPicks
                      label="Set the same quantity for every product"
                      value={items.every((i) => i.qty === items[0].qty) ? items[0].qty : null}
                      onPick={(qty) => items.forEach((i) => update(i.id, { qty }))}
                    />
                  </Stack>
                </Box>
              )}
              {items.map((item) => {
                const product = productsById[item.id];
                return (
                  <Box key={item.id} sx={{ py: 2.5, borderBottom: `1px solid ${brand.line}` }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                      <Box>
                        {product?.brands.length > 0 && (
                          <Typography sx={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: brand.muted }}>
                            {product.brands.join(" · ")}
                          </Typography>
                        )}
                        <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                      </Box>
                      <IconButton size="small" aria-label={`Remove ${item.name}`} onClick={() => remove(item.id)}>
                        <HiOutlineTrash size={18} />
                      </IconButton>
                    </Stack>

                    {(product?.variants.length > 0 || product?.packSizes.length > 0) && (
                      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 1.5, flexWrap: "wrap", rowGap: 1.5 }}>
                        {product?.variants.length > 0 && (
                          <TextField
                            select
                            size="small"
                            label="Variant"
                            value={item.variant}
                            onChange={(e) => update(item.id, { variant: e.target.value })}
                            sx={{ minWidth: 130 }}
                          >
                            {product.variants.map((v) => (
                              <MenuItem key={v} value={v}>{v}</MenuItem>
                            ))}
                          </TextField>
                        )}
                        {product?.packSizes.length > 0 && (
                          <TextField
                            select
                            size="small"
                            label="Pack"
                            value={item.packSize}
                            onChange={(e) => update(item.id, { packSize: e.target.value })}
                            sx={{ minWidth: 100 }}
                          >
                            {product.packSizes.map((s) => (
                              <MenuItem key={s} value={s}>{s}</MenuItem>
                            ))}
                          </TextField>
                        )}
                      </Stack>
                    )}

                    <Stack direction="row" sx={{ mt: 1.5, gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                      <UnitToggle value={unitOf(item).id} onChange={(unit) => update(item.id, { unit })} />
                      <QtyStepper value={item.qty} onChange={(qty) => update(item.id, { qty })} />
                    </Stack>
                    <Box sx={{ mt: 1 }}>
                      <QuickPicks value={item.qty} onPick={(qty) => update(item.id, { qty })} />
                    </Box>
                  </Box>
                );
              })}
              <Box sx={{ py: 2.5 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: brand.muted, mb: 1.5 }}>
                  Your details
                </Typography>
                <Stack spacing={1.25} sx={{ mb: 2 }}>
                  <TextField
                    size="small"
                    label="Note (optional)"
                    placeholder="e.g. other products, delivery date, carton size"
                    multiline
                    maxRows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value.slice(0, 500))}
                  />
                  <TextField
                    size="small"
                    label="Your name"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  />
                  <Stack direction="row" spacing={1.25}>
                    <TextField
                      size="small"
                      label="Business"
                      fullWidth
                      value={contact.business}
                      onChange={(e) => setContact({ ...contact, business: e.target.value })}
                    />
                    <TextField
                      size="small"
                      label="City"
                      fullWidth
                      value={contact.city}
                      onChange={(e) => setContact({ ...contact, city: e.target.value })}
                    />
                  </Stack>
                </Stack>
                <Box id="enquiry-consent" sx={{ mb: 2, scrollMarginBottom: 24 }}>
                  <ConsentCheckbox compact checked={agreed} onChange={setAgreed} error={tried && !agreed} onNavigate={() => setOpen(false)} />
                </Box>
              </Box>
            </>
          )}
        </Box>

        {/* Send */}
        {items.length > 0 && (
          <Box sx={{ px: 3, pt: 2, pb: 1.5, borderTop: `1px solid ${brand.line}`, backgroundColor: brand.paper }}>
            <Button
              fullWidth
              variant="contained"
              href={agreed ? whatsappUrl : undefined}
              onClick={(e) => {
                setTried(true);
                if (!agreed) {
                  e.preventDefault();
                  document.getElementById("enquiry-consent")?.scrollIntoView({ behavior: "smooth", block: "end" });
                }
              }}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<FaWhatsapp size={18} />}
              sx={{ height: 48 }}
            >
              Send enquiry on WhatsApp
            </Button>
            <Button fullWidth size="small" onClick={clear} sx={{ mt: 0.5, color: brand.muted }}>
              Clear list
            </Button>
          </Box>
        )}
      </Stack>
    </Drawer>
  );
}
