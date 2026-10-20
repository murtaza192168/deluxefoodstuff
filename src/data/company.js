// Single source for company details shown across the site.
// Anything not yet confirmed by the business is left out rather than invented.
const company = {
  name: "Delux Enterprise",
  tradingName: "Deluxe Food Stuff",
  tagline: "Imported food ingredients for professional kitchens",
  address: {
    line1: "Shop No. 304/305, Inside 3rd Lane",
    line2: "Crawford Market, Dhobi Talao, Fort, Mumbai 400001",
  },
  gstin: "27AICPM2320B1ZZ",
  mapUrl: "https://share.google/PKSmjCwpK2OAdr9sp",
  phoneDisplay: "+91 93247 89432",
  phoneTel: "+919324789432",
  whatsapp: "https://wa.me/919324789432",
  email: "info.deluxfoodstuffs@gmail.com",
  instagram: "https://www.instagram.com/info.deluxfoodstuff",
  instagramHandle: "info.deluxfoodstuff",
  // JSON feed URL from Behold (behold.so) once the Instagram account is connected, e.g.
  // "https://feeds.behold.so/XXXXXXXX". Can also be set at build time with VITE_INSTAGRAM_FEED_URL.
  instagramFeedUrl: "https://feeds.behold.so/Cb1V8dDcU4PS9K6yCkBe",
};

export const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Brands", path: "/brands" },
  { label: "Posts", path: "/posts" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default company;
