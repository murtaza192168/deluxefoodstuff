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
  mapUrl: "https://www.google.com/maps/search/?api=1&query=M.+J.+Phule+Market+Crawford+Market+Mumbai+400001",
  phoneDisplay: "+91 93247 89432",
  whatsapp: "https://wa.me/919324789432",
  email: "info.deluxfoodstuffs@gmail.com",
  instagram: "https://www.instagram.com/info.deluxfoodstuff",
};

export const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
];

export default company;
