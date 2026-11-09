// Title and description for every page, in one place. Used by the pages themselves
// (usePageMeta) and at build time to write per-page share previews (vite.config.js),
// so WhatsApp, Facebook, LinkedIn and search engines see the right text without JavaScript.
import catalogue from "../data/catalogue.json";

const { products, brands } = catalogue;

export const pageMeta = {
  "/": {
    title: "Delux Enterprise | Imported Food Wholesaler, Crawford Market Mumbai",
    description: `Imported food wholesaler since 1986: ${products.length} products from ${brands.length} brands. Sauces, oils, noodles, spices and syrups for restaurants, hotels and cafés.`,
  },
  "/products": {
    title: "Imported Food Products Wholesale Catalogue | Delux Enterprise",
    description: `Browse ${products.length} imported food products: Lee Kum Kee, Kikkoman, Monin, Nutella, Reggia, Knorr and more. Trade prices on request. Enquire on WhatsApp.`,
  },
  "/brands": {
    title: `${brands.length} International Food Brands We Supply | Delux Enterprise`,
    description:
      "Wholesale supplier of Lee Kum Kee, Kikkoman, Monin, Hershey's, Nutella, Lotus Biscoff, Reggia, Al Ameera and more imported food brands in Crawford Market, Mumbai.",
  },
  "/posts": {
    title: "Posts & Reels | Delux Enterprise Instagram",
    description:
      "New arrivals, product spotlights and stories from Delux Enterprise, the imported food wholesaler in Crawford Market, Mumbai. Follow @info.deluxfoodstuff.",
  },
  "/about": {
    title: "Our Story Since 1986 | Delux Enterprise, Crawford Market Mumbai",
    description:
      "From a family kirana shop in Crawford Market in 1986 to a wholesale supplier of imported food ingredients for restaurants, hotels, cafés and ship provisions.",
  },
  "/contact": {
    title: "Contact Delux Enterprise | Imported Food Wholesale Enquiries, Mumbai",
    description:
      "Trade enquiries for imported food ingredients: WhatsApp +91 93247 89432, email or visit Shop 304/305, M. J. Phule (Crawford) Market, Mumbai, opp. Sadanand Hotel. Prices and MOQ on request.",
  },
  "/privacy": {
    title: "Privacy Policy | Delux Enterprise",
    description:
      "How Delux Enterprise collects, uses and protects the personal data you share through deluxefoodstuff.online, and your rights under India's DPDP Act, 2023.",
  },
};
