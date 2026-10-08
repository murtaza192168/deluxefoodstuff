// Single source for company details shown across the site.
// Anything not yet confirmed by the business is left out rather than invented.
const company = {
  name: "Delux Enterprise",
  tagline: "Imported food ingredients for professional kitchens",
  address: {
    line1: "304/305, M. J. Phule Market",
    line2: "Crawford Market, Mumbai 400001",
  },
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
