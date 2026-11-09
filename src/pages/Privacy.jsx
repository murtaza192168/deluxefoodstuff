import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import usePageMeta from "../seo/usePageMeta";
import { pageMeta } from "../seo/pageMeta";
import { setAnalyticsConsent } from "../privacy/consent";
import company from "../data/company";
import { brand, fonts } from "../theme";

const UPDATED = "9 November 2026";

function Section({ title, children }) {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography component="h2" sx={{ fontFamily: fonts.serif, fontSize: { xs: 26, md: 30 }, fontWeight: 600, color: brand.ink, mb: 1.5 }}>
        {title}
      </Typography>
      <Box sx={{ color: brand.text, "& p": { mb: 1.5, lineHeight: 1.75 }, "& li": { mb: 1, lineHeight: 1.7 }, "& ul": { pl: 3, mb: 1.5 } }}>{children}</Box>
    </Box>
  );
}

function DataTable() {
  const rows = [
    ["Enquiry form and enquiry list", "Your name, business name, type of business, city, and the products and quantities you ask about", "To reply to your enquiry with prices, availability and minimum order quantities"],
    ["Your WhatsApp message or email", "Your phone number or email address, and anything you write to us", "To talk to you about your enquiry and order"],
    ["Chat assistant", "The questions you type into the chat (answered on your own device, not sent to us or anyone else)", "To answer common questions instantly. Only if you tap \"Ask our team on WhatsApp\" is your question passed to WhatsApp for you to send"],
    ["Enquiry list in your browser", "The products you add (stored only on your own device, not sent to us)", "So your list is still there when you come back"],
    ["Google Analytics (only if you accept)", "Pages you view, approximate location, device and browser type, via cookies", "To understand which pages are useful and improve the website"],
  ];
  return (
    <Box sx={{ overflowX: "auto", mb: 2, border: `1px solid ${brand.line}`, backgroundColor: brand.paper }}>
      <Box component="table" sx={{ width: "100%", minWidth: 560, borderCollapse: "collapse", fontSize: 14.5, "& th, & td": { textAlign: "left", verticalAlign: "top", p: 1.75, borderBottom: `1px solid ${brand.line}` }, "& th": { fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: brand.muted } }}>
        <thead>
          <tr><th>Where</th><th>What we collect</th><th>Why</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>{r.map((c, i) => <td key={i} style={i === 0 ? { fontWeight: 600 } : undefined}>{c}</td>)}</tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
}

export default function Privacy() {
  usePageMeta({ ...pageMeta["/privacy"], path: "/privacy" });

  return (
    <Box sx={{ pt: { xs: "96px", md: "140px" } }}>
      <Container maxWidth="md" sx={{ pb: 4 }}>
        <Typography variant="overline" sx={{ color: brand.gold }}>Privacy Policy</Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: 40, md: 56 }, color: brand.ink, mb: 1.5 }}>Your data, and how we use it</Typography>
        <Typography color="text.secondary" sx={{ mb: 6 }}>
          Last updated: {UPDATED}. This policy explains what personal data {company.name} ({company.tradingName}) collects
          through deluxefoodstuff.online, why, and the choices and rights you have under India's Digital Personal Data
          Protection Act, 2023 and its Rules.
        </Typography>

        <Section title="Who we are">
          <p>
            {company.name}, {company.address.line1}, {company.address.line2}, {company.address.landmark}. GSTIN {company.gstin}. We are the
            "Data Fiduciary" for the personal data described here.
          </p>
        </Section>

        <Section title="What we collect and why">
          <DataTable />
          <p>
            We only ask for what we need to answer a trade enquiry. Name and products are required; business name,
            type of business and city are optional.
          </p>
        </Section>

        <Section title="How it reaches us">
          <p>
            The website does not store your enquiry on any server. When you press "Send", the website prepares a
            message on your own device and opens WhatsApp or your email app. Nothing is sent until you send that
            message yourself. We then receive it on our business WhatsApp or email.
          </p>
        </Section>

        <Section title="Your consent">
          <ul>
            <li>Before sending an enquiry, you tick a box agreeing that we may use your details only to reply to that enquiry.</li>
            <li>Analytics cookies are used only if you choose "Accept" on the cookie banner. If you decline, no analytics are collected.</li>
            <li>You can withdraw consent at any time, as easily as you gave it: message or email us (see "Contact for privacy"), or change your cookie choice below. Withdrawing does not affect anything done before.</li>
          </ul>
          <Button variant="outlined" onClick={() => { setAnalyticsConsent(null); window.scrollTo(0, 0); }} sx={{ borderColor: brand.ink, mt: 1 }}>
            Change my cookie choice
          </Button>
        </Section>

        <Section title="Who we share it with">
          <p>We do not sell or rent your personal data. It is handled by these services so the website and our replies work:</p>
          <ul>
            <li><b>WhatsApp (Meta)</b> or your email provider, which carry the messages you send us.</li>
            <li><b>Google Analytics</b>, only if you accept analytics cookies.</li>
            <li><b>Cloudflare</b>, which hosts the website and may keep short-term technical logs (such as IP addresses) for security.</li>
            <li><b>Behold</b>, which shows our Instagram posts on the website. It does not receive your enquiry details.</li>
            <li><b>Google Maps</b>, only if you tap "Show map" on the Contact page.</li>
          </ul>
          <p>We may also disclose data where Indian law requires it.</p>
        </Section>

        <Section title="How long we keep it">
          <p>
            We keep enquiry messages for as long as we need them to deal with your enquiry and any resulting order,
            and as required for tax and accounting records. When you ask us to erase your data, we will do so unless
            the law requires us to keep it. Your enquiry list in your browser stays on your device until you clear it.
          </p>
        </Section>

        <Section title="Your rights">
          <ul>
            <li><b>Access:</b> ask for a summary of the personal data we hold about you and how it is used.</li>
            <li><b>Correction and erasure:</b> ask us to correct, complete, update or delete your data.</li>
            <li><b>Withdraw consent</b> at any time.</li>
            <li><b>Grievance redressal:</b> raise a complaint with us, and we will respond within a reasonable time.</li>
            <li><b>Nominate</b> a person to exercise these rights for you in case of death or incapacity.</li>
            <li>If you are not satisfied with our response, you may complain to the <b>Data Protection Board of India</b>.</li>
          </ul>
        </Section>

        <Section title="Security">
          <p>
            The website uses HTTPS encryption. Enquiries are handled only by our family team for business purposes.
            If a personal data breach affecting you occurs, we will inform you and the Data Protection Board as the law
            requires.
          </p>
        </Section>

        <Section title="Children">
          <p>This website is for trade and business buyers. It is not meant for anyone under 18, and we do not knowingly collect their data.</p>
        </Section>

        <Section title="Contact for privacy">
          <p>
            For any privacy request, consent withdrawal or complaint, contact {company.name}:
            <br />
            Email: <a href={`mailto:${company.email}`}>{company.email}</a>
            <br />
            WhatsApp / phone: <a href={company.whatsapp} target="_blank" rel="noopener noreferrer">{company.phoneDisplay}</a>
            <br />
            Post: {company.address.line1}, {company.address.line2}, {company.address.landmark}
          </p>
        </Section>

        <Section title="Changes">
          <p>We may update this policy. The "Last updated" date at the top will always show the latest version.</p>
        </Section>
      </Container>
    </Box>
  );
}
