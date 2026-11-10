// Formats the messages customers send us, so every enquiry arrives clean and easy to read.
// WhatsApp understands *bold* and _italic_; email gets the same layout without those marks.
import company from "../data/company";

const RULE = "────────────────";
const SITE = company.siteUrl.replace(/^https?:\/\//, "");

const bold = (s, wa) => (wa ? `*${s}*` : s);
const italic = (s, wa) => (wa ? `_${s}_` : s);
// Section headings: bold on WhatsApp, capitals in email (where bold isn't available).
const heading = (s, wa) => (wa ? `*${s}*` : s.toUpperCase());

const UNIT_WORDS = { carton: ["carton", "cartons"], pc: ["piece", "pieces"] };
const qtyText = (qty, unit) => {
  const [one, many] = UNIT_WORDS[unit] ?? UNIT_WORDS.carton;
  return `${qty} ${qty === 1 ? one : many}`;
};

function fromBlock(contact, wa) {
  const lines = [
    contact.name,
    [contact.business, contact.type].filter(Boolean).join(" · "),
    contact.city,
  ].filter((l) => l && l.trim());
  return lines.length ? ["", heading("From", wa), ...lines] : [];
}

function wrap(body, wa) {
  return [
    bold(`${company.name.toUpperCase()} · TRADE ENQUIRY`, wa),
    RULE,
    "",
    ...body,
    RULE,
    italic(`Sent from ${SITE}`, wa),
  ].join("\n");
}

// Enquiry list: products with variant, pack size, quantity and unit.
export function enquiryListMessage(items, contact = {}, note = "", { whatsapp = true } = {}) {
  const wa = whatsapp;
  const lines = items.flatMap((item, n) => {
    const details = [item.variant, item.packSize].filter(Boolean).join(" · ");
    return [
      bold(`${n + 1}. ${item.name}`, wa),
      ...(details ? [`     ${details}`] : []),
      `     Qty: ${bold(qtyText(item.qty, item.unit), wa)}`,
      "",
    ];
  });

  const totals = Object.entries(
    items.reduce((t, i) => ({ ...t, [i.unit ?? "carton"]: (t[i.unit ?? "carton"] ?? 0) + i.qty }), {})
  )
    .sort(([a], [b]) => (a === "carton" ? -1 : b === "carton" ? 1 : 0))
    .map(([unit, qty]) => qtyText(qty, unit));

  return wrap(
    [
      "Hello, please share your current trade price and minimum order quantity for:",
      "",
      ...lines,
      `${heading("Total:", wa)} ${items.length} ${items.length === 1 ? "product" : "products"} · ${totals.join(" + ")}`,
      ...(note.trim() ? ["", heading("Note", wa), note.trim()] : []),
      ...fromBlock(contact, wa),
      "",
    ],
    wa
  );
}

// Contact page form: free-text list of products.
export function contactFormMessage(form, { whatsapp = true } = {}) {
  const wa = whatsapp;
  return wrap(
    [
      "Hello, I'd like a trade quote for the following:",
      "",
      heading("Products needed", wa),
      form.products.trim(),
      ...fromBlock(form, wa),
      "",
    ],
    wa
  );
}

export function enquirySubject(contact = {}, count) {
  const who = [contact.business, contact.name].map((s) => s && s.trim()).find(Boolean);
  return `Trade enquiry${count ? `: ${count} ${count === 1 ? "product" : "products"}` : ""}${who ? ` · ${who}` : ""}`;
}

// Chat assistant handoff: the customer's question, ready for the team.
export function chatHandoffMessage(question) {
  if (!question) return `Hello ${company.name}, I have a trade enquiry.`;
  return [
    `Hello ${company.name},`,
    "",
    "I asked your website assistant:",
    `_"${question}"_`,
    "",
    "Could you please help?",
  ].join("\n");
}
