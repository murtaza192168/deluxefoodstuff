import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker, HiPlus, HiArrowRight } from "react-icons/hi";
import useEnquiry from "../enquiry/useEnquiry";
import company from "../data/company";
import { brand, fonts } from "../theme";

const businessTypes = [
  "Restaurant / Hotel",
  "Café / Bakery",
  "Caterer / Cloud kitchen",
  "Retailer / Distributor",
  "Other",
];

// Answers are taken from the wholesale catalogue's own terms; nothing beyond them is promised.
const faqs = [
  {
    q: "Who do you supply?",
    a: "We are a wholesale supplier. Enquiries are for trade customers such as restaurants, hotels, cafés, caterers, cloud kitchens and retailers.",
  },
  {
    q: "How do I get prices?",
    a: "Pricing is trade-only and depends on order quantity. Send us your list on WhatsApp or call, and we will reply with the current rates.",
  },
  {
    q: "Is there a minimum order?",
    a: "Yes. Minimum order quantities apply and vary by product. We confirm them together with your quote.",
  },
  {
    q: "Are other pack sizes available?",
    a: "Pack sizes vary by item, and additional pack options are available on request. Mention the size you need in your enquiry.",
  },
];

// Links open in a new window: mailto:/tel: links that replace the current page are
// blocked when the site is shown inside an embedded preview.
function ContactRow({ icon, label, children, href, action }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ borderBottom: `1px solid ${brand.line}` }}>
      <Box
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          gap: 2,
          py: 2.5,
          color: "inherit",
          textDecoration: "none",
          "&:hover .value": { color: brand.gold },
        }}
      >
        <Box sx={{ color: brand.gold, pt: 0.25, flexShrink: 0 }}>{icon}</Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: brand.muted }}>
            {label}
          </Typography>
          <Box className="value" sx={{ fontSize: 16, color: brand.ink, mt: 0.25, overflowWrap: "anywhere", transition: "color .2s" }}>
            {children}
          </Box>
        </Box>
      </Box>
      {action}
    </Stack>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API unavailable (older browser or blocked frame): fall back to a hidden textarea.
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button size="small" variant="outlined" onClick={copy} sx={{ flexShrink: 0, borderColor: brand.line, minWidth: 76 }}>
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

function buildMessage(form) {
  const details = [
    `Name: ${form.name}`,
    form.business && `Business: ${form.business}`,
    form.type && `Type: ${form.type}`,
    form.city && `City: ${form.city}`,
  ].filter(Boolean);
  return [`Hello ${company.name}, I have a trade enquiry.`, ...details, "", "Products needed:", form.products].join("\n");
}

