// What the website chat assistant knows.
//
// Every answer here must be something the business has confirmed. When an answer is
// `null`, the assistant does not guess: it tells the customer our team will confirm and
// offers WhatsApp with their question already typed. To teach it, replace `null` with text.
//
// `topic` is how the assistant refers to it in a sentence.
// `keywords` are matched against what the customer types (lower case, any order).
// Multi-word keywords match as a phrase. Hinglish words are included on purpose.
import company from "../data/company";

const a = company.address;

export const faq = [
  {
    id: "location",
    label: "Where is the shop?",
    keywords: ["where", "address", "location", "located", "directions", "direction", "map", "reach", "come", "visit", "kahan", "kaha", "pata", "crawford", "landmark"],
    answer: `We're at ${a.line1}, ${a.line2}. Landmark: ${a.landmark}.`,
    actions: [{ label: "Open in Google Maps", href: company.mapUrl }],
  },
  {
    id: "hours",
    topic: "our shop timings",
    label: "Shop timings",
    keywords: ["timing", "timings", "time", "hours", "open", "opening", "close", "closing", "closed", "sunday", "holiday", "today", "kab", "khula", "band"],
    answer: null,
  },
  {
    id: "price",
    topic: "prices",
    label: "Prices",
    keywords: ["price", "prices", "rate", "rates", "cost", "costs", "quote", "quotation", "how much", "pricing", "price list", "rate list", "daam", "kitne", "kitna", "bhav", "discount", "cheap", "wholesale rate"],
    answer:
      "Rates move with every import shipment, so we don't put prices online. Tell our team what you need and they'll reply on WhatsApp with today's trade price, pack sizes and minimum order quantity.",
    handoff: true,
  },
  {
    id: "moq",
    topic: "minimum order",
    label: "Minimum order",
    keywords: ["minimum", "moq", "min order", "minimum order", "quantity", "bulk", "carton", "cartons", "case", "single piece", "one piece", "small quantity", "kam quantity"],
    answer:
      "Minimum order quantities depend on the product and pack size. Our team shares them with the price on WhatsApp.",
    handoff: true,
  },
  {
    id: "retail",
    topic: "buying for home use",
    label: "Can I buy for home?",
    keywords: ["home", "personal", "individual", "retail", "household", "for myself", "ghar"],
    answer: null,
  },
  {
    id: "order",
    label: "How do I order?",
    keywords: ["order", "ordering", "how to buy", "buy", "purchase", "book", "enquiry", "enquire", "inquiry", "process", "kaise"],
    answer:
      "Three steps: 1) add products from the catalogue to your enquiry list (or just message us what you need), 2) we reply on WhatsApp with current prices, pack sizes and minimum quantities, 3) confirm on WhatsApp or by phone and we get your order ready.",
    actions: [{ label: "Browse the catalogue", to: "/products" }],
  },
  {
    id: "who",
    label: "Who do you supply?",
    keywords: ["supply", "customers", "restaurant", "restaurants", "hotel", "hotels", "cafe", "cafes", "café", "bakery", "caterer", "caterers", "cloud kitchen", "retailer", "reseller", "ship", "chandler"],
    answer:
      "We're a trade supplier: restaurants and hotels, cafés and bakeries, caterers and cloud kitchens, resellers and bulk buyers, and ship provisions.",
  },
  {
    id: "delivery",
    topic: "delivery",
    label: "Delivery",
    keywords: ["delivery", "deliver", "shipping", "ship to", "courier", "dispatch", "transport", "outside mumbai", "other city", "pune", "delhi", "bangalore", "home delivery"],
    answer: null,
  },
  {
    id: "payment",
    topic: "payment options",
    label: "Payment",
    keywords: ["payment", "pay", "upi", "gpay", "cash", "card", "credit", "neft", "bank", "cheque", "advance"],
    answer: null,
  },
  {
    id: "samples",
    topic: "samples",
    label: "Samples",
    keywords: ["sample", "samples", "trial", "taste", "tasting"],
    answer: null,
  },
  {
    id: "gst",
    label: "GST",
    keywords: ["gst", "gstin", "tax", "invoice", "bill"],
    answer: `Yes, we're GST registered. GSTIN ${company.gstin}.`,
  },
  {
    id: "contact",
    label: "Contact details",
    keywords: ["contact", "phone", "number", "call", "mobile", "email", "mail", "whatsapp", "instagram"],
    answer: `WhatsApp or call ${company.phoneDisplay}, email ${company.email}, or visit us at Crawford Market.`,
    actions: [
      { label: "Call us", href: `tel:${company.phoneTel}` },
      { label: "Save our contact", href: "/delux-enterprise.vcf", download: true },
    ],
  },
  {
    id: "about",
    label: "About us",
    keywords: ["about", "since", "history", "family", "owner", "old", "experience", "years", "established"],
    answer:
      "We're a family business at Crawford Market since 1986, and we've been importing food ingredients since 2000.",
    actions: [{ label: "Our story", to: "/about" }],
  },
  {
    id: "catalogue",
    label: "Product list (PDF)",
    keywords: ["catalogue", "catalog", "pdf", "list", "product list", "brochure", "range", "what do you sell", "what you sell", "products", "items"],
    answer: "Here's our product list. You can also browse everything on the Products page.",
    actions: [
      { label: "Download catalogue (PDF)", href: "/downloads/Delux-Enterprise-Catalogue.pdf", download: true },
      { label: "Browse products", to: "/products" },
    ],
  },
];

// Shown as tap-to-ask chips when the chat opens.
export const starters = ["Do you have Kikkoman?", "Where is the shop?", "Shop timings", "Prices", "Minimum order", "Delivery"];
