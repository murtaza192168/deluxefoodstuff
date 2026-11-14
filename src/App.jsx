import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CookieBanner from "./privacy/CookieBanner";
import ChatAssistant from "./assistant/ChatAssistant";
import Analytics from "./seo/Analytics";
import Footer from "./components/Footer";
import EnquiryDrawer from "./enquiry/EnquiryDrawer";
import { SplashDone, RouteLoader } from "./loading/Splash";
import ScrollReveal from "./motion/ScrollReveal";

// Each page downloads only when it is first opened, so the site starts faster.
// If a new version went live while the visitor had the site open, the old page files are
// gone: reload once to pick up the new version instead of showing a blank page.
const RELOAD_KEY = "delux-reloaded-for-update";
const page = (load) =>
  lazy(() =>
    load()
      .then((m) => {
        try {
          sessionStorage.removeItem(RELOAD_KEY);
        } catch {
          /* storage blocked */
        }
        return m;
      })
      .catch((err) => {
        let reloaded = true;
        try {
          reloaded = sessionStorage.getItem(RELOAD_KEY) === "1";
          if (!reloaded) sessionStorage.setItem(RELOAD_KEY, "1");
        } catch {
          /* storage blocked: don't risk a reload loop */
        }
        if (reloaded) throw err;
        window.location.reload();
        return new Promise(() => {});
      })
  );

const Home = page(() => import("./pages/Home"));
const ProductsCatalog = page(() => import("./pages/ProductsCatalog"));
const Brands = page(() => import("./pages/Brands"));
const Social = page(() => import("./pages/Social"));
const About = page(() => import("./pages/About"));
const Contact = page(() => import("./pages/Contact"));
const Privacy = page(() => import("./pages/Privacy"));
const NotFound = page(() => import("./pages/NotFound"));

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Suspense fallback={<RouteLoader />}>
          <SplashDone />
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
        </Suspense>
      </main>
      <ScrollReveal />
      <Footer />
      <EnquiryDrawer />
      <Analytics />
      <CookieBanner />
      <ChatAssistant />
    </>
  );
}
