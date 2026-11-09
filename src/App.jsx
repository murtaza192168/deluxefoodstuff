import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductsCatalog from "./pages/ProductsCatalog";
import Brands from "./pages/Brands";
import Social from "./pages/Social";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import CookieBanner from "./privacy/CookieBanner";
import Analytics from "./seo/Analytics";
import DiwaliCelebration from "./festive/DiwaliCelebration";
import Footer from "./components/Footer";
import EnquiryDrawer from "./enquiry/EnquiryDrawer";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsCatalog />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/posts" element={<Social />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <EnquiryDrawer />
      <Analytics />
      <CookieBanner />
      <DiwaliCelebration />
    </>
  );
}