export default function Contact() {
  const { count, setOpen } = useEnquiry();
  const [form, setForm] = useState({ name: "", business: "", type: "", city: "", products: "" });
  const [touched, setTouched] = useState(false);
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const valid = form.name.trim() && form.products.trim();
  const message = buildMessage(form);

  const send = (e) => {
    setTouched(true);
    if (!valid) e.preventDefault();
  };

  return (
    <Box sx={{ pt: { xs: "96px", md: "140px" } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ maxWidth: 720, mb: { xs: 5, md: 8 } }}>
          <Typography variant="overline" sx={{ color: brand.gold }}>
            Contact
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 44, md: 60 }, color: brand.ink, mb: 2 }}>
            Talk to us
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: 15.5, md: 17 } }}>
            Trade and wholesale enquiries only. Message us for current prices, availability and minimum order
            quantities. WhatsApp is the quickest way to reach us.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 6, md: 8 }}>
          {/* Contact details */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Button
              fullWidth
              variant="contained"
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<FaWhatsapp size={20} />}
              sx={{ height: 54, fontSize: 16, mb: 1 }}
            >
              Chat on WhatsApp
            </Button>

            <Box sx={{ borderTop: `1px solid ${brand.line}`, mt: 2 }}>
              <ContactRow icon={<HiOutlinePhone size={22} />} label="Call / WhatsApp" href={`tel:${company.phoneTel}`}>
                {company.phoneDisplay}
              </ContactRow>
              <ContactRow
                icon={<HiOutlineMail size={22} />}
                label="Email"
                href={`mailto:${company.email}`}
                action={<CopyButton text={company.email} />}
              >
                {company.email}
              </ContactRow>
              <ContactRow
                icon={<HiOutlineLocationMarker size={22} />}
                label="Shop · Get directions"
                href={company.mapUrl}
              >
                {company.address.line1}
                <br />
                {company.address.line2}
              </ContactRow>
              <ContactRow icon={<FaInstagram size={20} />} label="Instagram" href={company.instagram}>
                @info.deluxfoodstuff
              </ContactRow>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2.5 }}>
              {company.name} | {company.tradingName}
              <br />
              GSTIN {company.gstin}
            </Typography>
          </Grid>

          {/* Enquiry form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              component="form"
              noValidate
              onSubmit={(e) => e.preventDefault()}
              sx={{ backgroundColor: brand.paper, border: `1px solid ${brand.line}`, p: { xs: 2.5, sm: 4 } }}
            >
              <Typography sx={{ fontFamily: fonts.serif, fontSize: 30, fontWeight: 600, color: brand.ink, lineHeight: 1.2 }}>
                Send an enquiry
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
                Fill this in and it opens WhatsApp with your message ready to send.
              </Typography>

              {count > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    flexWrap: "wrap",
                    p: 2,
                    mb: 3,
                    backgroundColor: brand.ivory,
                    border: `1px solid ${brand.gold}`,
                  }}
                >
                  <Typography variant="body2">
                    You have {count} {count === 1 ? "product" : "products"} in your enquiry list.
                  </Typography>
                  <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
                    Send the list instead
                  </Button>
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    required
                    label="Your name"
                    value={form.name}
                    onChange={set("name")}
                    error={touched && !form.name.trim()}
                    helperText={touched && !form.name.trim() ? "Please enter your name" : " "}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Business name" value={form.business} onChange={set("business")} helperText=" " />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField select fullWidth label="Type of business" value={form.type} onChange={set("type")}>
                    {businessTypes.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="City" value={form.city} onChange={set("city")} />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    minRows={4}
                    label="Products and quantities you need"
                    placeholder={"e.g. Kikkoman Soy Sauce, 1 carton\nMonin Caramel Syrup 700 ml, 6 bottles"}
                    value={form.products}
                    onChange={set("products")}
                    error={touched && !form.products.trim()}
                    helperText={touched && !form.products.trim() ? "Tell us what you need" : " "}
                  />
                </Grid>
              </Grid>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  size="large"
                  href={valid ? `${company.whatsapp}?text=${encodeURIComponent(message)}` : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={send}
                  startIcon={<FaWhatsapp size={18} />}
                  sx={{ height: 50, flex: 1 }}
                >
                  Send on WhatsApp
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href={
                    valid
                      ? `mailto:${company.email}?subject=${encodeURIComponent("Trade enquiry")}&body=${encodeURIComponent(message)}`
                      : undefined
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={send}
                  startIcon={<HiOutlineMail size={18} />}
                  sx={{ height: 50, flex: 1, borderColor: brand.ink }}
                >
                  Send by email
                </Button>
              </Stack>

              <Box
                component={Link}
                to="/products"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  mt: 3,
                  fontSize: 14,
                  color: brand.muted,
                  textDecoration: "none",
                  "&:hover": { color: brand.ink },
                }}
              >
                <HiPlus size={14} /> Or pick products from the catalogue <HiArrowRight size={14} />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* FAQ */}
        <Grid container spacing={{ xs: 3, md: 8 }} sx={{ mt: { xs: 8, md: 12 } }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="overline" sx={{ color: brand.gold }}>
              Good to know
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 42 }, color: brand.ink }}>
              Trade terms
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ borderTop: `1px solid ${brand.line}` }}>
              {faqs.map((f) => (
                <Accordion
                  key={f.q}
                  disableGutters
                  elevation={0}
                  square
                  sx={{
                    backgroundColor: "transparent",
                    borderBottom: `1px solid ${brand.line}`,
                    "&::before": { display: "none" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<HiPlus size={18} />}
                    sx={{
                      px: 0,
                      py: 1,
                      "& .MuiAccordionSummary-expandIconWrapper": { color: brand.gold },
                      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": { transform: "rotate(45deg)" },
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: 17, color: brand.ink }}>{f.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, pt: 0, pb: 3 }}>
                    <Typography color="text.secondary">{f.a}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
