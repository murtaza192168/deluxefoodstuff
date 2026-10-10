import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
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

const productsById = Object.fromEntries(catalogue.products.map((p) => [p.id, p]));

function buildMessage(items, contact) {
  const lines = items.map((item, n) => {
    const details = [item.variant, item.packSize].filter(Boolean).join(", ");
    return `${n + 1}. ${item.name}${details ? ` (${details})` : ""} x ${item.qty}`;
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
    ...(who.length ? ["", ...who] : []),
  ].join("\n");
}

function QtyStepper({ value, onChange }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ border: `1px solid ${brand.line}`, borderRadius: 1, height: 36 }}
    >
      <IconButton size="small" aria-label="Decrease quantity" onClick={() => onChange(Math.max(1, value - 1))}>
        <HiMinus size={14} />
      </IconButton>
      <Box
        component="input"
        type="number"
        min={1}
        value={value}
        onChange={(e) => onChange(Math.max(1, parseInt(e.target.value, 10) || 1))}
        aria-label="Quantity"
        sx={{
          width: 40,
          border: 0,
          textAlign: "center",
          font: "inherit",
          fontSize: 14,
          background: "transparent",
          MozAppearance: "textfield",
          "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": { WebkitAppearance: "none" },
        }}
      />
      <IconButton size="small" aria-label="Increase quantity" onClick={() => onChange(value + 1)}>
        <HiPlus size={14} />
      </IconButton>
    </Stack>
  );
}

export default function EnquiryDrawer() {
  const { items, open, setOpen, update, remove, clear } = useEnquiry();
  const [contact, setContact] = useState({ name: "", business: "", city: "" });

  const whatsappUrl = useMemo(
    () => `${company.whatsapp}?text=${encodeURIComponent(buildMessage(items, contact))}`,
    [items, contact]
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
            items.map((item) => {
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
                    <QtyStepper value={item.qty} onChange={(qty) => update(item.id, { qty })} />
                  </Stack>
                </Box>
              );
            })
          )}
        </Box>

        {/* Send */}
        {items.length > 0 && (
          <Box sx={{ p: 3, borderTop: `1px solid ${brand.line}`, backgroundColor: brand.paper }}>
            <Stack spacing={1.25} sx={{ mb: 2 }}>
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
            <Button
              fullWidth
              variant="contained"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<FaWhatsapp size={18} />}
              sx={{ height: 48 }}
            >
              Send enquiry on WhatsApp
            </Button>
            <Button fullWidth size="small" onClick={clear} sx={{ mt: 1, color: brand.muted }}>
              Clear list
            </Button>
          </Box>
        )}
      </Stack>
    </Drawer>
  );
}
