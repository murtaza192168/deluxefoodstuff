// Matches what a customer types against the FAQ and the product catalogue.
// Runs entirely in the browser; nothing typed here is sent anywhere.
import catalogue from "../data/catalogue.json";
import { faq } from "./faq";

const { products, categories } = catalogue;

const STOP = new Set(
  ("a an the do does did you u your have has having got get is are am be can could will would i me my we our us " +
    "any some of for to in on at and or with from please pls plz hi hello hey sir madam bhai ji kya hai hain " +
    "aapke apke paas pas milega milegi mil sakta chahiye want need looking stock stocks sell sells available " +
    "availability keep carry item items product brand brands which what this that it there tell about")
    .split(" ")
);

export const normalise = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const words = (s) => normalise(s).split(" ").filter(Boolean);

// One typo allowed for longer words ("kikoman", "sirracha").
function close(a, b) {
  if (a === b) return true;
  if (a.length >= 4 && b.startsWith(a)) return true; // "kikko" -> "kikkoman"
  if (a.length < 5 || Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

const index = products.map((p) => ({
  p,
  tokens: [...new Set(words([p.name, ...p.brands, ...p.variants, p.category, ...p.cuisines].join(" ")))],
  nameTokens: new Set(words([p.name, ...p.brands].join(" "))),
}));

// Faq words never count as product search terms ("price", "delivery"...).
const FAQ_WORDS = new Set(faq.flatMap((f) => f.keywords.filter((k) => !k.includes(" ")).map(normalise)));

function searchProducts(text) {
  const terms = words(text).filter((w) => !STOP.has(w) && !FAQ_WORDS.has(w) && w.length >= 3 && !/^\d+(g|kg|ml|l|ltr|gm)?$/.test(w));
  if (!terms.length) return { terms, hits: [] };
  let best = 0;
  const scored = index.map(({ p, tokens, nameTokens }) => {
    let matched = 0;
    let weight = 0;
    for (const t of terms) {
      if (tokens.some((tok) => close(t, tok))) {
        matched += 1;
        weight += [...nameTokens].some((tok) => close(t, tok)) ? 1.2 : 1; // name/brand hits rank first
      }
    }
    best = Math.max(best, matched);
    return { p, matched, weight };
  });
  // Need the best number of matching words, and most of what they typed; one stray word is fine.
  if (best === 0 || best < terms.length - 1) return { terms, hits: [] };
  const hits = scored
    .filter((s) => s.matched === best)
    .sort((x, y) => y.weight - x.weight || x.p.name.localeCompare(y.p.name))
    .map((s) => s.p);
  return { terms, hits };
}

function matchFaq(text) {
  const norm = ` ${normalise(text)} `;
  const ws = new Set(words(text));
  let top = null, topScore = 0;
  for (const f of faq) {
    let score = 0;
    for (const k of f.keywords) {
      const nk = normalise(k);
      if (nk.includes(" ")) { if (norm.includes(` ${nk} `)) score += 1.5 * nk.split(" ").length; }
      else if (ws.has(nk)) score += 1;
    }
    if (score > topScore) { top = f; topScore = score; }
  }
  return top;
}

const GREETING = /^(hi+|hello+|hey+|namaste|salaam|salam|good (morning|afternoon|evening)|hii+)\b/;
const THANKS = /\b(thanks?|thank you|thx|ty|shukriya|dhanyavad|ok(ay)?|great|cool|done)\b/;

const categoryFor = (p) => categories.find((c) => c.name === p.category);

// Returns { text, products?, actions?, handoff? }
const textOf = (topic) => (typeof topic.answer === "function" ? topic.answer() : topic.answer);

export function answer(question) {
  const q = normalise(question);
  if (!q) return null;
  const { terms, hits } = searchProducts(question);
  const topic = matchFaq(question);

  if (GREETING.test(q) && q.split(" ").length <= 3)
    return { text: "Hello! Ask me about a product, prices, minimum orders or how to reach the shop. If I'm not sure, I'll connect you with our team." };
  if (!hits.length && !topic && THANKS.test(q) && q.split(" ").length <= 4)
    return { text: "Happy to help. Anything else you'd like to check?" };

  if (hits.length) {
    const shown = hits.slice(0, 4);
    const many = hits.length > shown.length;
    const one = hits.length === 1;
    let text = one
      ? `Yes, we stock ${hits[0].name}.`
      : `Yes, we have ${hits.length} matching products${many ? ". Here are a few." : "."}`;
    const handoff = Boolean(topic && (topic.handoff || topic.answer === null));
    if (topic && topic.answer && topic.id !== "catalogue") text += ` ${textOf(topic)}`;
    else if (topic && topic.answer === null) text += ` For ${topic.topic ?? topic.label.toLowerCase()}, our team will confirm for you on WhatsApp.`;
    else text += ` Add ${one ? "it" : "any of them"} to your enquiry list and we'll reply with today's price and minimum quantity.`;
    const brandHit = hits.length > 1 && hits.every((p) => p.brands[0] && p.brands[0] === hits[0].brands[0]);
    const cat = categoryFor(hits[0]);
    const exact = terms.filter((t) => hits.some((p) => index.find((x) => x.p === p).tokens.some((tok) => tok.includes(t))));
    const actions = many
      ? [{ label: "See all matches", to: brandHit ? `/products?brand=${encodeURIComponent(hits[0].brands[0])}` : `/products?q=${encodeURIComponent(exact.join(" ") || hits[0].brands[0] || "")}` }]
      : cat ? [{ label: `More ${cat.name.split(",")[0].split(" &")[0]}`, to: `/products?category=${cat.id}` }] : [];
    return { text, products: shown, actions, handoff };
  }

  if (topic) {
    if (topic.answer === null)
      return { text: `Good question. I don't want to guess about ${topic.topic ?? topic.label.toLowerCase()}, so let our team confirm it for you on WhatsApp.`, handoff: true, unsure: true };
    return { text: textOf(topic), actions: topic.actions, handoff: Boolean(topic.handoff) };
  }

  if (terms.length && terms.length <= 4)
    return {
      text: `I couldn't find "${terms.join(" ")}" in our online catalogue. We stock more than what's listed online, so ask our team and they'll check for you.`,
      handoff: true,
      unsure: true,
    };

  return { text: "I'm not sure about that one. Let me connect you with our team on WhatsApp; they'll help you directly.", handoff: true, unsure: true };
}
