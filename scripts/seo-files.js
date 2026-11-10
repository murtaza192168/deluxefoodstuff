// Build step (vite plugin): after the site is built, write
//  - one HTML file per page (about.html, products.html ...) whose <head> already has that
//    page's title, description, canonical URL and Open Graph / Twitter tags, so link previews
//    on WhatsApp, Facebook, LinkedIn and X show the right page without running JavaScript;
//  - llms.txt and llms-full.txt, plain-text guides to the business for AI assistants
//    (https://llmstxt.org), generated from the catalogue so they never go out of date.
import fs from "node:fs";
import path from "node:path";
import catalogue from "../src/data/catalogue.json";
import company from "../src/data/company.js";
import { pageMeta } from "../src/seo/pageMeta.js";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setTag(html, re, tag) {
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function pageHtml(base, route, { title, description }) {
  const url = company.siteUrl + (route === "/" ? "/" : route);
  let h = base;
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  h = setTag(h, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" />`);
  h = setTag(h, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  h = setTag(h, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`);
  h = setTag(h, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(description)}" />`);
  h = setTag(h, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  h = setTag(h, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(title)}" />`);
  h = setTag(h, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(description)}" />`);
  return h;
}

const { products, categories, brands } = catalogue;
const site = company.siteUrl;
const a = company.address;

function facts() {
  return [
    `- Also known as: ${company.tradingName}`,
    `- Address: ${a.line1}, ${a.line2} (landmark: ${a.landmark}). Map: ${company.mapUrl}`,
    `- WhatsApp / phone: ${company.phoneDisplay} (${company.whatsapp})`,
    `- Email: ${company.email}`,
    `- Instagram: ${company.instagram}`,
    `- GSTIN: ${company.gstin}`,
    "- Family business at Crawford Market since 1986; importing food ingredients since 2000.",
    "- Trade supply for restaurants and hotels, cafés and bakeries, caterers and cloud kitchens, resellers and bulk buyers, and ship provisions.",
    "- Prices are not published because they change with each import shipment. Current trade prices, pack sizes and minimum order quantities are given on request over WhatsApp.",
    "- How to order: 1) build a list on the website's Products page or message what you need, 2) receive a trade quote on WhatsApp, 3) confirm on WhatsApp or by phone and the order is made ready.",
    `- Shop timings: ${company.hours.days}, ${company.hours.display} (India time). ${company.hours.closedNote}.`,
    "- Delivery and payment terms are confirmed by the team on WhatsApp.",
  ].join("\n");
}

function header() {
  return [
    `# ${company.name}`,
    "",
    `> Family-run wholesale supplier of imported food ingredients at M. J. Phule Market (Crawford Market), Mumbai, India, since 1986. ${products.length} products from ${brands.length} international brands across ${categories.length} ranges, for professional kitchens and resellers.`,
    "",
    facts(),
  ].join("\n");
}

function pagesSection() {
  const lines = Object.entries(pageMeta)
    .filter(([p]) => p !== "/privacy")
    .map(([p, m]) => `- [${m.title.split(" | ")[0]}](${site}${p}): ${m.description}`);
  return ["## Pages", "", ...lines].join("\n");
}

function rangesSection() {
  const lines = categories.map((c) => {
    const items = products.filter((p) => p.category === c.name);
    const top = [...new Set(items.flatMap((p) => p.brands))].slice(0, 6);
    return `- [${c.name}](${site}/products?category=${c.id}): ${items.length} products${top.length ? `, brands include ${top.join(", ")}` : ""}`;
  });
  return ["## Product ranges", "", ...lines].join("\n");
}

function llmsTxt() {
  return [
    header(),
    "",
    pagesSection(),
    "",
    rangesSection(),
    "",
    "## Optional",
    "",
    `- [Full product list](${site}/llms-full.txt): every product with brand, variants and pack sizes`,
    `- [Catalogue PDF](${site}/downloads/Delux-Enterprise-Catalogue.pdf): printable product list`,
    `- [Privacy Policy](${site}/privacy)`,
    "",
  ].join("\n");
}

function llmsFullTxt() {
  const sections = categories.map((c) => {
    const items = products.filter((p) => p.category === c.name);
    const lines = items.map((p) => {
      const bits = [
        p.brands.length ? `brand: ${p.brands.join(", ")}` : null,
        p.origin ? `origin: ${p.origin}` : null,
        p.variants.length ? `variants: ${p.variants.join(", ")}` : null,
        p.packSizes.length ? `pack sizes: ${p.packSizes.join(", ")}` : null,
        p.cuisines.length ? `cuisine: ${p.cuisines.join(", ")}` : null,
      ].filter(Boolean);
      return `- ${p.name}${bits.length ? ` (${bits.join("; ")})` : ""}`;
    });
    return [`## ${c.name}`, "", ...lines].join("\n");
  });
  return [
    header(),
    "",
    `## All brands (${brands.length})`,
    "",
    brands.join(", "),
    "",
    ...sections.flatMap((s) => [s, ""]),
    `To ask for prices or minimum order quantities, message ${company.name} on WhatsApp: ${company.whatsapp}`,
    "",
  ].join("\n");
}

export default function seoFiles() {
  let outDir = "dist";
  return {
    name: "delux-seo-files",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      const base = fs.readFileSync(indexPath, "utf8");
      for (const [route, meta] of Object.entries(pageMeta)) {
        const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
        fs.writeFileSync(path.join(outDir, file), pageHtml(base, route, meta));
      }
      fs.writeFileSync(path.join(outDir, "llms.txt"), llmsTxt());
      fs.writeFileSync(path.join(outDir, "llms-full.txt"), llmsFullTxt());
    },
  };
}
