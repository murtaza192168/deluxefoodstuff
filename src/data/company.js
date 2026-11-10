// Single source for company details shown across the site.
// Anything not yet confirmed by the business is left out rather than invented.
const company = {
  name: "Delux Enterprise",
  siteUrl: "https://deluxefoodstuff.online",
  tradingName: "Deluxe Food Stuff",
  tagline: "Imported food ingredients for professional kitchens",
  address: {
    line1: "Shop No. 304/305, Inside 3rd Lane",
    line2: "M. J. Phule Market (Crawford Market), Fort, Mumbai 400001",
    landmark: "Opp. Sadanand Hotel",
    short: "Shop 304/305, M. J. Phule Market (Crawford Market), Mumbai",
  },
  gstin: "27AICPM2320B1ZZ",
  // Shop timings (India time). Sunday closed, but WhatsApp messages are welcome.
  hours: {
    days: "Monday to Saturday",
    daysShort: "Mon–Sat",
    open: "10:30",
    close: "20:00",
    display: "10:30 AM – 8:00 PM",
    closedNote: "Sunday closed · WhatsApp messages welcome",
  },
  mapUrl: "https://share.google/PKSmjCwpK2OAdr9sp",
  phoneDisplay: "+91 93247 89432",
  phoneTel: "+919324789432",
  whatsapp: "https://wa.me/919324789432",
  email: "info.deluxfoodstuffs@gmail.com",
  instagram: "https://www.instagram.com/info.deluxfoodstuff",
  instagramHandle: "info.deluxfoodstuff",
  // Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). Analytics stays off while this is empty.
  gaMeasurementId: "G-M8BPP5MBGR",
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
